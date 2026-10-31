import { useEffect, useState } from "react";
import "./Header.css";

const NAV_LINKS = [
  { label: "HOME", id: "home" },
  { label: "ABOUT", id: "about" },
  { label: "STACK", id: "stack" },
  { label: "WORK", id: "work" },
  { label: "CONTACT", id: "contact" },
];

function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Reveal header after cinematic hero animation.
    const revealTimer = setTimeout(() => {
      setIsVisible(true);
    }, 6800);

    const sections = NAV_LINKS.map(({ id }) =>
      document.getElementById(id),
    ).filter(Boolean);

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const marker = window.innerHeight * 0.35;
      const currentSection = sections.find((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= marker && bounds.bottom > marker;
      });

      if (!currentSection) return;

      const sectionId = currentSection.id;
      setActiveSection(sectionId);

      if (window.location.hash !== `#${sectionId}`) {
        window.history.replaceState(
          window.history.state,
          "",
          `${window.location.pathname}${window.location.search}#${sectionId}`,
        );
      }

      try {
        window.sessionStorage.setItem(
          "portfolio-scroll-position",
          JSON.stringify({ sectionId, scrollY: window.scrollY }),
        );
      } catch {
        // Continue navigation if session storage is unavailable.
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(revealTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`site-header ${
        isVisible ? "site-header--visible" : ""
      } ${scrolled ? "site-header--scrolled" : ""}`}>
      <div className="site-header__inner">
        {/* BRAND */}
        <a href="#home" className="site-header__brand">
          <span className="site-header__brand-main">SURYA</span>

          <span className="site-header__brand-sub">PORTFOLIO</span>
        </a>

        {/* NAVIGATION */}
        <nav
          id="site-header-navigation"
          className={`site-header__nav ${menuOpen ? "site-header__nav--open" : ""}`}
          aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMenuOpen(false)}
              className={`site-header__link ${
                activeSection === link.id ? "site-header__link--active" : ""
              }`}
              aria-current={activeSection === link.id ? "location" : undefined}>
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="site-header__menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="site-header-navigation">
          <span />
          <span />
          <span />
        </button>

        {/* CTA */}
        <a href="#contact" className="site-header__cta">
          <span className="site-header__cta-dot" />
          <span>LET'S TALK</span>
          <span className="site-header__cta-arrow">↗</span>
        </a>
      </div>

      <div className="site-header__line" />
    </header>
  );
}

export default Header;
