'use client';

import React, { useEffect, useState, useRef } from 'react';
import Button from './Button';
import styles from './Modal.module.scss';

const ModalTraining: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = (e: CustomEvent) => {
      if (e.detail === 'training') {
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
      }
    };

    const handleClose = () => {
      setIsOpen(false);
      document.body.style.overflow = '';
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    window.addEventListener('openModal' as any, handleOpen as EventListener);
    window.addEventListener('closeModal' as any, handleClose as EventListener);
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('openModal' as any, handleOpen as EventListener);
      window.removeEventListener('closeModal' as any, handleClose as EventListener);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь можно добавить отправку данных на сервер
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
    if (formRef.current) {
      formRef.current.reset();
    }
    window.dispatchEvent(new CustomEvent('closeModal', { detail: 'training' }));
  };

  if (!isOpen) return null;

  return (
    <div className={`${styles.modal} ${isOpen ? styles.modalActive : ''}`} data-popup="training">
      <div className={styles.modalOverlay} onClick={handleClose} />
      <div className={styles.modalContent}>
        <button className={styles.modalClose} onClick={handleClose} aria-label="Закрыть">
          <svg viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-close">
            <path d="M23 25.6834L17.4094 31.2897C17.0559 31.6411 16.6061 31.8168 16.0599 31.8168C15.5137 31.8168 15.0638 31.6411 14.7104 31.2897C14.359 30.9383 14.1833 30.4911 14.1833 29.948C14.1833 29.405 14.359 28.9577 14.7104 28.6064L20.3167 23.0001L14.7104 17.4575C14.359 17.104 14.1833 16.6542 14.1833 16.108C14.1833 15.5617 14.359 15.1119 14.7104 14.7584C15.0618 14.407 15.509 14.2314 16.0521 14.2314C16.5951 14.2314 17.0423 14.407 17.3937 14.7584L23 20.3647L28.5426 14.7584C28.8961 14.407 29.3459 14.2314 29.8921 14.2314C30.4384 14.2314 30.8882 14.407 31.2417 14.7584C31.625 15.1418 31.8167 15.597 31.8167 16.1241C31.8167 16.6511 31.625 17.0904 31.2417 17.4418L25.6354 23.0001L31.2417 28.5907C31.593 28.9442 31.7687 29.394 31.7687 29.9402C31.7687 30.4864 31.593 30.9363 31.2417 31.2897C30.8583 31.673 30.4031 31.8647 29.876 31.8647C29.3489 31.8647 28.9097 31.673 28.5583 31.2897L23 25.6834Z" fill="currentColor" />
          </svg>
        </button>
        <h2 className={styles.modalTitle}>Стать частью клуба и записаться на тренировку</h2>
        <form ref={formRef} className={styles.modalForm} onSubmit={handleSubmit}>
          <div className={styles.modalSection}>
            <h3 className={styles.modalSectionTitle}>Формат тренировки</h3>
            <div className={styles.modalField}>
              <div className={styles.modalSelectWrapper}>
                <select className={styles.modalSelect} id="sport-training" name="sport" required>
                  <option value="" disabled selected>
                    Выберите вид спорта
                  </option>
                  <option value="tennis">Теннис</option>
                  <option value="padel">Падел</option>
                </select>
                <div className={styles.modalSelectArrow}>
                  <svg viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-arrow-down">
                    <path d="M15.4866 8.00023C15.8083 7.49477 15.4452 6.83334 14.846 6.83334L5.65396 6.83334C5.05484 6.83334 4.69175 7.49477 5.0134 8.00023L9.60945 15.2226C9.9078 15.6914 10.5922 15.6914 10.8906 15.2226L15.4866 8.00023Z" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </div>
            <div className={styles.modalField}>
              <div className={styles.modalSelectWrapper}>
                <select className={styles.modalSelect} id="format-training" name="format" required>
                  <option value="" disabled selected>
                    Выберите формат
                  </option>
                  <option value="group">Групповые</option>
                  <option value="personal">Персональные</option>
                  <option value="split">Сплит</option>
                </select>
                <div className={styles.modalSelectArrow}>
                  <svg viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-arrow-down">
                    <path d="M15.4866 8.00023C15.8083 7.49477 15.4452 6.83334 14.846 6.83334L5.65396 6.83334C5.05484 6.83334 4.69175 7.49477 5.0134 8.00023L9.60945 15.2226C9.9078 15.6914 10.5922 15.6914 10.8906 15.2226L15.4866 8.00023Z" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </div>
            <div className={styles.modalField}>
              <input
                className={styles.modalInput}
                type="text"
                id="name-training"
                name="name"
                placeholder="Введите ваше имя"
                required
              />
            </div>
            <div className={styles.modalField}>
              <input
                className={styles.modalInput}
                type="tel"
                id="phone-training"
                name="phone"
                placeholder="+7 (___) ___-__-__"
                required
              />
            </div>
          </div>
          <div className={styles.modalSection}>
            <div className={styles.modalCheckbox}>
              <input
                className={styles.modalCheckboxInput}
                type="checkbox"
                id="agreement1-training"
                name="agreement1"
                required
              />
              <label className={styles.modalCheckboxLabel} htmlFor="agreement1-training">
                * Я согласен с{' '}
                <a className={styles.modalLink} href="#" target="_blank">
                  Договором на оказание физкультурно-оздоровительных услуг (публичной офертой)
                </a>
              </label>
            </div>
            <div className={styles.modalCheckbox}>
              <input
                className={styles.modalCheckboxInput}
                type="checkbox"
                id="agreement2-training"
                name="agreement2"
                required
              />
              <label className={styles.modalCheckboxLabel} htmlFor="agreement2-training">
                * Я согласен с{' '}
                <a className={styles.modalLink} href="#" target="_blank">
                  Политикой в отношении обработки персональных данных
                </a>
              </label>
            </div>
          </div>
          <Button
            text="Записаться"
            href="#"
            variant="primary"
            className={styles.modalSubmit}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(e as unknown as React.FormEvent);
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default ModalTraining;

