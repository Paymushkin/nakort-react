'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Logo from './Logo';
import Button from './Button';
import { initScrollToCenterAnimation } from '../utils/scrollAnimation';
import styles from './HighlightStrip.module.scss';

const HighlightStrip: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cleanup = initScrollToCenterAnimation(
      sectionRef.current,
      'highlight-strip--visible'
    );

    return cleanup;
  }, []);

  return (
    <section ref={sectionRef} className={styles.highlightStrip}>
      <div className={`container ${styles.highlightStripContainer}`}>
        <Image
          src="/img/general/shape-2.webp"
          alt="Shape"
          width={702}
          height={752}
          loading="lazy"
          className={styles.highlightStripShape}
          style={{ width: 'auto', height: 'auto' }}
        />
        <div className={styles.highlightStripInner}>
          <div className={styles.highlightStripBrand}>
            <Logo />
          </div>
          <p className={styles.highlightStripText}>
            Новости тенниса, лайф клуба, специальные предложения в нашем ТГ-канале
          </p>
          <div className={styles.highlightStripDots}>
            <span className={styles.highlightStripDot} />
            <span className={styles.highlightStripDot} />
            <span className={styles.highlightStripDot} />
          </div>
          <div className={styles.highlightStripAction}>
            <Button
              text="Узнать больше"
              href="https://t.me/nakort_club"
              variant="primary"
              className="highlight-strip__button"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightStrip;

