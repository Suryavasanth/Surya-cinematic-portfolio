import { useState } from "react";
import useScrollReveal from "../../hooks/useScrollReveal";
import "./EngineeringStack.css";

const SKILL_GROUPS = [
  {
    id: "frontend",
    number: "01",
    title: "FRONTEND",
    description: "Interfaces & experiences",
    skills: [
      {
        name: "JavaScript",
        short: "JS",
        detail: "Dynamic interfaces & application logic",
      },
      {
        name: "React",
        short: "RE",
        detail: "Component-driven web applications",
      },
      {
        name: "React Native",
        short: "RN",
        detail: "Cross-platform mobile applications",
      },
      {
        name: "Tailwind CSS",
        short: "TW",
        detail: "Responsive UI systems",
      },
    ],
  },

  {
    id: "backend",
    number: "02",
    title: "BACKEND",
    description: "Server & APIs",
    skills: [
      {
        name: "Node.js",
        short: "NO",
        detail: "Server-side JavaScript applications",
      },
      {
        name: "Express.js",
        short: "EX",
        detail: "REST API architecture",
      },
      {
        name: "FastAPI",
        short: "FA",
        detail: "High-performance Python APIs",
      },
      {
        name: "REST APIs",
        short: "API",
        detail: "System-to-system communication",
      },
    ],
  },

  {
    id: "data",
    number: "03",
    title: "DATA",
    description: "Database layer",
    skills: [
      {
        name: "MongoDB",
        short: "MO",
        detail: "Document-based data systems",
      },
      {
        name: "Supabase",
        short: "SB",
        detail: "Backend services & PostgreSQL",
      },
      {
        name: "MySQL",
        short: "MY",
        detail: "Relational data systems",
      },
      {
        name: "PostgreSQL",
        short: "PG",
        detail: "Production-grade relational data",
      },
    ],
  },

  {
    id: "delivery",
    number: "04",
    title: "DELIVERY",
    description: "DevOps & deployment",
    skills: [
      {
        name: "Git",
        short: "GI",
        detail: "Version control",
      },
      {
        name: "GitHub",
        short: "GH",
        detail: "Code collaboration & delivery",
      },
      {
        name: "Postman",
        short: "PM",
        detail: "API development & testing",
      },
      {
        name: "Docker",
        short: "DO",
        detail: "Containerized applications",
      },
      {
        name: "AWS",
        short: "AWS",
        detail: "Cloud infrastructure",
      },
      {
        name: "Vercel",
        short: "VE",
        detail: "Frontend deployment",
      },
    ],
  },
];

function EngineeringStack() {
  const { ref: sectionRef, isVisible } = useScrollReveal({
    threshold: 0.15,
  });

  const [activeGroup, setActiveGroup] = useState("frontend");
  const [activeSkill, setActiveSkill] = useState("JavaScript");

  const handleGroupChange = (group) => {
    setActiveGroup(group.id);
    setActiveSkill(group.skills[0].name);
  };

  return (
    <section
      ref={sectionRef}
      id="stack"
      className={`engineering-stack ${
        isVisible ? "engineering-stack--visible is-visible" : ""
      }`}>
      <div className="engineering-stack__inner">
        {/* =====================================================
            LEFT — ENGINEERING STACK
        ====================================================== */}

        <div className="engineering-stack__content">
          <div className="engineering-stack__eyebrow">ENGINEERING STACK</div>

          <div className="engineering-stack__heading">
            <h2>
              <span className="reveal-line">THE TOOLS</span>
              <span className="reveal-line">BEHIND THE</span>
              <span className="reveal-line reveal-line--accent">SYSTEMS.</span>
            </h2>

            <p>
              A practical stack I use to turn ideas into reliable digital
              products.
            </p>
          </div>

          {/* ===================================================
              SKILL GROUPS
          ==================================================== */}

          <div className="engineering-stack__groups">
            {SKILL_GROUPS.map((group) => {
              const isActive = activeGroup === group.id;

              return (
                <div
                  key={group.id}
                  className={`stack-group ${
                    isActive ? "stack-group--active" : ""
                  }`}>
                  {/* GROUP HEADER */}

                  <button
                    type="button"
                    className="stack-group__header"
                    onClick={() => handleGroupChange(group)}
                    aria-expanded={isActive}>
                    <span className="stack-group__number">{group.number}</span>

                    <span className="stack-group__title-wrap">
                      <span className="stack-group__title">{group.title}</span>

                      <span className="stack-group__description">
                        {group.description}
                      </span>
                    </span>

                    <span className="stack-group__arrow">
                      {isActive ? "−" : "+"}
                    </span>
                  </button>

                  {/* SKILLS */}

                  <div
                    className={`stack-group__skills ${
                      isActive ? "stack-group__skills--open" : ""
                    }`}>
                    {group.skills.map((skill) => {
                      const isSkillActive =
                        activeSkill === skill.name && isActive;

                      return (
                        <button
                          key={skill.name}
                          type="button"
                          className={`stack-skill ${
                            isSkillActive ? "stack-skill--active" : ""
                          }`}
                          onMouseEnter={() => setActiveSkill(skill.name)}
                          onFocus={() => setActiveSkill(skill.name)}
                          onClick={() => setActiveSkill(skill.name)}>
                          <span className="stack-skill__mark">
                            {skill.short}
                          </span>

                          <span className="stack-skill__name">
                            {skill.name}
                          </span>

                          <span className="stack-skill__detail">
                            {skill.detail}
                          </span>

                          <span className="stack-skill__indicator" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =====================================================
            RIGHT — VIDEO
        ====================================================== */}

        <div className="engineering-stack__visual">
          <div className="engineering-stack__video-wrap">
            <video
              className="engineering-stack__video"
              src="/videos/engineering-stack.webm"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default EngineeringStack;
