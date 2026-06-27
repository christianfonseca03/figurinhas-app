'use client';

import { useState } from 'react';
import Figurinha from './Figurinha';
import styles from './Selecao.module.css';

export default function Selecao({
  country,
  figurinhas,
  onToggle,
  currentUser
}) {
  const totalFigurinhas = country.count;
  const preenchidas = Array.from({ length: totalFigurinhas }, (_, i) => {
    const num = i + 1;
    return figurinhas[num] ? figurinhas[num].length : 0;
  }).reduce((a, b) => a + b, 0);

  const isComplete = preenchidas >= totalFigurinhas;
  const [expanded, setExpanded] = useState(false);
  const showGrid = !isComplete || expanded;

  return (
    <div className={`${styles.container} ${isComplete ? styles.completed : ''}`}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>{country.code}</h2>
          <p className={styles.subtitle}>{country.name}</p>
        </div>
        <div className={styles.progress}>
          <span className={styles.count}>{preenchidas}/{totalFigurinhas}</span>
          {isComplete ? (
            <button
              className={styles.toggleButton}
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? 'Fechar' : 'Abrir'}
            </button>
          ) : (
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${(preenchidas / totalFigurinhas) * 100}%` }}
              />
            </div>
          )}
        </div>
      </div>

      {showGrid && (
        <div className={styles.grid}>
          {Array.from({ length: totalFigurinhas }, (_, i) => {
            const num = i + 1;
            const owners = figurinhas[num] || [];
            return (
              <Figurinha
                key={num}
                countryCode={country.code}
                number={num}
                owners={owners}
                onToggle={onToggle}
                currentUser={currentUser}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
