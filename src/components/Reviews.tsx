'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './Reviews.module.scss';

const Reviews: React.FC = () => {
  const reviews = [
    {
      name: 'Олег Дорожок',
      text: 'Прекрасные локации, все в доступности, можно найти удобный для себя вариант в любой день недели. Все тренеры профессионалы, спокойно объясняют, показывают.',
      photo: '/img/reviews/photo-1.webp',
    },
    {
      name: 'Олег Дорожок',
      text: 'Прекрасные локации, все в доступности, можно найти удобный для себя вариант в любой день недели. Все тренеры профессионалы, спокойно объясняют, показывают.',
      photo: '/img/reviews/photo-1.webp',
    },
    {
      name: 'Олег Дорожок',
      text: 'Прекрасные локации, все в доступности, можно найти удобный для себя вариант в любой день недели. Все тренеры профессионалы, спокойно объясняют, показывают.',
      photo: '/img/reviews/photo-1.webp',
    },
    {
      name: 'Олег Дорожок',
      text: 'Прекрасные локации, все в доступности, можно найти удобный для себя вариант в любой день недели. Все тренеры профессионалы, спокойно объясняют, показывают.',
      photo: '/img/reviews/photo-1.webp',
    },
    {
      name: 'Олег Дорожок',
      text: 'Прекрасные локации, все в доступности, можно найти удобный для себя вариант в любой день недели. Все тренеры профессионалы, спокойно объясняют, показывают.',
      photo: '/img/reviews/photo-1.webp',
    },
    {
      name: 'Олег Дорожок',
      text: 'Прекрасные локации, все в доступности, можно найти удобный для себя вариант в любой день недели. Все тренеры профессионалы, спокойно объясняют, показывают.',
      photo: '/img/reviews/photo-1.webp',
    },
  ];

  return (
    <section className={styles.reviews} id="reviews">
      <div className="container">
        <h2 className={styles.reviewsTitle}>Отзывы наших клиентов</h2>
        <div className={styles.reviewsWrapper}>
          <Swiper
            className={styles.reviewsCarousel}
            modules={[Navigation]}
            slidesPerView={1}
            spaceBetween={20}
            loop={true}
            navigation={{
              nextEl: `.${styles.reviewsNavBtnNext}`,
              prevEl: `.${styles.reviewsNavBtnPrev}`,
            }}
            breakpoints={{
              992: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index} className={styles.reviewsSlide}>
                <div className={styles.reviewsCard}>
                  <div className={styles.reviewsAvatar}>
                    <Image
                      src={review.photo}
                      alt={review.name}
                      width={100}
                      height={100}
                      loading="lazy"
                      style={{ width: 'auto', height: 'auto' }}
                    />
                  </div>
                  <div className={styles.reviewsContent}>
                    <h3 className={styles.reviewsName}>{review.name}</h3>
                    <p className={styles.reviewsText}>{review.text}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            className={`${styles.reviewsNavBtn} ${styles.reviewsNavBtnPrev}`}
            aria-label="Предыдущий отзыв"
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
          <button
            className={`${styles.reviewsNavBtn} ${styles.reviewsNavBtnNext}`}
            aria-label="Следующий отзыв"
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

export default Reviews;

