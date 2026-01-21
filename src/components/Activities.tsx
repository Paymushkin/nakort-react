'use client';

import React from 'react';
import Image from 'next/image';
import Button from './Button';
import styles from './Activities.module.scss';

const Activities: React.FC = () => {
  const activities = [
    {
      title: 'Теннис',
      buttonText: 'Записаться',
      imagePath: '/img/tiles/tennis.webp',
      href: '#',
      variant: 'primary' as const,
      className: 'activity-card__button',
      typeClass: 'activityCardPrimary',
      modal: 'training',
    },
    {
      title: 'Падел',
      buttonText: 'Записаться',
      imagePath: '/img/tiles/pedals.webp',
      href: '#',
      variant: 'secondary' as const,
      className: 'activity-card__button',
      typeClass: 'activityCardSecondary',
      modal: 'training',
    },
  ];

  return (
    <section className={styles.activities}>
      <div className="container">
        <div className={styles.activitiesContent}>
          {activities.map((activity, index) => (
            <div key={index} className={`${styles.activityCard} ${styles[activity.typeClass]}`}>
              <div className={styles.activityCardContent}>
                <h2 className={styles.activityCardTitle}>{activity.title}</h2>
                <Button
                  text={activity.buttonText}
                  href={activity.href}
                  variant={activity.variant}
                  className={activity.className}
                  type="button"
                  data-modal={activity.modal}
                />
              </div>
              <div className={styles.activityCardImage}>
                <Image
                  src={activity.imagePath}
                  alt={activity.title}
                  fill
                  loading="lazy"
                  quality={85}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Activities;

