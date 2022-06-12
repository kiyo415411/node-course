// npm init -f
// npm i express
const express = require("express");
// 利用 express 建立一個 express application
const app = express();

// path 為內建套件
const path = require("path");
const cors = require("cors");
app.use(cors());
require("dotenv").config();
// mysql2 依賴 dotenv | 同樣寫入 db.js
// 載入過一次就不會再被載入 | 不用怕重複做

let pool = require("./utils/db"); // 重構 | 把 db.js 引入

// express 是一個由 middleware (中間件) 組成的世界
// client - server
// client send request <---> server response
// request-response cycle
// client: browser, postman, nodejs
// 發出請求的一方 = client 端

// SSR
// CSR

// 設定 express 視圖檔案放在哪裡
app.set("views", path.join(__dirname, "views"));
// 設定 express 要用哪一種樣板引擎 (template engine)
// npm i pug
app.set("view engine", "pug");

// express.urlencoded 要讓 express 認得 req 裡 body 裡面的資料
// extended: false --> querystring
// extended: true --> qs
app.use(express.urlencoded({ extended: true }));
// 要讓 express 認得 req 裡 json
app.use(express.json());

// express 處理靜態資料
// 靜態資料: html, css 檔案, javascript 檔案, 圖片, 影音檔...
// express 少數內建的中間件 static
// 方法1: 不要指定網址
app.use(express.static(path.join(__dirname, "assets")));
// http://localhost:3001/images/test1.jpg
// 方法2: 指定網址 aaa
app.use("/public", express.static(path.join(__dirname, "public")));
// http://localhost:3001/aaa/images/callback-hell.png

// (一般)中間件(函式)(use) middleware [2]
// function next() | pipeline | 到下一個中間中
// function response() | 結束整個 cycle
app.use((request, response, next) => {
    // console.log("我是一個沒用的中間件"); // 若沒有 next 也沒有 response > padding (擱置)
    next(); //函式 | 找下一個是誰
});

// HTTP request
// method: get, post, put, delete, ...
// 路由中間件(get)
app.get("/", (request, response, next) => {
    response.send("<html><body><h1 style='color:red;'>首頁</h1><body></html>");
    // 送回 response，結束了 request-response cycle
    // 若無 response，則會造成 padding (擱置)
});

app.get("/about", (request, response, next) => {
    response.send("關於我");
});

app.get("/news", (request, response, next) => {
    response.send("最新消息");
});

app.get("/activity", (request, response, next) => {
    response.send("活動");
});

app.get("/course", (request, response, next) => {
    response.send("課程");
});

app.get("/error", (req, res, next) => {
    // 發生錯誤，你丟一個錯誤出來
    // throw new Error('故意製造的錯誤');
    // res.send('error')
    // 若 next 有參數，則會跳入錯誤中間件
    // next('A');
});

app.get("/ssr", (req, res, next) => {
    res.render("index", {
        stocks: ["台積電", "長榮", "聯發科"],
    });
});

const StockRouter = require("./routers/stockRouter"); // 引進 router

app.use("/api/stocks", StockRouter); // 使用 router

const AuthRouter = require("./routers/authRouter");
app.use("/api/auth", AuthRouter);
// 此中間件在所有路由中間的後面
// 表示沒有符合的網址
// 404

app.use((req, res, next) => {
    console.log("所有路由的後面 => 404", req.path);
    res.status(404).send("Not Found");
});

// 5xx
// 錯誤處理中間件 : 通常也會放在所有中間件的最後
// 超級特殊的中間件
// 有點接近 try-catch 的 catch
app.use((err, req, res, next) => {
    console.error("來自四個參數的錯誤處理中間件", req.path, err);
    res.status(500).send("Server Error: 請洽系統管理員");
});

app.listen(3001, () => {
    console.log("server start at 3001");
});
