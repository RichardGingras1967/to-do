import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var toDayList = [];
var workList = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  showTodayList(res);
});

app.get("/today", (req, res) => {
  showTodayList(res);
});

app.post("/today", (req, res) => {
  toDayList.push(cut(req.body["newItem"]));
  showTodayList(res);
});

app.get("/work", (req, res) => {
  showWorkList(res);
});

app.post("/work", (req, res) => {
  workList.push(cut(req.body["newItem"]));
  showWorkList(res);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

function showTodayList(res) {
  res.render("index.ejs", {
    today: getDateFormated(),
    todoList: toDayList,
  });
}

function showWorkList(res) {
  res.render("index.ejs", {
    todoList: workList,
  });
}

function cut(caracters){
  let nb = 90;
  if(caracters.length > nb){
    return caracters.substring(0, nb) + "...";
  }
  return caracters;
  
}

function getDateFormated() {
  let date = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let weekDay = days[date.getDay()];
  let month = months[date.getMonth()];
  let day = date.getDate();
  return weekDay + ", " + month + " " + day;
}
