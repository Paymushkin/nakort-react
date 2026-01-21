'use client';

import React, { useState } from 'react';
import Button from './Button';
import styles from './FAQ.module.scss';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = [
    {
      question: 'Вы подбираете локации для занятий по запросу?',
      answer:
        'Мы проводим индивидуальные (1 человек), сплит-тренировки (2 человека) и групповые тренировки (4 человека). Подробную информацию можно получить в разделе "Цены".',
    },
    {
      question: 'Какие виды тренировок вы проводите?',
      answer:
        'Мы проводим индивидуальные (1 человек), сплит-тренировки (2 человека) и групповые тренировки (4 человека). Подробную информацию можно получить в разделе "Цены".',
    },
    {
      question: 'Есть ли у вас скидки на занятия?',
      answer:
        'Мы проводим индивидуальные (1 человек), сплит-тренировки (2 человека) и групповые тренировки (4 человека). Подробную информацию можно получить в разделе "Цены".',
    },
    {
      question: 'Есть ли у вас тренировки для корпоративных клиентов?',
      answer:
        'Мы проводим индивидуальные (1 человек), сплит-тренировки (2 человека) и групповые тренировки (4 человека). Подробную информацию можно получить в разделе "Цены".',
    },
  ];

  const toggleItem = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faq} id="faq">
      <div className="container">
        <h2 className={`section-title ${styles.faqTitle}`}>FAQ</h2>
        <div className={styles.faqContent}>
          <div className={styles.faqContentLeft}>
            <p className={styles.faqContentLeftText}>
              Вы спрашивали —
              <br />
              мы отвечаем
            </p>
            <Button text="Узнать больше" href="#" variant="primary" className="faq-content__left-btn" />
          </div>
          <div className={styles.faqContentRight}>
            <div className={styles.faqContentAccordion}>
              {faqItems.map((item, index) => (
                <details
                  key={index}
                  className={styles.faqContentAccordionItem}
                  open={openIndex === index}
                >
                  <summary
                    className={styles.faqContentAccordionSummary}
                    onClick={(e) => toggleItem(index, e)}
                  >
                    <span className={styles.faqContentAccordionQuestion}>{item.question}</span>
                    <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-arrow">
                      <path d="M21.6666 1.66667L18.3333 1.66667L18.3333 15.9833L2.34996 2.30349e-07L-4.19336e-05 2.35L15.9833 18.3333L1.66663 18.3333L1.66663 21.6667L21.6666 21.6667L21.6666 1.66667Z" fill="currentColor" />
                    </svg>
                  </summary>
                  <div className={styles.faqContentAccordionAnswer}>
                    <p>{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

