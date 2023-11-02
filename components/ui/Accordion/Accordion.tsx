import React, { useState } from 'react';
import styles from '@/custom/CSSFile/default/Index.module.css';

type AccordionProps = {
  title: string;
  content: React.ReactNode;
};

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.accordion} ${isOpen ? styles.open : ''}`}>
      <div className={styles['accordion-header']} onClick={toggleAccordion}>
        <div className={styles.circle}>
          <span className={styles['circle-text']}>1</span>
        </div>
        <span className={styles['accordion-title']}>{title}</span>
        <span
          className={`${styles['accordion-icon']} ${isOpen ? styles.open : ''}`}
        >
          ▼
        </span>
      </div>
      {isOpen && <div className={styles['accordion-content']}>{content}</div>}
    </div>
  );
};

export default Accordion;
