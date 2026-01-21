'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Button from './Button';
import { initScrollToCenterAnimation } from '../utils/scrollAnimation';
import styles from './Certificates.module.scss';

const Certificates: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tennis' | 'padel'>('tennis');
  const tennisNavRef = useRef<HTMLDivElement>(null);
  const padelNavRef = useRef<HTMLDivElement>(null);
  const tennisGiftImageRef = useRef<HTMLDivElement>(null);
  const padelGiftImageRef = useRef<HTMLDivElement>(null);
  const tennisSwiperRef = useRef<any>(null);
  const padelSwiperRef = useRef<any>(null);
  const tennisNextBtnRef = useRef<HTMLButtonElement>(null);
  const tennisPrevBtnRef = useRef<HTMLButtonElement>(null);
  const padelNextBtnRef = useRef<HTMLButtonElement>(null);
  const padelPrevBtnRef = useRef<HTMLButtonElement>(null);

  const tennisCertificates = [
    { title: 'Персональные', subtitle: '1 человек', tags: ['закрытый корт', 'весь инвентарь'], price: '7 500 ₽' },
    { title: 'Сплит', subtitle: '1 человек', tags: ['закрытый корт', 'весь инвентарь'], price: '8 500 ₽' },
    { title: 'Персональные', subtitle: '1 человек', tags: ['закрытый корт', 'весь инвентарь'], price: '9 500 ₽' },
    { title: 'Сплит', subtitle: '1 человек', tags: ['закрытый корт', 'весь инвентарь'], price: '10 500 ₽' },
  ];

  const padelCertificates = [
    { title: 'Персональные', subtitle: '1 человек', tags: ['закрытый корт', 'весь инвентарь'], price: '7 500 ₽' },
    { title: 'Сплит', subtitle: '1 человек', tags: ['закрытый корт', 'весь инвентарь'], price: '8 500 ₽' },
    { title: 'Персональные', subtitle: '1 человек', tags: ['закрытый корт', 'весь инвентарь'], price: '9 500 ₽' },
    { title: 'Сплит', subtitle: '1 человек', tags: ['закрытый корт', 'весь инвентарь'], price: '10 500 ₽' },
  ];

  useEffect(() => {
    if (tennisNavRef.current) {
      tennisNavRef.current.classList.toggle(styles.certificatesNavActive, activeTab === 'tennis');
    }
    if (padelNavRef.current) {
      padelNavRef.current.classList.toggle(styles.certificatesNavActive, activeTab === 'padel');
    }
  }, [activeTab]);


  useEffect(() => {
    const cleanups: (() => void)[] = [];

    if (tennisGiftImageRef.current) {
      const cleanup = initScrollToCenterAnimation(
        tennisGiftImageRef.current,
        'certificate-gift__image--active',
        { once: true }
      );
      cleanups.push(cleanup);
    }

    if (padelGiftImageRef.current) {
      const cleanup = initScrollToCenterAnimation(
        padelGiftImageRef.current,
        'certificate-gift__image--active',
        { once: true }
      );
      cleanups.push(cleanup);
    }

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <section className={styles.certificates} id="certificates">
      <div className={`${styles.certificatesContainer} container`}>
        <div className={styles.certificatesHeader}>
          <h2 className={styles.certificatesTitle}>Сертификаты</h2>
          <div className={styles.certificatesTabs}>
            <button
              className={`${styles.certificatesTab} ${activeTab === 'tennis' ? styles.certificatesTabActive : ''}`}
              onClick={() => setActiveTab('tennis')}
              data-tab="tennis"
            >
              Теннис
            </button>
            <button
              className={`${styles.certificatesTab} ${activeTab === 'padel' ? styles.certificatesTabActive : ''}`}
              onClick={() => setActiveTab('padel')}
              data-tab="padel"
            >
              Падел
            </button>
          </div>
        </div>

        <div className={styles.certificatesContent}>
          <div className={`${styles.certificatesPanel} ${activeTab === 'tennis' ? styles.certificatesPanelActive : ''}`} data-panel="tennis">
            <div className={styles.certificatesWrapper}>
              <Swiper
                ref={tennisSwiperRef}
                className={styles.certificatesCarousel}
                modules={[Navigation]}
                slidesPerView={1}
                spaceBetween={20}
                navigation={{
                  nextEl: `.certificates__nav--tennis .certificates__nav-btn--next`,
                  prevEl: `.certificates__nav--tennis .certificates__nav-btn--prev`,
                }}
                onSwiper={(swiper) => {
                  tennisSwiperRef.current = swiper;
                }}
                breakpoints={{
                  992: {
                    slidesPerView: 2.5,
                    spaceBetween: 20,
                  },
                }}
              >
                {tennisCertificates.map((cert, index) => (
                  <SwiperSlide key={index} className={styles.certificatesSlide}>
                    <div className={styles.certificatesCard}>
                      <div className={styles.certificateCardBack}>
                        <h3 className={styles.certificateCardTitle}>{cert.title}</h3>
                        <span className={styles.certificateCardSubtitle}>{cert.subtitle}</span>
                      </div>
                      <div className={styles.certificateCardFront}>
                        <div className={styles.certificateCardTags}>
                          {cert.tags.map((tag, tagIndex) => (
                            <div key={tagIndex} className={styles.certificateCardTag}>
                              <span>{tag}</span>
                              {tag === 'закрытый корт' && (
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M10 2L12 6L16 7L12 8L10 12L8 8L4 7L8 6L10 2Z" />
                                </svg>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className={styles.certificateCardBottom}>
                          <div className={styles.certificateCardPrice}>{cert.price}</div>
                          <Button
                            text="Купить"
                            href="#"
                            variant="primary"
                            className="certificate-card__button"
                            type="button"
                            data-modal="certificate"
                          />
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className={styles.certificateGift}>
              <div className={styles.certificateGiftContent}>
                <h3 className={styles.certificateGiftTitle}>Купить карту любого номинала в подарок</h3>
                <div className={styles.certificateGiftTags}>
                  <div className={styles.certificateGiftTag}>
                    <span>закрытый корт</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 2L12 6L16 7L12 8L10 12L8 8L4 7L8 6L10 2Z" />
                    </svg>
                  </div>
                  <div className={styles.certificateGiftTag}>
                    <span>открытый корт</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <circle cx="10" cy="10" r="5" />
                    </svg>
                  </div>
                  <div className={styles.certificateGiftTag}>
                    <span>весь инвентарь</span>
                  </div>
                </div>
                <p className={styles.certificateGiftText}>
                  тут нужен небольшой текст про то,
                  <br />
                  какой это классный сертификат и что можно выбрать
                </p>
                <Button
                  text="Оформить"
                  href="https://t.me/nakort_club"
                  variant="additional-primary"
                  className="certificate-gift__button"
                />
              </div>
              <div ref={tennisGiftImageRef} className={styles.certificateGiftImage} data-scroll-position="center">
                <Image
                  src="/img/cert/shape-1.webp"
                  alt="Купить карту любого номинала в подарок"
                  width={377}
                  height={377}
                  loading="lazy"
                  style={{ width: 'auto', height: 'auto' }}
                />
              </div>
            </div>
          </div>

          <div className={`${styles.certificatesNav} ${styles.certificatesNavTennis} certificates__nav certificates__nav--tennis`} ref={tennisNavRef}>
            <button
              ref={tennisPrevBtnRef}
              className={`${styles.certificatesNavBtn} ${styles.certificatesNavBtnPrev} certificates__nav-btn certificates__nav-btn--prev`}
              aria-label="Предыдущий сертификат"
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
              ref={tennisNextBtnRef}
              className={`${styles.certificatesNavBtn} ${styles.certificatesNavBtnNext} certificates__nav-btn certificates__nav-btn--next`}
              aria-label="Следующий сертификат"
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

          <div className={`${styles.certificatesPanel} ${activeTab === 'padel' ? styles.certificatesPanelActive : ''}`} data-panel="padel">
            <div className={styles.certificatesWrapper}>
              <Swiper
                ref={padelSwiperRef}
                className={styles.certificatesCarousel}
                modules={[Navigation]}
                slidesPerView={1}
                spaceBetween={20}
                navigation={{
                  nextEl: `.certificates__nav--padel .certificates__nav-btn--next`,
                  prevEl: `.certificates__nav--padel .certificates__nav-btn--prev`,
                }}
                onSwiper={(swiper) => {
                  padelSwiperRef.current = swiper;
                }}
                breakpoints={{
                  992: {
                    slidesPerView: 2.5,
                    spaceBetween: 20,
                  },
                }}
              >
                {padelCertificates.map((cert, index) => (
                  <SwiperSlide key={index} className={styles.certificatesSlide}>
                    <div className={styles.certificatesCard}>
                      <div className={`${styles.certificateCardBack} ${styles.certificateCardBackPadel}`}>
                        <h3 className={styles.certificateCardTitle}>{cert.title}</h3>
                        <span className={styles.certificateCardSubtitle}>{cert.subtitle}</span>
                      </div>
                      <div className={styles.certificateCardFront}>
                        <div className={styles.certificateCardTags}>
                          {cert.tags.map((tag, tagIndex) => (
                            <div key={tagIndex} className={styles.certificateCardTag}>
                              <span>{tag}</span>
                              {tag === 'закрытый корт' && (
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M10 2L12 6L16 7L12 8L10 12L8 8L4 7L8 6L10 2Z" />
                                </svg>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className={styles.certificateCardBottom}>
                          <div className={styles.certificateCardPrice}>{cert.price}</div>
                          <Button
                            text="Купить"
                            href="#"
                            variant="secondary"
                            className="certificate-card__button"
                            type="button"
                            data-modal="certificate"
                          />
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className={styles.certificateGift}>
              <div className={styles.certificateGiftContent}>
                <h3 className={styles.certificateGiftTitle}>Купить карту любого номинала в подарок</h3>
                <div className={styles.certificateGiftTags}>
                  <div className={styles.certificateGiftTag}>
                    <span>закрытый корт</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 2L12 6L16 7L12 8L10 12L8 8L4 7L8 6L10 2Z" />
                    </svg>
                  </div>
                  <div className={styles.certificateGiftTag}>
                    <span>открытый корт</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <circle cx="10" cy="10" r="5" />
                    </svg>
                  </div>
                  <div className={styles.certificateGiftTag}>
                    <span>весь инвентарь</span>
                  </div>
                </div>
                <p className={styles.certificateGiftText}>
                  тут нужен небольшой текст про то,
                  <br />
                  какой это классный сертификат и что можно выбрать
                </p>
                <Button
                  text="Оформить"
                  href="https://t.me/nakort_club"
                  variant="additional-secondary"
                  className="certificate-gift__button"
                />
              </div>
              <div ref={padelGiftImageRef} className={styles.certificateGiftImage} data-scroll-position="center">
                <Image
                  src="/img/cert/shape-2.webp"
                  alt="Купить карту любого номинала в подарок"
                  width={377}
                  height={377}
                  loading="lazy"
                  style={{ width: 'auto', height: 'auto' }}
                />
              </div>
            </div>
          </div>

          <div className={`${styles.certificatesNav} ${styles.certificatesNavPadel} certificates__nav certificates__nav--padel`} ref={padelNavRef}>
            <button
              ref={padelPrevBtnRef}
              className={`${styles.certificatesNavBtn} ${styles.certificatesNavBtnPrev} certificates__nav-btn certificates__nav-btn--prev`}
              aria-label="Предыдущий сертификат"
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
              ref={padelNextBtnRef}
              className={`${styles.certificatesNavBtn} ${styles.certificatesNavBtnNext} certificates__nav-btn certificates__nav-btn--next`}
              aria-label="Следующий сертификат"
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
      </div>
    </section>
  );
};

export default Certificates;

