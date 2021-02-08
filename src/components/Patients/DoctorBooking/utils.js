export const getISOdate = (localString) => {
  let year = localString.slice(localString.length - 4);
  let month = localString.slice(3, 5);
  let day = localString.slice(0, 2);

  return `${year}-${month}-${day}`;
};

export const getMaxDate = (dateStr) => {
  let timeGap = 20;
  let year = parseInt(dateStr.slice(0, 4));
  let month = parseInt(dateStr.slice(5).slice(0, 2));
  let days = parseInt(dateStr.slice(dateStr.length - 2));
  if (days + timeGap > 30) {
    if (month + 1 > 12) {
      year += 1;
    } else {
      month += 1;
    }
  } else {
    days += timeGap;
  }
  let newDate = new Date(year, month - 1, days).toLocaleDateString();
  return getISOdate(newDate);
};

export const getDay = (dateStr) => {
  const daysArr = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  let year = dateStr.slice(0, 4);
  let month = dateStr.slice(5).slice(0, 2);
  let days = dateStr.slice(dateStr.length - 2);
  let newDate = new Date(year, month - 1, days);
  let dayNum = newDate.getDay();
  return daysArr[dayNum];
};

export const testSchdeule = {
  monday: ["mon"],
  tuesday: ["tue"],
  wednesday: ["wed"],
  thursday: ["thur"],
  friday: ["frid"],
  saturday: ["sat"],
  sunday: ["sun"],
};

export const getReadableDate = (dateStr) => {
  let year = dateStr.slice(0, 4);
  let month = dateStr.slice(5).slice(0, 2);
  let days = dateStr.slice(dateStr.length - 2);
  let newDate = new Date(year, month - 1, days);
  return newDate.toString().slice(0, 15);
};
