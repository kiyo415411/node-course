const { application } = require("express");
const express = require("express");
const router = express.Router();

const pool = require("../utils/db"); // 引進 db

router.use((req, res, next) => {
    console.log("cccccccccc");
    next();
});
let singleMiddleware = (req, res, next) => {
    console.log("dddddd");
    next();
};
// RESTful API
// 取得 stocks 的列表
router.get("/", async (req, res, next) => {
    let [data, fields] = await pool.execute("SELECT * FROM stocks");
    res.json(data);
});

// 取得某個股票 id 的資料 :stockId 變數
router.get("/:stockId", singleMiddleware, async (req, res, next) => {
    // req.params | 取得網址上的參數
    // req.params.stockId
    let [data, fields] = await pool.execute(
        "SELECT * FROM stock_prices WHERE stock_id = ?",
        [req.params.stockId]
    );

    // RESTful 風格 來設計 api | 鼓勵用 query string 傳遞過濾參數
    // /stocks/:stockId?=page=1

    // TODO 取得目前在第幾頁 | 以 || 達成預設值
    // t || f -> t run
    // f || t -> t run
    // undefined 為 false
    let page = req.query.page || 1;
    // console.log("current page: ", page);
    // TODO 目前的總筆數
    let [allResults] = await pool.execute(
        "SELECT * FROM stock_prices WHERE stock_id = ?",
        [req.params.stockId]
    );
    const total = allResults.length;
    // console.log("total page: ", total);
    // TODO 計算總共有幾頁
    // Math.ceil 1.1 -> 2 1.05 -> 2
    // Math.floor 1.1 -> 1 1.5 -> 1
    const perPage = 5;
    const lastPage = Math.ceil(total / perPage);
    // console.log("last page: ", lastPage);

    // TODO 計算 offset 是多少 ( 計算要跳過幾筆 )
    let offset = (page - 1) * perPage;
    // console.log("offset: ", offset);
    // TODO 取得這一頁的資料 select * ... limit ? offset ?
    let [pageResults] = await pool.execute(
        "SELECT * FROM stock_prices WHERE stock_id = ? ORDER BY date DESC LIMIT ? OFFSET ?",
        [req.params.stockId, perPage, offset]
    );

    // console.log(pageResults);
    // TODO 回覆給前端

    // 查無資料
    // method_1 | 200OK | []
    // method_2 | 回覆 404
    // if (data.length === 0) {
    //     res.status(404).json(data);
    // } else {
    //     res.json(data);
    // }

    res.json({
        // 儲存跟頁碼有關的資訊
        pagination: { total, lastPage, page },
        // 真正的資料
        data: pageResults,
    });
});

module.exports = router;
