'use client';

import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const navItems = [
    { href: '/about', label: 'О нас' },
    { href: '/tennis', label: 'Теннис' },
    { href: '/padel', label: 'Падел' },
    { href: '/corporate', label: 'Сотрудничество' },
    { href: '/events', label: 'Мероприятия' },
    { href: '/journal', label: 'Журнал' },
    { href: '/contacts', label: 'Контакты' },
  ];

  return (
    <header className={styles.header} itemScope itemType="https://schema.org/WPHeader">
      <div className="container">
        <nav
          className={styles.nav}
          itemScope
          itemType="https://schema.org/SiteNavigationElement"
          role="navigation"
          aria-label="Основная навигация"
        >
          <div className={styles.navLogo} itemScope itemType="https://schema.org/Organization">
            <Link href="/" className={styles.logoLink} aria-label="Главная страница" itemProp="url">
              <span itemProp="logo">
                <Logo />
              </span>
            </Link>
          </div>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.href} className={styles.navItem}>
                <Link
                  href={item.href}
                  className={styles.navLink}
                  aria-label={`Перейти на страницу ${item.label}`}
                  itemProp="url"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

