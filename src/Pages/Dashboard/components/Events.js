import React, { useState, useEffect } from "react";
import { arrow } from "../../../svgs";
import Calendar, { Days, Months } from "./Calendar";
import Tasks from "./Tasks";
import { getMonth, getYear, compareAsc } from "date-fns";
import { useParams } from "react-router-dom";
import api from "../../../axios.config";
import { useSelector } from "react-redux";
import Spinner from "../../_GlobalComponents/Spinner";
import "../css/Events.css";

const Events = ({ width }) => {
  const [currentMonth, setCurrentMonth] = useState(getMonth(new Date()));
  const [currentYear, setCurrentYear] = useState(getYear(new Date()));
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { title } = useParams();

  const { token, username } = useSelector((state) => state.user);

  const [unfinishidEvents, setUnfinishedEvents] = useState([]);
  // filter events to keep the unfinished ones.
  useEffect(() => {
    const filtredEvents = events.filter((event) => !event.done);
    console.log(filtredEvents);
    setUnfinishedEvents(filtredEvents);
  }, [events]);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        if (token) {
          const res = await api(`/events/${username}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res) {
            const toDeleteEvents = res.data.filter((event) => {
              const [year, month, day] = event.day.split("-");
              const [hour, minute] = event.time.split(":");
              const eventDay = new Date(year, month - 1, day, hour, minute);
              /*
              compareAsc function result:
              1: first date is after the second
              0: dates are equal
              -1: if the first date is before the second
              */
              const compareResult = compareAsc(eventDay, new Date());
              return compareResult === -1;
            });

            //delete old events
            toDeleteEvents.map(async (event) => {
              await api.delete(`/events/${event.id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            });

            // filter the response from the deleted events
            let freshEvents = res.data;
            if (toDeleteEvents.length > 1) {
              toDeleteEvents.forEach((event) => {
                freshEvents = res.data.filter((ev) => event.id !== ev.id);
              });
              setEvents(freshEvents);
            } else {
              setEvents(freshEvents);
            }
          }
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

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
        <Tasks
          title={title}
          width={width}
          unfinishidEvents={unfinishidEvents}
          filterDate={filterDate}
        />
      ) : loading ? (
        <Spinner cx="20" cy="20" r="20" width="100%" height="100%" />
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
            <Calendar
              month={currentMonth}
              year={currentYear}
              width={width}
              events={events}
              unfinishidEvents={unfinishidEvents}
              filterDate={filterDate}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Events;

/**
 * Filter the events by day and return how many events in that day.
 *
 * @return {Number}
 */

const filterDate = (day, month, year) => {
  let fDay = day;
  let fMonth = month;
  let fYear = year;
  if (month < 10) {
    if (day < 10) {
      fDay = `0${day}`;
      fMonth = `0${month}`;
    } else {
      fDay = `${day}`;
      fMonth = `0${month}`;
    }
  } else {
    if (day < 10) {
      fDay = `0${day}`;
      fMonth = `${month}`;
    } else {
      fDay = `${day}`;
      fMonth = `${month}`;
    }
  }
  return { fDay, fMonth, fYear };
};
