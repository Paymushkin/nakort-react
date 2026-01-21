'use client';

import React, { useState, useEffect } from 'react';
import styles from './DesktopOnly.module.scss';

const DesktopOnly: React.FC = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      if (window.innerWidth < 1280) {
        setShowOverlay(true);
      } else {
        setShowOverlay(false);
      }
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);

    return () => {
      window.removeEventListener('resize', checkViewport);
    };
  }, []);

  if (!showOverlay) return null;

  return (
    <div className={styles.desktopOnlyOverlay}>
      <div className={styles.desktopOnlyOverlayContent}>
        <div className={styles.desktopOnlyOverlayIcon}>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M48 8H16C13.7909 8 12 9.79086 12 12V40C12 42.2091 13.7909 44 16 44H48C50.2091 44 52 42.2091 52 40V12C52 9.79086 50.2091 8 48 8Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M28 44V52H36V44"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M32 52V56"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 56H44"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className={styles.desktopOnlyOverlayTitle}>Доступна только десктопная версия</h2>
        <p className={styles.desktopOnlyOverlayText}>
          Пожалуйста, откройте сайт на компьютере или планшете с разрешением экрана не менее 1280px
        </p>
      </div>
    </div>
  );
};

export default DesktopOnly;




