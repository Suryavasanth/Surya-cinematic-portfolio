import { useEffect, useMemo, useState } from "react";
import useScrollReveal from "../../hooks/useScrollReveal";
import "./SelectedWork.css";

/* =========================================================
   DEVICE FRAME ASSETS
========================================================= */

const DEVICE_FRAMES = {
  mobile: "/mockups/iphone-frame.webp",
  website: "/mockups/monitor-frame.webp",
  kiosk: "/mockups/kiosk-frame.webp",
};

/* =========================================================
   WORK VIDEO
========================================================= */

const WORK_VIDEO = "/videos/work-setup.webm";

/* =========================================================
   PROJECT DATA
========================================================= */

const projects = [
  /* =======================================================
     MOBILE PROJECTS
  ======================================================= */

  {
    id: "social-capital-mobile",
    type: "mobile",
    title: "SOCIAL CAPITAL",
    description:
      "A community-focused mobile platform designed to help people create groups, manage contributions, track rounds and build financial trust with the people they know.",
    screens: [
      "/projects/mobile/social-capital/logo.webp",
      "/projects/mobile/social-capital/screen-1.webp",
      "/projects/mobile/social-capital/screen-2.webp",
      "/projects/mobile/social-capital/screen-3.webp",
    ],
  },

  {
    id: "one-way-limousine",
    type: "mobile",
    title: "ONE WAY LIMOUSINE",
    description:
      "A focused transportation experience built around booking, trip management and a simple customer journey for limousine services.",
    screens: [
      "/projects/mobile/one-way-limousine/logo.webp",
      "/projects/mobile/one-way-limousine/screen-1.webp",
      "/projects/mobile/one-way-limousine/screen-2.webp",
      "/projects/mobile/one-way-limousine/screen-3.webp",
    ],
  },

  {
    id: "gmk-transports",
    type: "mobile",
    title: "GMK TRANSPORTS",
    description:
      "A transportation management experience focused on operational visibility, trip information and a streamlined mobile workflow.",
    screens: [
      "/projects/mobile/gmk-transports/logo.webp",
      "/projects/mobile/gmk-transports/screen-1.webp",
      "/projects/mobile/gmk-transports/screen-2.webp",
      "/projects/mobile/gmk-transports/screen-3.webp",
    ],
  },

  {
    id: "kamathenu-transports",
    type: "mobile",
    title: "KAMATHENU TRANSPORTS",
    description:
      "A practical mobile experience for transportation operations with clear navigation, service information and task-oriented user flows.",
    screens: [
      "/projects/mobile/kamathenu-transports/logo.webp",
      "/projects/mobile/kamathenu-transports/screen-1.webp",
      "/projects/mobile/kamathenu-transports/screen-2.webp",
      "/projects/mobile/kamathenu-transports/screen-3.webp",
    ],
  },

  /* =======================================================
     WEBSITE PROJECTS
  ======================================================= */

  {
    id: "cravings",
    type: "website",
    title: "CRAVINGS",
    description:
      "A food ordering platform designed around rich food discovery, menu browsing and a fast, visually engaging ordering experience.",
    screens: [
      "/projects/web/cravings/logo.webp",
      "/projects/web/cravings/screen-1.webp",
      "/projects/web/cravings/screen-2.webp",
      "/projects/web/cravings/screen-3.webp",
    ],
  },

  {
    id: "social-capital-web",
    type: "website",
    title: "SOCIAL CAPITAL",
    description:
      "A digital platform that extends the Social Capital ecosystem to the web with clear product storytelling, community-focused interactions and conversion-driven flows.",
    screens: [
      "/projects/web/social-capital/logo.webp",
      "/projects/web/social-capital/screen-1.webp",
      "/projects/web/social-capital/screen-2.webp",
      "/projects/web/social-capital/screen-3.webp",
    ],
  },

  {
    id: "nexzen-mortgage",
    type: "website",
    title: "NEXZEN MORTGAGE",
    description:
      "A professional mortgage website built to communicate services clearly while creating a structured path from information discovery to application.",
    screens: [
      "/projects/web/nexzen-mortgage/logo.webp",
      "/projects/web/nexzen-mortgage/screen-1.webp",
      "/projects/web/nexzen-mortgage/screen-2.webp",
      "/projects/web/nexzen-mortgage/screen-3.webp",
    ],
  },

  {
    id: "portfolio",
    type: "website",
    title: "SURYA PORTFOLIO",
    description:
      "A cinematic personal portfolio focused on engineering, digital products, real-world systems and selected work.",
    screens: [
      "/projects/web/portfolio/logo.webp",
      "/projects/web/portfolio/screen-1.webp",
      "/projects/web/portfolio/screen-2.webp",
      "/projects/web/portfolio/screen-3.webp",
      "/projects/web/portfolio/screen-4.webp",
    ],
  },

  {
    id: "cloud-cubic",
    type: "website",
    title: "CLOUD CUBIC",
    description:
      "A modern digital presence created around clean information architecture, polished interactions and a technology-driven visual language.",
    screens: [
      "/projects/web/cloud-cubic/logo.webp",
      "/projects/web/cloud-cubic/screen-1.webp",
      "/projects/web/cloud-cubic/screen-2.webp",
      "/projects/web/cloud-cubic/screen-3.webp",
    ],
  },

  {
    id: "csd-certificate-generator",
    type: "website",
    title: "CSD CERTIFICATE GENERATOR",
    description:
      "A utility-focused web application for generating certificates through a structured and reusable workflow.",
    screens: [
      "/projects/web/csd-certificate-generator/logo.webp",
      "/projects/web/csd-certificate-generator/screen-1.webp",
      "/projects/web/csd-certificate-generator/screen-2.webp",
      "/projects/web/csd-certificate-generator/screen-3.webp",
    ],
  },

  {
    id: "axis-title",
    type: "website",
    title: "AXIS TITLE",
    description:
      "A professional title and escrow digital experience designed to present complex services through a clear and trustworthy interface.",
    screens: [
      "/projects/web/axis-title/logo.webp",
      "/projects/web/axis-title/screen-1.webp",
      "/projects/web/axis-title/screen-2.webp",
      "/projects/web/axis-title/screen-3.webp",
    ],
  },

  /* =======================================================
     KIOSK PROJECTS
  ======================================================= */

  {
    id: "grand-cinemas",
    type: "kiosk",
    title: "GRAND CINEMAS",
    description:
      "A cinema self-service kiosk experience designed around fast movie discovery, ticket selection and a simple customer journey.",
    screens: [
      "/projects/kiosk/grand-cinemas/logo.webp",
      "/projects/kiosk/grand-cinemas/screen-1.webp",
      "/projects/kiosk/grand-cinemas/screen-2.webp",
      "/projects/kiosk/grand-cinemas/screen-3.webp",
      "/projects/kiosk/grand-cinemas/screen-4.webp",
    ],
  },
];

