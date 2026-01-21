'use client';

import React from 'react';
import styles from './Features.module.scss';

const Features: React.FC = () => {
  const features = [
    'Опытные тренеры с многолетней практикой подготовки спортсменов высокого уровня',
    'Организация турниров и кэмпов любого масштаба по теннису и паделу',
    'Множество локаций для занятий теннисом и паделом с любым уровнем инфраструктуры',
    {
      text: 'Открыты для посетителей с любым уровнем подготовки -',
      text2: 'от новичков до опытных профессионалов',
    },
  ];

  return (
    <section className={styles.features}>
      <div className="container">
        <h2 className={styles.featuresTitle}>Куда пойти? NAKORT!</h2>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featuresCard}>
              <div className={styles.featuresShape} />
              {typeof feature === 'string' ? (
                <p className={styles.featuresText} dangerouslySetInnerHTML={{ __html: feature }} />
              ) : (
                <p className={styles.featuresText}>
                  {feature.text}
                  <br />
                  {feature.text2}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;




