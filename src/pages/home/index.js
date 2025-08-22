import React, { useState, useEffect } from "react";
import EarthGlobe from "../../components/EarthGlobe";

import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { introdata, meta } from "../../content_option";
import { Link } from "react-router-dom";

export const Home = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const current = localStorage.getItem("theme") || "dark";
    setTheme(current);

    const observer = new MutationObserver(() => {
      const updated = document.documentElement.getAttribute("data-theme");
      setTheme(updated);
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    <HelmetProvider>
      <section id="home" className="home">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>

        {/* Responsive Flex Layout */}
        <div className="home-flex-container">
          {/* Text Part */}
          <div className="home-text">
            <div className="intro mx-auto">
              <h2 className="mb-1x">{introdata.title}</h2>
              <h1 className="fluidz-48 mb-1x">
                <Typewriter
                  options={{
                    strings: [
                      introdata.animated.first,
                      introdata.animated.second,
                      introdata.animated.third,
                    ],
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 10,
                  }}
                />
              </h1>
              <p className="mb-1x">{introdata.description}</p>
              <div className="intro_btn-action pb-5">
                <Link to="/portfolio" className="text_2">
                  <div id="button_p" className="ac_btn btn">
                    My Portfolio
                    <div className="ring one"></div>
                    <div className="ring two"></div>
                    <div className="ring three"></div>
                  </div>
                </Link>
                <Link to="/contact">
                  <div id="button_h" className="ac_btn btn">
                    Contact Me
                    <div className="ring one"></div>
                    <div className="ring two"></div>
                    <div className="ring three"></div>
                  </div>
                </Link>
                <a
                  href="/ResumeVedanshGUpta.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text_2"
                >
                  <div id="button_p" className="ac_btn btn">
                    
                    Resume
                    <div className="ring one"></div>
                    <div className="ring two"></div>
                    <div className="ring three"></div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Globe Part */}
          <div className="home-globe">
            <EarthGlobe />
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
};
