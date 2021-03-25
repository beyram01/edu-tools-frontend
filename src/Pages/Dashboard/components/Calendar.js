import React, { useEffect, useState } from "react";
import {
  getDaysInMonth,
  setMonth,
  startOfMonth,
  getDay,
  setYear,
  getYear,
  isToday,
} from "date-fns";
import "../css/Calendar.css";

const Calendar = ({ month, year, width, unfinishidEvents, filterDate }) => {
  const [numberOfDays, setNumberOfDays] = useState([]);
  const [emptyDays, setEmptyDays] = useState([]);

  const [dateInCurrentMonth, setDateInCurrentMonth] = useState(
    setMonth(new Date(), month)
  );
  const [firstDayInCurrentMonth, setFirstDayInCurrentMonth] = useState(
    getDay(startOfMonth(dateInCurrentMonth))
  );

  useEffect(() => {
    let dateInCurrentMonth = setMonth(new Date(), month);

    //
    if (getYear(dateInCurrentMonth) !== year) {
      dateInCurrentMonth = setYear(dateInCurrentMonth, year);
    }

    //
    const numberOfDaysInCurrentMonth = getDaysInMonth(dateInCurrentMonth);
    const firstDayInCurrentMonth = getDay(startOfMonth(dateInCurrentMonth));

    //
    setDateInCurrentMonth(dateInCurrentMonth);
    setFirstDayInCurrentMonth(getDay(startOfMonth(dateInCurrentMonth)));

    //
    let numOfDays = [];
    for (let i = 1; i <= numberOfDaysInCurrentMonth; i++) {
      numOfDays.push(i);
    }
    setNumberOfDays(numOfDays);

    //
    let emptyDays = [];
    for (let i = 0; i < firstDayInCurrentMonth; i++) {
      emptyDays.push(i);
    }
    setEmptyDays(emptyDays);
  }, [month, year]);

  return (
    <div className="calendar">
      {emptyDays.map((_) => {
        return (
          <div
            className="empty-day"
            key={_}
            style={width < 1050 ? { display: "none" } : { display: "block" }}
          ></div>
        );
      })}

      {numberOfDays.map((day) => {
        const { fDay, fMonth, fYear } = filterDate(day, month + 1, year);
        const eventsCounter = unfinishidEvents.filter(
          (event) => event.day === `${fYear}-${fMonth}-${fDay}`
        ).length;
        return (
          <a
            href={`/dashboard/events/${day}-${month + 1}-${year}`}
            className="day"
            key={day}
            style={
              isToday(new Date(year, month, day))
                ? { backgroundColor: "#ABA7F1" }
                : {}
            }
          >
            <div>
              <p>{day}</p>
              <p>{getFullDay(day, firstDayInCurrentMonth)}</p>
            </div>
            {eventsCounter > 0 && (
              <p className="events-counter">
                <span className="point"></span>
                {eventsCounter} tasks
              </p>
            )}
          </a>
        );
      })}
    </div>
  );
};

export default Calendar;

/**
 * return the full name of the day (Monday, Tuesday...)
 *
 * @return {String}
 */

const getFullDay = (day, firstDayInCurrentMonth) => {
  const currentDay = day + firstDayInCurrentMonth - 1;
  if (currentDay <= 6) {
    return Days[currentDay];
  } else if (currentDay > 6 && currentDay <= 13) {
    return Days[currentDay - 7];
  } else if (currentDay > 13 && currentDay <= 20) {
    return Days[currentDay - 14];
  } else if (currentDay > 20 && currentDay <= 27) {
    return Days[currentDay - 21];
  } else if (currentDay > 27 && currentDay <= 34) {
    return Days[currentDay - 28];
  } else {
    return Days[currentDay - 35];
  }
};

export const Months = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

export const Days = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};
