import useScrollReveal from "../../hooks/useScrollReveal";
import "./Introduction.css";

function Introduction() {
  const { ref: sectionRef, isVisible } = useScrollReveal({
    threshold: 0.18,
  });

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`introduction ${isVisible ? "introduction--visible is-visible" : ""}`}>
      {/* =====================================================
          CINEMATIC LIGHT
      ===================================================== */}

      <div className="introduction__ambient-light" aria-hidden="true" />

      {/* =====================================================
          SOFT FILM GRAIN
      ===================================================== */}

      <div className="introduction__grain" aria-hidden="true" />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="introduction__inner">
        {/* ===================================================
            LEFT — INTRO CONTENT
        =================================================== */}

        <div className="introduction__statement">
          <div className="introduction__eyebrow">
            DIGITAL PRODUCTS · WEB · MOBILE
          </div>

          <h2>
            <span className="intro-line">I DON'T JUST</span>

            <span className="intro-line">
              BUILD <em>WEBSITES.</em>
            </span>

            <span className="intro-line">I BUILD</span>

            <span className="intro-line intro-line--strong">
              DIGITAL SYSTEMS
            </span>

            <span className="intro-line">
              THAT FEEL <em>ALIVE.</em>
            </span>
          </h2>

          <div className="introduction__description">
            I turn ideas into digital products that are designed to work,
            communicate, and feel human.
          </div>

          <div className="introduction__accent-line">
            <span />
          </div>
        </div>

        {/* ===================================================
            RIGHT — CINEMATIC VIDEO
        =================================================== */}

        <div className="introduction__visual">
          {/* Ambient halo behind person */}

          <div className="introduction__video-glow" aria-hidden="true" />

          <div className="introduction__video-frame">
            <video
              className="introduction__video"
              src="/videos/surya-intro.webm"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* ===================================================
            BOTTOM CINEMATIC LINE
        =================================================== */}
      </div>

      {/* =====================================================
          VIGNETTE
      ===================================================== */}

      <div className="introduction__vignette" aria-hidden="true" />
    </section>
  );
}

export default Introduction;
