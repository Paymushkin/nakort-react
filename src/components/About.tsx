'use client';

import React from 'react';
import Link from 'next/link';
import Button from './Button';
import styles from './About.module.scss';

const About: React.FC = () => {
  const stats = [
    { title: '350 +', text: 'активных игроков' },
    { title: '2000', text: 'участников в чатах Telegram' },
    { title: '12 +', text: 'локаций для занятий и мероприятий' },
    { title: '4', text: 'корпоративных клуба' },
    { title: '8', text: 'тренеров в штате' },
    { title: '12', text: 'турниров проведено' },
  ];

  return (
    <section className={styles.about} id="about">
      <div className="container">
        <div className={styles.aboutContent}>
          <div className={styles.aboutLeft}>
            <h2 className={styles.aboutTitle} itemProp="name">
              О нас
            </h2>
            <p className={styles.aboutText} itemProp="description">
              NAKORT — комьюнити людей, увлеченных большим теннисом и яркой жизнью. Мы создали
              пространство, где каждый находит своё: от интенсивных тренировок под руководством
              профессионалов до дружеских матчей и незабываемых моментов теплого общения за пределами
              корта.
            </p>
            <Button text="Узнать больше" href="/about" variant="primary" className="about__left-btn" />
          </div>
          <div className={styles.aboutRight}>
            <ul className={styles.aboutGrid}>
              {stats.map((stat, index) => (
                <li key={index} className={styles.aboutGridItem}>
                  <h3 className={styles.aboutGridTitle} itemProp="name">
                    {stat.title}
                  </h3>
                  <span className={styles.aboutGridText} itemProp="description">
                    {stat.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

