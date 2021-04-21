import React, { useState, useEffect } from "react";
import api from "../../../axios.config";
import Spinner from "../../_GlobalComponents/Spinner";
import "../css/Contact.css";

const Contact = () => {
  const [data, setData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [btnText, setBtnText] = useState("Send");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { email, subject, message } = data;
      if (!email || !subject || !message)
        throw new Error("All fields are required");
      const res = await api.post("/sendMail", data);
      console.log(res);
      if (res.data.error) throw new Error(res.data.error);
      setBtnText(res.data.message);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <h3 className="contact-title">Get In Touch</h3>
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="error-container">
            <p>{error}</p>
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            value={data.email}
            type="email"
            name="email"
            id="contact-email"
            placeholder="Email Address"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            value={data.subject}
            type="text"
            name="subject"
            id="subject"
            placeholder="Subject"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            value={data.message}
            name="message"
            id="message"
            cols="30"
            rows="10"
            placeholder="message"
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="submit">
          {loading ? (
            <Spinner
              cx="10"
              cy="10"
              r="10"
              width="100%"
              height="100%"
              color="#ffffff"
              spinnerWidth="25px"
              spinnerHeight="25px"
              strokeWidth="2px"
              transform="translate(2px, 2px)"
              strokeDasharray="80"
              strokeDashoffset="80"
            />
          ) : (
            btnText
          )}
        </button>
      </form>
    </section>
  );
};

export default Contact;
