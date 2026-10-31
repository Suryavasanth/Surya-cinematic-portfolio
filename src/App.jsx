import { useLayoutEffect } from "react";
import Contact from "./components/Contact/Contact";
import EngineeringStack from "./components/EngineeringStack/EngineeringStack";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Introduction from "./components/Introduction/Introduction";
import SelectedWork from "./components/SelectedWork/SelectedWork";

function App() {
  useLayoutEffect(() => {
    const hashSectionId = decodeURIComponent(window.location.hash.slice(1));
    const hashSection = document.getElementById(hashSectionId);
    const navigationType = performance.getEntriesByType("navigation")[0]?.type;
    let savedPosition;

    try {
      savedPosition = JSON.parse(
        window.sessionStorage.getItem("portfolio-scroll-position"),
      );
    } catch {
      savedPosition = null;
    }

    const shouldRestoreSavedPosition =
      navigationType === "reload" &&
      Number.isFinite(savedPosition?.scrollY) &&
      (savedPosition.sectionId === hashSectionId ||
        !hashSection ||
        (hashSectionId === "home" && savedPosition.sectionId !== "home"));

    if (shouldRestoreSavedPosition) {
      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;

      root.style.scrollBehavior = "auto";
      window.scrollTo(0, savedPosition.scrollY);
      root.style.scrollBehavior = previousScrollBehavior;
      return;
    }

    if (!hashSection) return;

    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    const scrollPaddingTop =
      Number.parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;

    root.style.scrollBehavior = "auto";
    window.scrollTo(
      0,
      window.scrollY + hashSection.getBoundingClientRect().top - scrollPaddingTop,
    );
    root.style.scrollBehavior = previousScrollBehavior;
  }, []);

  return (
    <>
      <Header />

      <main>
        <Hero />
        <Introduction />
        <EngineeringStack />
        <SelectedWork />
        <Contact />
      </main>
    </>
  );
}

export default App;
