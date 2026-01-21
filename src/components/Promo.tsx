'use client';

import React from 'react';
import styles from './Promo.module.scss';

const Promo: React.FC = () => {
  return (
    <section className={styles.promo} itemScope itemType="https://schema.org/AboutPage">
      <div className="container">
        <div className={styles.promoContent}>
          <h2 className={styles.promoTitle} itemProp="name">
            NAKORT
          </h2>
          <div className={styles.promoText} itemProp="description">
            <p className={styles.promoTextLine}>
              — это энергия, драйв и настоящие эмоции!
              <br />
              Приготовьтесь к тому, что ваша жизнь заиграет новыми красками.
              <br />
              Не откладывайте свои победы на завтра - воспользуйтесь нашими выгодными предложениями!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promo;




