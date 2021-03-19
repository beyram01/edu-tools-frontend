import React, { useState } from "react";
import "../css/Contact.css";

const Contact = () => {
  const [data, setData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <section className="contact" id="contact">
      <h3 className="contact-title">Get In Touch</h3>
      <form action="#">
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            required={true}
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
            required={true}
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
            required={true}
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
          Send
        </button>
      </form>
    </section>
  );
};

export default Contact;
