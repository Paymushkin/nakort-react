'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Button from './Button';
import { initScrollToCenterAnimation } from '../utils/scrollAnimation';
import styles from './Pricing.module.scss';

const Pricing: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tennis' | 'padel'>('tennis');

  const tennisPrices = [
    {
      title: 'Групповые',
      subtitle: '2 человека',
      items: [
        { price: 'от 3 650 ₽/час', label: 'Разовое занятие' },
        { price: 'от 13 800 ₽/', label: 'от 4х занятий в месяц' },
      ],
      note: 'корт входит в стоимость, предоплата 100%',
      promo: 'от 2 900 ₽/ час',
      shape: '1',
    },
    {
      title: 'Персональные',
      subtitle: '2 человека',
      items: [
        { price: '4 000 ₽/час', label: 'Разовое занятие' },
        { price: '36 500 ₽', label: '10 занятий', discount: '-10%' },
      ],
      note: 'корт оплачивается отдельно, предоплата 100%',
      shape: '2',
      addShape: '2-1',
    },
    {
      title: 'Сплит',
      subtitle: '2 человека',
      items: [
        { price: '5 000 ₽/час', label: 'Разовое занятие' },
        { price: '45 000 ₽', label: '10 занятий', discount: '-10%' },
      ],
      note: 'корт оплачивается отдельно, предоплата 100%',
      shape: '3',
      addShape: '3-1',
    },
  ];

  const padelPrices = [
    {
      title: 'Групповые',
      subtitle: '2 человека',
      items: [
        { price: 'от 3 650 ₽/час', label: 'Разовое занятие' },
        { price: 'от 13 800 ₽/', label: 'от 4х занятий в месяц' },
      ],
      note: 'корт входит в стоимость, предоплата 100%',
      promo: 'от 2 900 ₽/ час',
      shape: '4',
    },
    {
      title: 'Персональные',
      subtitle: '2 человека',
      items: [
        { price: '4 000 ₽/час', label: 'Разовое занятие' },
        { price: '36 500 ₽', label: '10 занятий', discount: '-10%' },
      ],
      note: 'корт оплачивается отдельно, предоплата 100%',
      shape: '5',
      addShape: '5-1',
    },
    {
      title: 'Сплит',
      subtitle: '2 человека',
      items: [
        { price: '5 000 ₽/час', label: 'Разовое занятие' },
        { price: '45 000 ₽', label: '10 занятий', discount: '-10%' },
      ],
      note: 'корт оплачивается отдельно, предоплата 100%',
      shape: '6',
    },
  ];

  const prices = activeTab === 'tennis' ? tennisPrices : padelPrices;
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cleanupFunctions = useRef<(() => void)[]>([]);

  useEffect(() => {
    // Очищаем предыдущие анимации
    cleanupFunctions.current.forEach((cleanup) => cleanup());
    cleanupFunctions.current = [];

    // Инициализируем анимации для всех карточек pricing
    cardRefs.current.forEach((cardRef) => {
      if (cardRef) {
        const cleanup = initScrollToCenterAnimation(cardRef, 'card-pricing--active');
        cleanupFunctions.current.push(cleanup);
      }
    });

    return () => {
      // Cleanup будет выполнен автоматически при размонтировании
      cleanupFunctions.current.forEach((cleanup) => cleanup());
      cleanupFunctions.current = [];
    };
  }, [activeTab]);

  return (
    <section className={styles.pricing} id="pricing">
      <div className="container">
        <h2 className={styles.pricingTitle}>Цены</h2>
        <div className={styles.pricingTabs}>
          <button
            className={`${styles.pricingTab} ${activeTab === 'tennis' ? styles.pricingTabActive : ''}`}
            onClick={() => setActiveTab('tennis')}
            data-tab="tennis"
          >
            Теннис
          </button>
          <button
            className={`${styles.pricingTab} ${activeTab === 'padel' ? styles.pricingTabActive : ''}`}
            onClick={() => setActiveTab('padel')}
            data-tab="padel"
          >
            Падел
          </button>
        </div>

        <div className={styles.pricingContent}>
          <div className={`${styles.pricingPanel} ${activeTab === 'tennis' ? styles.pricingPanelActive : ''}`} data-panel="tennis">
            <div className={styles.pricingGrid}>
              {tennisPrices.map((priceCard, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className={styles.pricingCard}
                  data-scroll-position="bottom"
                >
                  <div className={styles.cardPricingBack}>
                    <h3 className={styles.cardPricingTitle}>{priceCard.title}</h3>
                    <span className={styles.cardPricingSubtitle}>{priceCard.subtitle}</span>
                  </div>
                  <div className={styles.cardPricingFront}>
                    {priceCard.promo && (
                      <div className={styles.cardPricingPromo}>
                        <span className={styles.cardPricingPromoValue}>{priceCard.promo}</span>
                        <span className={styles.cardPricingPromoLabel}>Пробное занятие</span>
                      </div>
                    )}
                    <div className={styles.cardPricingShapeContainer}>
                      <Image
                        src={`/img/plan/ellipse-${priceCard.shape}.svg`}
                        alt=""
                        width={200}
                        height={200}
                        className={`${styles.cardPricingShape} ${styles[`cardPricingShape${priceCard.shape}`]}`}
                        style={{ width: 'auto', height: 'auto' }}
                      />
                      {priceCard.addShape && (
                        <Image
                          src={`/img/plan/ellipse-${priceCard.addShape}.svg`}
                          alt=""
                          width={200}
                          height={200}
                          className={`${styles.cardPricingShape} ${styles[`cardPricingShape${priceCard.addShape}`]}`}
                          style={{ width: 'auto', height: 'auto' }}
                        />
                      )}
                    </div>
                    <div className={styles.cardPricingContent}>
                      <div className={styles.singlePrice}>
                        <div className={styles.singlePriceValue}>{priceCard.items[0].price}</div>
                        <div className={styles.singlePriceDescription}>{priceCard.items[0].label}</div>
                      </div>
                      <div className={styles.multiplePrice}>
                        <div className={styles.multiplePriceValue}>{priceCard.items[1].price}</div>
                        <div className={styles.multiplePriceDescription}>{priceCard.items[1].label}</div>
                        {((): React.ReactNode => {
                          const item = priceCard.items[1] as { price: string; label: string; discount?: string } | undefined;
                          return item?.discount ? <div className={styles.multiplePriceDiscount}>{item.discount}</div> : null;
                        })()}
                      </div>
                      <Button
                        text="Оставить заявку"
                        href="#"
                        variant="primary"
                        className="pricing__button"
                        type="button"
                        data-modal="training"
                      />
                      <p className={styles.pricingNote}>{priceCard.note}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.pricingPanel} ${activeTab === 'padel' ? styles.pricingPanelActive : ''}`} data-panel="padel">
            <div className={styles.pricingGrid}>
              {padelPrices.map((priceCard, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    cardRefs.current[tennisPrices.length + index] = el;
                  }}
                  className={styles.pricingCard}
                  data-scroll-position="bottom"
                >
                  <div className={`${styles.cardPricingBack} ${styles.cardPricingBackPadel}`}>
                    <h3 className={styles.cardPricingTitle}>{priceCard.title}</h3>
                    <span className={styles.cardPricingSubtitle}>{priceCard.subtitle}</span>
                  </div>
                  <div className={styles.cardPricingFront}>
                    {priceCard.promo && (
                      <div className={`${styles.cardPricingPromo} ${styles.cardPricingPromoPadel}`}>
                        <span className={styles.cardPricingPromoValue}>{priceCard.promo}</span>
                        <span className={styles.cardPricingPromoLabel}>Пробное занятие</span>
                      </div>
                    )}
                    <div className={styles.cardPricingShapeContainer}>
                      {priceCard.addShape && (
                        <Image
                          src={`/img/plan/ellipse-${priceCard.addShape}.svg`}
                          alt=""
                          width={200}
                          height={200}
                          className={`${styles.cardPricingShape} ${styles[`cardPricingShape${priceCard.addShape}`]}`}
                          style={{ width: 'auto', height: 'auto' }}
                        />
                      )}
                      <Image
                        src={`/img/plan/ellipse-${priceCard.shape}.svg`}
                        alt=""
                        width={200}
                        height={200}
                        className={`${styles.cardPricingShape} ${styles[`cardPricingShape${priceCard.shape}`]}`}
                        style={{ width: 'auto', height: 'auto' }}
                      />
                    </div>
                    <div className={styles.cardPricingContent}>
                      <div className={styles.singlePrice}>
                        <div className={styles.singlePriceValue}>{priceCard.items[0].price}</div>
                        <div className={styles.singlePriceDescription}>{priceCard.items[0].label}</div>
                      </div>
                      <div className={styles.multiplePrice}>
                        <div className={styles.multiplePriceValue}>{priceCard.items[1].price}</div>
                        <div className={styles.multiplePriceDescription}>{priceCard.items[1].label}</div>
                        {((): React.ReactNode => {
                          const item = priceCard.items[1] as { price: string; label: string; discount?: string } | undefined;
                          return item?.discount ? <div className={`${styles.multiplePriceDiscount} ${styles.multiplePriceDiscountPadel}`}>{item.discount}</div> : null;
                        })()}
                      </div>
                      <Button
                        text="Оставить заявку"
                        href="#"
                        variant="secondary"
                        className="pricing__button"
                        type="button"
                        data-modal="training"
                      />
                      <p className={styles.pricingNote}>{priceCard.note}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

