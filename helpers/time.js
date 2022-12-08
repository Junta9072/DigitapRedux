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
  case 0:
    txtMonth = "januari";
    break;
  case 1:
    txtMonth = "februari";
    break;
  case 2:
    txtMonth = "maart";
    break;
  case 3:
    txtMonth = "april";
    break;
  case 4:
    txtMonth = "mei";
    break;
  case 5:
    txtMonth = "juni";
    break;
  case 6:
    txtMonth = "juli";
    break;
  case 7:
    txtMonth = "augustus";
    break;
  case 8:
    txtMonth = "september";
    break;
  case 9:
    txtMonth = "oktober";
    break;
  case 10:
    txtMonth = "november";
    break;
  case 11:
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
  return new Date(date1.getTime() + addNo * 86400000);
}

function filterDate(ddl, daysNo) {
  if (
    ddl.getTime() < date.getTime() + daysNo * 86400000 &&
    ddl.getTime() > date.getTime()
  ) {
    return true;
  } else {
    return false;
  }
}

function getDayDiff(date1, date2) {
  console.log(
    Math.ceil(
      (new Date(date1).getTime() - new Date(date2).getTime()) / 86400000
    )
  );
  return Math.ceil(
    (new Date(date1).getTime() - new Date(date2).getTime()) / 86400000
  );
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
  filterDate,
  getDayDiff,
};
