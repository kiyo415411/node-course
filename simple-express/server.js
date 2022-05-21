// npm init -f

// npm i express

const express = require("express");
// 利用 express 建立一個 express application
const app = express();

// HTTP request
// method: get, post, put, delete, ...

app.get("/", (request, response, next) => {
    response.send("<html><body><h1 style='color:red;'>首頁</h1><body></html>");
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

app.listen(3001, () => {
    console.log("server start at 3001");
});
