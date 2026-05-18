'use client';

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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>{country.code}</h2>
          <p className={styles.subtitle}>{country.name}</p>
        </div>
        <div className={styles.progress}>
          <span className={styles.count}>{preenchidas}/{totalFigurinhas}</span>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${(preenchidas / totalFigurinhas) * 100}%` }}
            />
          </div>
        </div>
      </div>

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
    </div>
  );
}
