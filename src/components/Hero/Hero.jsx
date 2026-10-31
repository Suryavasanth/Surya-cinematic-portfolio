import { useEffect, useRef, useState } from "react";
import "./Hero.css";

function Hero() {
  const [isRevealed, setIsRevealed] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // =====================================================
    // CINEMATIC REVEAL
    // =====================================================

    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 2000);

    // =====================================================
    // HERO AUDIO
    // =====================================================

    const audio = audioRef.current;
    let playbackHandler;
    let hasPlayRequest = false;

    if (audio) {
      audio.currentTime = 0;

      const removePlaybackListeners = () => {
        document.removeEventListener("pointerdown", playAudio, true);
        document.removeEventListener("keydown", playAudio, true);
      };

      const playAudio = () => {
        if (!audio.paused || hasPlayRequest) return;

        hasPlayRequest = true;
        audio.play()
          .then(removePlaybackListeners)
          .catch((error) => {
            if (!["AbortError", "NotAllowedError"].includes(error.name)) {
              console.error("Hero audio playback failed:", error);
            }
          })
          .finally(() => {
            hasPlayRequest = false;
          });
      };

      playbackHandler = playAudio;
      document.addEventListener("pointerdown", playAudio, true);
      document.addEventListener("keydown", playAudio, true);
      playAudio();
    }

    // =====================================================
    // CLEANUP
    // =====================================================

    return () => {
      clearTimeout(timer);

      if (audio) {
        if (playbackHandler) {
          document.removeEventListener("pointerdown", playbackHandler, true);
          document.removeEventListener("keydown", playbackHandler, true);
        }

        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  return (
    <section className="hero" id="home">
      {/* =====================================================
          HERO MUSIC
      ===================================================== */}

      <audio ref={audioRef} src="/audio/hero.webm" preload="auto" />

      {/* =====================================================
          WHITE / WARM BACKGROUND
      ===================================================== */}

      <div className="hero__background" />

      {/* =====================================================
          WALKING VIDEO
      ===================================================== */}

      <div className="hero__video-wrapper">
        <video
          className="hero__video"
          src="/videos/surya-walking.webm"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>

      {/* =====================================================
          LEFT — NAME
      ===================================================== */}

      <div className="hero__identity hero__identity--left">
        <span className="hero__small-label">DIGITAL PRODUCT ENGINEER</span>

        <h1>SURYA</h1>
      </div>

      {/* =====================================================
          RIGHT — ROLE
      ===================================================== */}

      <div className="hero__identity hero__identity--right">
        <span className="hero__line" />

        <h2>
          MERN STACK
          <br />
          <span>DEVELOPER</span>
        </h2>

        <p>WEB · MOBILE · REAL-WORLD SYSTEMS</p>
      </div>

      {/* =====================================================
          BLACK CINEMATIC REVEAL — TOP
      ===================================================== */}

      <div
        className={`hero__door hero__door--top ${
          isRevealed ? "hero__door--open" : ""
        }`}
      />

      {/* =====================================================
          BLACK CINEMATIC REVEAL — BOTTOM
      ===================================================== */}

      <div
        className={`hero__door hero__door--bottom ${
          isRevealed ? "hero__door--open" : ""
        }`}
      />

      {/* =====================================================
          SUBTLE VIGNETTE
      ===================================================== */}

      <div className="hero__vignette" />

      {/* =====================================================
          FILM GRAIN
      ===================================================== */}

      <div className="hero__grain" />
    </section>
  );
}

export default Hero;
