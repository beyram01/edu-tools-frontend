import React, { useState } from "react";
import { arrow } from "../../../svgs";
import Calendar, { Months } from "./Calendar";
import Tasks from "./Tasks";
import { getMonth, getYear } from "date-fns";
import { useParams } from "react-router-dom";
import "../css/Events.css";

const Events = ({ width }) => {
  const [currentMonth, setCurrentMonth] = useState(getMonth(new Date()));
  const [currentYear, setCurrentYear] = useState(getYear(new Date()));

  const { title } = useParams();

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
      return;
    }
    setCurrentMonth(currentMonth - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
      return;
    }
    setCurrentMonth(currentMonth + 1);
  };

  return (
    <>
      {title ? (
        <Tasks title={title} />
      ) : (
        <div className="events">
          <div className="events-header">
            <h6>Events</h6>
            <div className="calendar-nav">
              <div className="prev" onClick={prevMonth}>
                {arrow}
              </div>
              <div className="current-month">{Months[currentMonth]}</div>
              <div className="next" onClick={nextMonth}>
                {arrow}
              </div>
            </div>
            <div className="current-year">{currentYear}</div>
          </div>
          <div className="events-calendar-container">
            <Calendar month={currentMonth} year={currentYear} width={width} />
          </div>
        </div>
      )}
    </>
  );
};

export default Events;
