'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Button.module.scss';

interface ButtonProps {
  text: string;
  href?: string;
  className?: string;
  type?: 'link' | 'button';
  variant?: 'primary' | 'secondary' | 'additional-primary' | 'additional-secondary';
  onClick?: (e: React.MouseEvent) => void;
  'data-modal'?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  href = '#',
  className = '',
  type = 'link',
  variant = 'primary',
  onClick,
  'data-modal': dataModal,
}) => {
  // Определяем класс модификатора
  const variantClass = {
    'primary': styles.btnPrimary,
    'secondary': styles.btnSecondary,
    'additional-primary': styles.btnAdditionalPrimary,
    'additional-secondary': styles.btnAdditionalSecondary,
  }[variant] || styles.btnPrimary;

  const combinedClassName = `${styles.btn} ${variantClass} ${className}`.trim();

  const handleClick = (e: React.MouseEvent) => {
    if (dataModal && type === 'button') {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent('openModal', { detail: dataModal }));
    }
    if (onClick) {
      onClick(e);
    }
  };

  if (type === 'button') {
    return (
      <button
        type="button"
        className={combinedClassName}
        onClick={handleClick}
        data-modal={dataModal}
      >
        <span className={styles.btnText}>{text}</span>
      </button>
    );
  }

  if (href.startsWith('http') || href.startsWith('//')) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClassName}
        data-modal={dataModal}
        onClick={handleClick}
      >
        <span className={styles.btnText}>{text}</span>
      </a>
    );
  }

  return (
    <Link href={href} className={combinedClassName} data-modal={dataModal} onClick={handleClick}>
      <span className={styles.btnText}>{text}</span>
    </Link>
  );
};

export default Button;
