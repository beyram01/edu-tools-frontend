import React from "react";
import Service from "./Service";
import {
  translator,
  encyclopedia,
  events,
  projectManager,
} from "../../../svgs";
import "../css/Services.css";

const fakeDescription =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. ";

const tools = [
  {
    svg: translator,
    name: "Translator",
    description: "Translate your text to any language you want.",
  },
  {
    svg: encyclopedia,
    name: "Encyclopedia",
    description:
      "Search any term, subject or anything you want easily. Learn new things every day.",
  },
  {
    svg: events,
    name: "Events Manager",
    description: "Manage your events, meetings and organize your schedule",
  },
  {
    svg: projectManager,
    name: "Projects Manager",
    description:
      "Mannage your projects with a smooth draggble components and make your next idea succeed.",
  },
];

const Services = () => {
  return (
    <section className="services">
      <h3 className="services-title">Services</h3>
      <div className="tools">
        {tools.map((tool, index) => {
          return (
            <Service
              key={index}
              svg={tool.svg}
              name={tool.name}
              description={tool.description}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Services;
