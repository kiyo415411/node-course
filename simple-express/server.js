// npm init -f

// npm i express

const express = require("express");
// 利用 express 建立一個 express application
const app = express();

// HTTP request
// method: get, post, put, delete, ...

app.get("/", (request, response, next) => {
    response.send("首頁");
});

app.get("/about", (request, response, next) => {
    response.send("About Me");
});

app.listen(3001, () => {
    console.log("server start at 3001");
});
