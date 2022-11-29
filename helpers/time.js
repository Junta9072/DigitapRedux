let date = new Date();
let hms = {
  hour: date.getHours(),
  minutes: date.getMinutes(),
  seconds: date.getSeconds(),
};

setInterval(() => {
  date = new Date();
  hms = {
    hour: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  };
}, 1000);

let time = {
  weekday: date.getDay(),
  numDay: date.getDate(),
  numMonth: date.getMonth(),
};

let weekDay = null;
let dotW = time.weekday;
let numDay = time.numDay;
let numMonth = time.numMonth;
let txtMonth = null;

switch (time.weekday) {
  case 0:
    weekDay = "zondag";
    break;
  case 1:
    weekDay = "maandag";
    break;
  case 2:
    weekDay = "dinsdag";
    break;
  case 3:
    weekDay = "woensdag";
    break;
  case 4:
    weekDay = "donderdag";
    break;
  case 5:
    weekDay = "vrijdag";
    break;
  case 6:
    weekDay = "zaterdag";
}

function getWeekDay(arg) {
  switch (arg) {
    case 0:
      return "zondag";
      break;
    case 1:
      return "maandag";
      break;
    case 2:
      return "dinsdag";
      break;
    case 3:
      return "woensdag";
      break;
    case 4:
      return "donderdag";
      break;
    case 5:
      return "vrijdag";
      break;
    case 6:
      return "zaterdag";
  }
}

switch (numMonth) {
  case 1:
    txtMonth = "januari";
    break;
  case 2:
    txtMonth = "februari";
    break;
  case 3:
    txtMonth = "maart";
    break;
  case 4:
    txtMonth = "april";
    break;
  case 5:
    txtMonth = "mei";
    break;
  case 6:
    txtMonth = "juni";
    break;
  case 7:
    txtMonth = "juli";
    break;
  case 8:
    txtMonth = "augustus";
    break;
  case 9:
    txtMonth = "september";
    break;
  case 10:
    txtMonth = "oktober";
    break;
  case 11:
    txtMonth = "november";
    break;
  case 12:
    txtMonth = "december";
    break;
}

let monthArray = [
  "januari",
  "februari",
  "maart",
  "april",
  "mei",
  "juni",
  "juli",
  "augustus",
  "september",
  "oktober",
  "november",
  "december",
];
function getTxtMonth(input) {
  return monthArray[input];
}

function addDays(date1, addNo) {
  console.log(date1, addNo * 86400000);

  return new Date(date1.getTime() + addNo * 86400000);
}

export {
  weekDay,
  dotW,
  numDay,
  numMonth,
  txtMonth,
  hms,
  getWeekDay,
  addDays,
  getTxtMonth,
};
