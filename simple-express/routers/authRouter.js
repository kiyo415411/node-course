// 註冊驗證: 跟資料頁面連接 > 收到資料 > 驗證 > 回覆
const { response, application } = require('express');
const express = require('express');
const router = express.Router();
// for password
const bcrypt = require('bcrypt');
// for image upload
const multer = require('multer');
// 內建函式，要用記得引入
const path = require('path');
// 圖片上傳需要地方放，在 public 裡，建立了 uploads 檔案夾
// 設定圖片儲存的位置
const storage = multer.diskStorage({
    // 透過物件儲存
    // 設定儲存的目的地 (檔案夾)
    // cb : callback | 規範的用法
    // cb 中通常會放 1.錯誤 2.資料
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'public', 'members'));
    },
    // 可以重新命名使用者上傳的圖片名稱 | 避免檔名覆蓋
    filename: function (req, file, cb) {
        // console.log("multer filename", file);

        // pop 把最後一個取出
        let ext = file.originalname.split('.').pop();
        let newFilename = `${Date.now()}.${ext}`;
        cb(null, newFilename);
    },
});

// 設定都是大括號
// 中間件 | 要放在網址裡面
const uploder = multer({
    // 設定儲存的位置
    storage: storage,
    // 過濾圖片
    fileFilter: function (req, file, cb) {
        if (
            file.mimetype !== 'image/jpeg' &&
            file.mimetype !== 'image/jpg' &&
            file.mimetype !== 'image/png'
        ) {
            cb('這些是不被接受的格式', false);
        } else {
            cb(null, true);
        }
    },

    // 檔案尺寸的過濾
    limits: {
        // 1k = 1024
        fileSize: 200 * 1024,
    },
});

//npm i express-validator
const { body, validationResult } = require('express-validator');
const pool = require('../utils/db');

const registerRules = [
    body('email').isEmail().withMessage('email 欄位請填寫正確格式'),
    body('password').isLength({ min: 8 }).withMessage('密碼長度至少為 8'),
    body('confirmPassword')
        .custom((value, { req }) => {
            return value === req.body.password;
        })
        .withMessage('密碼驗證不一致'),
];

// 中間件可以一直串接
// 中間件就是函式
// 只有一張圖片所以用 single('') | 也可傳多張圖片
router.post(
    '/register',
    uploder.single('photo'),
    registerRules,
    async (req, res, next) => {
        // req.params <-- 網址上的路由參數
        // req.query <-- 網址上的 query string
        // req.body <-- 通常是表單的 post 用的
        console.log('resgister body:', req.body);

        // 資料驗證
        const validateResults = validationResult(req);

        console.log('validateResults', validateResults);

        if (!validateResults.isEmpty()) {
            // 不是 empty --> 表示有不符合
            let error = validateResults.array();
            return res.status(400).json({ code: 3001, error: error });
        }

        // 確認 email 是否註冊過
        // [ SQL | 語法] 推薦只選擇會用到的欄位
        let [members] = await pool.execute(
            'SELECT id,email FROM members WHERE email = ?',
            [req.body.email]
        );

        if (members.length !== 0) {
            // 此 email 有註冊過
            return res
                .status(400)
                .json({ code: 3002, message: '這個 email 已經註冊過' });
            // 盡可能讓後端回覆的格式是一致的，如果無法完全一致，那至少要讓前端有判斷的依據。
            // 做專案的時候，在專案開始前，可以先討論好要回覆的錯誤格式與代碼。
        }
        // 密碼雜湊 hash
        let hashPassword = await bcrypt.hash(req.body.password, 10);
        console.log('hashPAssword : ', hashPassword);

        // 圖片處理完成後，會被放在 req 物件裡
        console.log('req.file :', req.file);
        // 最終前端需要的網址 http://localhost:3001/public/members/1655003234910.png
        // 可以由後端來組合這個網址，也可以由前端來組合
        // 記得不要把 http://localhost:3001/ 存進資料庫，因為正是環境部屬會不同
        // 目前這個專案採用 :儲存　members/1655003234910.png 這樣格式
        // 使用者不一定有上傳圖片，所以要確認 req 是否有 file
        let photo = req.file ? '/members/' + req.file.filename : '';

        // TODO: 存到資料庫
        let [result] = await pool.execute(
            'INSERT INTO members (email, password, name, photo) VALUES (?, ?, ?, ?)',
            [req.body.email, hashPassword, req.body.name, photo]
        );

        console.log('insert result', result);
        // response
        res.json({ code: 0, result: 'OK' });
    }
);

// auth/login
router.post('/login', async (req, res, next) => {
    // -------- 確認資料收到與否

    console.log('req.body', req.body);

    // -------- 確認帳號存在與否

    let [members] = await pool.execute(
        'SELECT id,name,email,password,photo FROM members WHERE email = ?',
        [req.body.email]
    );

    // -------- 如果沒有 -> 錯誤
    // 此 email 沒有註冊過
    if (members.length === 0) {
        return res
            .status(400)
            .json({ code: 3003, message: '這個 email 沒有註冊過' });
    }

    // -------- 如果程式碼能執行到這裡，表示 mambers 裡面至少有一個資料
    // 把這個會員資料拿出來，可以不用一直打 member[0]
    let member = members[0];
    // console.log(member);
    // console.log(req.body.password, member.password);

    // -------- 如果有 -> 確認密碼
    let passwordCompareResult = await bcrypt.compare(
        req.body.password,
        member.password
    );

    // -------- 密碼錯誤 -> 錯誤
    if (passwordCompareResult === false) {
        return res.status(400).json({ code: 3004, error: '帳號或密碼錯誤' });
    }

    // -------- 密碼符合 -> 寫 session
    // （要先去 server.js 裡啟動 session）
    let returnMember = {
        email: member.email,
        name: member.name,
        photo: member.photo,
    };
    req.session.member = returnMember;

    // -------- 回覆資料給前端
    res.json({ code: 0, member: returnMember });
});

router.get('/logout', (req, res, next) => {
    // 因為我們會依靠判斷 req.session.member 有沒有資料來當作有沒有登入
    // 所以當我們把 req.session.member 設定成 null，那就登出了
    req.session.member = null;
    res.sendStatus(202);
});

module.exports = router;
