const express = require("express");

// const bodyParser = require("body-parser");
const app = express();
const http = require("http");
const server = http.createServer(app);
const path = require("path");
const port = 8080;

const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket,req,res) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

const ejs = require("ejs");
app.engine("ejs", ejs.renderFile);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.set("src", "path/to/views");
//Anasayfa
app.get("/", (req, res, err) => {
res.render(__dirname + "/src/pages/index.ejs");
console.log("Render home");
});
//Hakkımızda sayfası
app.get("/hakkimizda", (req, res, err) => {
res.render(__dirname + "/src/pages/hakkimizda.ejs");
console.log("render page");
});
app.get("/about", (req, res, err) => {
res.render(__dirname + "/src/pages/hakkimizda.ejs");
console.log("about page");
});
//Hata sayfası
app.get("*", (req,res)=>{
res.render(__dirname + "/src/pages/error.ejs");  
});
server.listen(port, () => {
console.log(port, "error page");
});