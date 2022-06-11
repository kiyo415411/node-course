const { response, application } = require("express");
const express = require("express");
const router = express.Router();

//npm i express-validator
const { body, validationResult } = require("express-validator");

const registerRules = [
    body("email").isEmail().withMessage("email 欄位請填寫正確格式"),
    body("password").isLength({ min: 8 }).withMessage("密碼長度至少為 8"),
    body("confirmPassword")
        .custom((value, { req }) => {
            return value === req.body.password;
        })
        .withMessage("密碼驗證不一致"),
];

// 中間件可以一直串接
// 中間件就是函式

router.post("/register", registerRules, (req, res, next) => {
    // req.params <-- 網址上的路由參數
    // req.query <-- 網址上的 query string
    // req.body <-- 通常是表單的 post 用的
    console.log("resgister body:", req.body);

    // 資料驗證
    const validateResults = validationResult(req);

    console.log("validateResults", validateResults);

    if (!validateResults.isEmpty()) {
        // 不是 empty --> 表示有不符合
        let error = validateResults.array();
        return res.status(400).json(error);
    }
    // TODO: 確認 email 是否註冊過
    // TODO: 密碼雜湊 hash
    // TODO: 存到資料庫
    // response

    res.json({ result: "OK" });
});

module.exports = router;
