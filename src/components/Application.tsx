'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Button from './Button';
import { initScrollToCenterAnimation } from '../utils/scrollAnimation';
import styles from './Application.module.scss';

const Application: React.FC = () => {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const cleanup = initScrollToCenterAnimation(
      imgRef.current,
      'application__img--visible'
    );

    return cleanup;
  }, []);

  const marqueeItems = [
    'Легкая онлайн-запись',
    'Выбор наставника и знакомство с его опытом',
    'Личный кабинет',
    'Мотивационная программа',
    'Новостная лента',
  ];

  return (
    <section className={styles.application}>
      <div className="container">
        <div className={styles.applicationContent}>
          <h2 className={styles.applicationTitle}>Наше приложение</h2>
          <div ref={imgRef} className={styles.applicationImg}>
            <div className={styles.applicationImgLoader}>
              <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-logo-mini">
                <path d="M49.9081 16.3049C50.6393 16.4014 51.2718 18.3054 51.5766 19.5769C51.8815 20.8484 53.2788 26.2252 51.7177 32.178C50.1532 38.1417 47.4334 42.0322 46.3181 42.1222C45.1193 42.2188 44.1613 40.6967 43.6341 39.167C42.2422 35.1301 46.9398 25.7468 48.3154 19.8699C48.7982 17.8064 49.0412 16.191 49.907 16.3049H49.9081Z" fill="currentColor" />
                <path d="M2.53536 36.0696C1.80414 35.973 1.17164 34.069 0.866785 32.7975C0.561929 31.526 -0.835422 26.1493 0.725749 20.1964C2.29017 14.2327 5.01002 10.3423 6.12529 10.2522C7.32411 10.1557 8.28207 11.6778 8.80933 13.2075C10.2013 17.2444 5.50364 26.6277 4.12799 32.5046C3.64521 34.5681 3.40219 36.1835 2.53645 36.0696H2.53536Z" fill="currentColor" />
                <path d="M38.6545 35.1986C39.5929 26.6073 46.6762 16.3876 44.2146 9.1643C43.2978 6.47484 41.4687 3.70618 34.4125 1.31506C28.6083 -0.651864 23.365 -0.126773 19.199 1.03515C15.5233 2.06147 10.2496 4.63376 10.433 6.37503C10.4786 6.81224 10.6218 7.16266 10.8149 7.35903C11.0731 7.62049 38.6545 35.1986 38.6545 35.1986Z" fill="currentColor" />
                <path d="M13.786 17.1588C12.853 25.7501 5.77513 35.9742 8.2411 43.1964C9.15893 45.8848 10.9902 48.6534 18.0486 51.0402C23.8539 53.0028 29.0972 52.4766 33.2632 51.3114C36.9389 50.2829 42.2104 47.7074 42.0259 45.9661C41.9793 45.53 41.8372 45.1785 41.6441 44.9821C41.3859 44.7207 13.7882 17.1588 13.7882 17.1588H13.786Z" fill="currentColor" />
              </svg>
            </div>
            <Image
              src="/img/app/phone.webp"
              alt="Application"
              width={350}
              height={700}
              loading="lazy"
              quality={85}
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>
          <Button
            text="Скачать"
            href="https://apps.apple.com/ru/app/nakort-tennis-club/id6742146880"
            variant="primary"
            className={`${styles.applicationButton} application__button`}
          />
        </div>
        <div className={styles.applicationMarquee}>
          <div className={styles.applicationMarqueeTrack}>
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <div key={index} className={styles.applicationMarqueeItem}>
                <span>{item}</span>
                <svg width="27" height="40" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 0L12.245 7.755L20 10L12.245 12.245L10 20L7.755 12.245L0 10L7.755 7.755L10 0Z" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Application;

