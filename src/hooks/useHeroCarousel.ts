'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseHeroCarouselProps {
  slidesCount: number;
  autoplayInterval?: number;
  pauseOnHover?: boolean;
}

export const useHeroCarousel = ({
  slidesCount,
  autoplayInterval = 5000,
  pauseOnHover = true,
}: UseHeroCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slidesCount);
  }, [slidesCount]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slidesCount) % slidesCount);
  }, [slidesCount]);

  const goToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index < slidesCount) {
        setCurrentSlide(index);
      }
    },
    [slidesCount]
  );

  useEffect(() => {
    if (autoplayInterval <= 0 || isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [autoplayInterval, isPaused, nextSlide]);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  }, [pauseOnHover]);

  return {
    currentSlide,
    nextSlide,
    prevSlide,
    goToSlide,
    handleMouseEnter,
    handleMouseLeave,
  };
};




