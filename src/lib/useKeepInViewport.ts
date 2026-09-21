'use client';

import { useLayoutEffect, useRef, useState } from 'react';

// On phones (< md) a popup that is centred on its trigger can stick out of the screen.
// While `active`, measures the element and returns how many px it has to be shifted
// horizontally to fit inside the viewport. Does nothing on wider screens.
export const useKeepInViewport = <T extends HTMLElement>(active: boolean, margin = 8) => {
  const ref = useRef<T>(null);
  const [shift, setShift] = useState(0);

  useLayoutEffect(() => {
    if (!active) {
      setShift(0);
      return;
    }
    const el = ref.current;
    if (!el || window.innerWidth >= 768) return;
    const { left, right } = el.getBoundingClientRect();
    const viewportWidth = document.documentElement.clientWidth;
    if (left < margin) setShift(margin - left);
    else if (right > viewportWidth - margin) setShift(viewportWidth - margin - right);
  }, [active, margin]);

  return { ref, shift };
};
