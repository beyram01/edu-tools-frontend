import React from "react";
import Service from "./Service";
import { translator } from "../../../svgs";
import "../css/Services.css";

const fakeDescription =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. ";

const Services = () => {
  return (
    <section className="services">
      <h3 className="services-title">Services</h3>
      <div className="tools">
        <Service
          svg={translator}
          name="Translator"
          description={fakeDescription}
        />
        <Service
          svg={translator}
          name="Translator"
          description={fakeDescription}
        />
        <Service
          svg={translator}
          name="Translator"
          description={fakeDescription}
        />
        <Service
          svg={translator}
          name="Translator"
          description={fakeDescription}
        />
      </div>
    </section>
  );
};

export default Services;
