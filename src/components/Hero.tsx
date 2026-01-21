'use client';

import React from 'react';
import Image from 'next/image';
import Button from './Button';
import { useHeroCarousel } from '@/hooks/useHeroCarousel';
import styles from './Hero.module.scss';

const Hero: React.FC = () => {
  const slides = [
    {
      title: 'Место встречи людей, увлечённых теннисом и паделом',
      button: {
        text: 'Наше приложение',
        href: 'https://apps.apple.com/ru/app/nakort-tennis-club/id6742146880',
      },
    },
    {
      title: 'Профессиональные корты и тренировки',
      button: {
        text: 'Записаться на тренировку',
        href: '#',
        modal: 'training',
      },
    },
    {
      title: 'Турниры и соревнования',
      button: {
        text: 'Участвовать в турнире',
        href: '#tournaments',
      },
    },
  ];

  const { currentSlide, nextSlide, prevSlide, goToSlide, handleMouseEnter, handleMouseLeave } =
    useHeroCarousel({
      slidesCount: slides.length,
      autoplayInterval: 5000,
      pauseOnHover: true,
    });

  return (
    <section className={styles.hero} itemScope itemType="https://schema.org/WebPageElement">
      <div className={styles.heroCarousel} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className={styles.heroSlides}>
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`${styles.heroSlide} ${
                index === currentSlide ? styles.heroSlideActive : ''
              } ${index < currentSlide ? styles.heroSlidePrev : ''} ${
                index > currentSlide ? styles.heroSlideNext : ''
              }`}
            >
              <div className={styles.heroSlideBg}>
                {index === 0 ? (
                  <Image
                    src="/img/hero/bg.webp"
                    alt=""
                    fill
                    priority
                    quality={90}
                    sizes="100vw"
                    style={{ objectFit: 'cover', objectPosition: 'top center' }}
                  />
                ) : (
                  <Image
                    src="/img/hero/bg.webp"
                    alt=""
                    fill
                    quality={90}
                    sizes="100vw"
                    style={{ objectFit: 'cover', objectPosition: 'top center' }}
                    loading="lazy"
                  />
                )}
              </div>
              <div className="container">
                <div className={styles.heroContent}>
                  <h1 className={styles.heroTitle} itemProp="headline">
                    {slide.title}
                  </h1>
                  <div className={styles.heroActions}>
                    <Button
                      text={slide.button.text}
                      href={slide.button.href}
                      variant="primary"
                      className={styles.heroButton}
                      type={slide.button.modal ? 'button' : 'link'}
                      data-modal={slide.button.modal}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.heroControls}>
          <button
            className={`${styles.heroNavBtn} ${styles.heroNavBtnPrev}`}
            onClick={prevSlide}
            aria-label="Предыдущий слайд"
          >
            <svg width="14" height="25" viewBox="0 0 14 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.5898 0.80932L1.14453 12.2546L12.5898 23.7"
                stroke="currentColor"
                strokeWidth="1.61861"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div className={styles.heroDots}>
            {slides.map((_, index) => (
              <button
                key={index}
                className={`${styles.heroDot} ${index === currentSlide ? styles.heroDotActive : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Слайд ${index + 1}`}
                data-slide={index}
              />
            ))}
          </div>
          <button
            className={`${styles.heroNavBtn} ${styles.heroNavBtnNext}`}
            onClick={nextSlide}
            aria-label="Следующий слайд"
          >
            <svg width="14" height="25" viewBox="0 0 14 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.41016 0.80932L12.8554 12.2546L1.41016 23.7"
                stroke="currentColor"
                strokeWidth="1.61861"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

