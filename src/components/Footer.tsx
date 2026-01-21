'use client';

import React from 'react';
import Link from 'next/link';
import Button from './Button';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer} id="footer">
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerTop}>
            <nav className={styles.footerTopNav}>
              <ul className={styles.footerTopNavList}>
                <li className={styles.footerTopNavItem}>
                  <Link href="#about" className={styles.footerTopNavLink} aria-label="Перейти к разделу О нас">
                    О нас
                  </Link>
                </li>
                <li className={styles.footerTopNavItem}>
                  <Link href="#pricing" className={styles.footerTopNavLink} aria-label="Перейти к разделу Цены">
                    Цены
                  </Link>
                </li>
                <li className={styles.footerTopNavItem}>
                  <Link href="#certificates" className={styles.footerTopNavLink} aria-label="Перейти к разделу Сертификаты">
                    Сертификаты
                  </Link>
                </li>
                <li className={styles.footerTopNavItem}>
                  <Link href="#" className={styles.footerTopNavLink} aria-label="Корпоративный теннис">
                    Корпоративный теннис
                  </Link>
                </li>
                <li className={styles.footerTopNavItem}>
                  <Link href="#" className={styles.footerTopNavLink} aria-label="Правила оплаты">
                    Правила оплаты
                  </Link>
                </li>
              </ul>
            </nav>

            <div className={styles.footerTopContacts}>
              <h3 className={styles.footerTopContactsTitle}>Контакты</h3>
              <ul className={styles.footerTopContactsList}>
                <li className={styles.footerTopContactsItem}>
                  <a href="tel:+79891120027" className={styles.footerTopContactsLink}>
                    + 7 (989) 112-00-27
                  </a>
                </li>
                <li className={styles.footerTopContactsItem}>
                  <a href="mailto:corp@nakort.ru" className={styles.footerTopContactsLink}>
                    corp@nakort.ru
                  </a>
                </li>
                <li className={styles.footerTopContactsItem}>
                  <a href="mailto:tennis@nakort.ru" className={styles.footerTopContactsLink}>
                    tennis@nakort.ru
                  </a>
                </li>
              </ul>
              <div className={styles.footerTopContactsSocial}>
                <ul className={styles.footerTopContactsSocialList}>
                  <li className={styles.footerTopContactsSocialItem}>
                    <a
                      href="https://t.me/nakort_club"
                      className={styles.footerTopContactsSocialLink}
                      aria-label="Наш Telegram канал"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-telegram">
                        <path d="M2.57521 18.7819C2.57521 18.7819 21.1527 11.1577 27.5957 8.47301C30.0656 7.39923 38.4415 3.96284 38.4415 3.96284C38.4415 3.96284 42.3074 2.45955 41.9852 6.11055C41.8778 7.61399 41.0187 12.8757 40.1597 18.5671C38.871 26.621 37.475 35.4264 37.475 35.4264C37.475 35.4264 37.2603 37.8963 35.4348 38.3259C33.6093 38.7554 30.6024 36.8226 30.0656 36.3929C29.6359 36.0708 22.0117 31.2385 19.2198 28.876C18.468 28.2317 17.609 26.9432 19.3271 25.4398C23.193 21.8961 27.8104 17.4934 30.6024 14.7014C31.8911 13.4127 33.1796 10.406 27.8104 14.057C20.1862 19.3188 12.6693 24.2585 12.6693 24.2585C12.6693 24.2585 10.9511 25.3323 7.72965 24.3658C4.50801 23.3995 0.749564 22.1108 0.749564 22.1108C0.749564 22.1108 -1.82751 20.5001 2.57521 18.7819Z" fill="currentColor" />
                      </svg>
                    </a>
                  </li>
                  <li className={styles.footerTopContactsSocialItem}>
                    <a
                      href="https://wa.me/79891120027"
                      className={styles.footerTopContactsSocialLink}
                      aria-label="Написать в WhatsApp"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-whatsapp">
                        <g clipPath="url(#clip0_284_1654)">
                          <path d="M31.0801 24.134C30.9983 24.0947 27.9363 22.587 27.3923 22.3911C27.1701 22.3114 26.9322 22.2335 26.6791 22.2335C26.2656 22.2335 25.9183 22.4396 25.6478 22.8443C25.3419 23.2989 24.416 24.3812 24.1299 24.7046C24.0925 24.7472 24.0415 24.7982 24.011 24.7982C23.9836 24.7982 23.5097 24.6031 23.3663 24.5408C20.0817 23.114 17.5885 19.683 17.2467 19.1044C17.1979 19.0212 17.1958 18.9834 17.1954 18.9834C17.2074 18.9394 17.3179 18.8286 17.3749 18.7715C17.5416 18.6065 17.7223 18.389 17.8971 18.1786C17.9799 18.0789 18.0628 17.9791 18.1442 17.885C18.3979 17.5899 18.5108 17.3608 18.6417 17.0955L18.7103 16.9576C19.0299 16.3226 18.7569 15.7866 18.6687 15.6136C18.5963 15.4688 17.3034 12.3485 17.1659 12.0207C16.8354 11.2296 16.3986 10.8613 15.7917 10.8613C15.7354 10.8613 15.7917 10.8613 15.5555 10.8713C15.2679 10.8834 13.7018 11.0896 13.0093 11.5261C12.275 11.9891 11.0327 13.4648 11.0327 16.0601C11.0327 18.3958 12.515 20.6012 13.1514 21.44C13.1672 21.4611 13.1963 21.5041 13.2384 21.5657C15.6756 25.1251 18.7139 27.7629 21.794 28.9933C24.7592 30.1778 26.1633 30.3147 26.9616 30.3147H26.9618C27.2972 30.3147 27.5657 30.2884 27.8026 30.2651L27.9528 30.2507C28.9772 30.1599 31.2283 28.9935 31.7404 27.5705C32.1437 26.4497 32.2501 25.2252 31.9817 24.7808C31.7979 24.4786 31.4811 24.3266 31.0801 24.134Z" fill="currentColor" />
                          <path d="M21.3757 0C10.0008 0 0.746625 9.18464 0.746625 20.474C0.746625 24.1255 1.72381 27.6997 3.57494 30.8279L0.0318071 41.2795C-0.0341929 41.4743 0.014898 41.6898 0.159034 41.8365C0.26308 41.9427 0.404216 42 0.548353 42C0.60358 42 0.659216 41.9917 0.713489 41.9744L11.6117 38.5113C14.5939 40.1047 17.9646 40.9458 21.3759 40.9458C32.7497 40.9459 42.0029 31.7622 42.0029 20.474C42.0029 9.18464 32.7497 0 21.3757 0ZM21.3757 36.681C18.1659 36.681 15.0569 35.7541 12.3844 34.0005C12.2946 33.9415 12.1903 33.9112 12.0853 33.9112C12.0298 33.9112 11.9741 33.9196 11.92 33.9368L6.46067 35.6722L8.22303 30.4728C8.28003 30.3045 8.25153 30.1189 8.14653 29.9755C6.11144 27.1947 5.03567 23.9093 5.03567 20.474C5.03567 11.5364 12.3658 4.26491 21.3756 4.26491C30.3843 4.26491 37.7136 11.5364 37.7136 20.474C37.7137 29.4106 30.3846 36.681 21.3757 36.681Z" fill="currentColor" />
                        </g>
                        <defs>
                          <clipPath id="clip0_284_1654">
                            <rect width="42" height="42" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.footerTopDisclaimer}>
              <span className={styles.footerTopDisclaimerText}>* Personal – персональный</span>
              <span className={styles.footerTopDisclaimerText}>Split – разделение</span>
              <span className={styles.footerTopDisclaimerText}>Group – групповой</span>
            </div>

            <div className={styles.footerTopOffer}>
              <Button
                text="Наше приложение"
                href="https://apps.apple.com/ru/app/nakort-tennis-club/id6742146880"
                variant="primary"
              />
            </div>
          </div>

          <div className={styles.footerBottom}>
            <nav className={styles.footerBottomNav}>
              <ul className={styles.footerBottomList}>
                <li className={styles.footerBottomItem}>
                  <Link href="#" className={styles.footerBottomLink}>
                    Правила клуба
                  </Link>
                </li>
                <li className={styles.footerBottomItem}>
                  <Link href="#" className={styles.footerBottomLink}>
                    Публичная оферта
                  </Link>
                </li>
                <li className={styles.footerBottomItem}>
                  <Link href="#" className={styles.footerBottomLink}>
                    Политика конфиденциальности
                  </Link>
                </li>
                <li className={styles.footerBottomItem}>
                  <Link href="#" className={styles.footerBottomLink}>
                    Реквизиты
                  </Link>
                </li>
                <li className={styles.footerBottomItem}>
                  <Link href="#" className={styles.footerBottomLink}>
                    Политика по обработке персональных данных
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