/* =========================================================
   FILTERS
========================================================= */

const filters = [
  {
    id: "website",
    label: "WEBSITE",
  },
  {
    id: "mobile",
    label: "MOBILE",
  },
  {
    id: "kiosk",
    label: "KIOSK",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function SelectedWork() {
  const { ref: sectionRef, isVisible } = useScrollReveal({
    threshold: 0.2,
  });

  const [activeType, setActiveType] = useState("website");

  const [projectIndex, setProjectIndex] = useState(0);

  const [screenIndex, setScreenIndex] = useState(0);

  /* =======================================================
     FILTERED PROJECTS
  ======================================================= */

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => project.type === activeType);
  }, [activeType]);

  const currentProject = filteredProjects[projectIndex] || filteredProjects[0];

  /* =======================================================
     CHANGE CATEGORY
  ======================================================= */

  const handleTypeChange = (type) => {
    setActiveType(type);
    setProjectIndex(0);
    setScreenIndex(0);
  };

  /* =======================================================
     CHANGE PROJECT
  ======================================================= */

  const changeProject = (direction) => {
    if (!filteredProjects.length) return;

    setProjectIndex((current) => {
      if (direction === "next") {
        return (current + 1) % filteredProjects.length;
      }

      return (current - 1 + filteredProjects.length) % filteredProjects.length;
    });

    setScreenIndex(0);
  };

  /* =======================================================
     CHANGE SCREEN
  ======================================================= */

  const changeScreen = (direction) => {
    if (!currentProject?.screens?.length) {
      return;
    }

    setScreenIndex((current) => {
      if (direction === "next") {
        return (current + 1) % currentProject.screens.length;
      }

      return (
        (current - 1 + currentProject.screens.length) %
        currentProject.screens.length
      );
    });
  };

  /* =======================================================
     AUTO SCREEN CHANGE
  ======================================================= */

  useEffect(() => {
    if (!currentProject?.screens?.length) {
      return;
    }

    const timer = setInterval(() => {
      setScreenIndex(
        (current) => (current + 1) % currentProject.screens.length,
      );
    }, 3200);

    return () => clearInterval(timer);
  }, [currentProject]);

  if (!currentProject) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      id="work"
      className={`selected-work ${isVisible ? "is-visible" : ""}`}>
      {/* =================================================
          SOFT RIGHT-SIDE LIGHT
      ================================================= */}

      <div className="selected-work__light" aria-hidden="true" />

      <div className="selected-work__inner">
        {/* =================================================
            HEADER AREA
        ================================================= */}

        <div className="selected-work__top">
          <span className="selected-work__eyebrow">SELECTED WORK</span>

          {/* CATEGORY TOGGLE */}

          <div className="selected-work__top-filter">
            <div className="work-filters">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  className={
                    activeType === filter.id
                      ? "work-filter active"
                      : "work-filter"
                  }
                  onClick={() => handleTypeChange(filter.id)}>
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* =================================================
            MAIN STAGE
        ================================================= */}

        <div className="selected-work__stage">
          {/* =================================================
              LEFT — DEVICE
          ================================================= */}

          <div className={`work-device-area work-device-area--${activeType}`}>
            {/* SCREEN PREVIOUS */}

            <button
              type="button"
              className="screen-arrow screen-arrow--left"
              onClick={() => changeScreen("prev")}
              aria-label="Previous screen">
              ←
            </button>

            {/* DEVICE */}

            <div className={`device device--${activeType}`}>
              {/* SCREEN */}

              <div className={`device-screen device-screen--${activeType}`}>
                <img
                  key={`${currentProject.id}-${screenIndex}`}
                  src={currentProject.screens[screenIndex]}
                  alt={`${currentProject.title} screen`}
                />
              </div>

              {/* FRAME */}

              <img
                src={DEVICE_FRAMES[activeType]}
                className="device-frame"
                alt=""
                aria-hidden="true"
              />
            </div>

            {/* SCREEN NEXT */}

            <button
              type="button"
              className="screen-arrow screen-arrow--right"
              onClick={() => changeScreen("next")}
              aria-label="Next screen">
              →
            </button>

            {/* SCREEN DOTS */}

            <div className="screen-indicator">
              {currentProject.screens.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={
                    screenIndex === index ? "screen-dot active" : "screen-dot"
                  }
                  onClick={() => setScreenIndex(index)}
                  aria-label={`Screen ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* =================================================
              RIGHT — VIDEO + PROJECT INFO
          ================================================= */}

          <div className="work-right">
            {/* =================================================
                MAC SETUP VIDEO
            ================================================= */}

            <div className="work-video-area">
              <div className="work-video">
                <video
                  src={WORK_VIDEO}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                />
              </div>
            </div>

            {/* =================================================
                PROJECT INFORMATION
            ================================================= */}

            <div className="work-project-info">
              {/* =================================================
                  PROJECT TITLE WITH LEFT / RIGHT ARROWS
              ================================================= */}

              <div className="work-project-copy">
                <div className="work-project-title-row">
                  {/* PREVIOUS PROJECT */}

                  <button
                    type="button"
                    className="project-title-arrow project-title-arrow--left"
                    onClick={() => changeProject("prev")}
                    aria-label="Previous project">
                    <span>←</span>
                  </button>

                  {/* TITLE */}

                  <h2>{currentProject.title}</h2>

                  {/* NEXT PROJECT */}

                  <button
                    type="button"
                    className="project-title-arrow project-title-arrow--right"
                    onClick={() => changeProject("next")}
                    aria-label="Next project">
                    <span>→</span>
                  </button>
                </div>

                {/* DESCRIPTION */}

                <p>{currentProject.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
