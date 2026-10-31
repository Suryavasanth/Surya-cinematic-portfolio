import { useEffect, useRef, useState } from "react";

export default function useScrollReveal(options = {}) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const { threshold = 0.18, rootMargin = "0px 0px -8% 0px" } = options;

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref: elementRef, isVisible };
}
