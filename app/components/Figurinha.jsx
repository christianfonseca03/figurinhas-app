'use client';

import styles from './Figurinha.module.css';

const USER_COLORS = {
  chris: '#eab308',
  isa: '#3b82f6',
  andre: '#10b981',
};

export default function Figurinha({ 
  countryCode, 
  number, 
  owners, 
  onToggle,
  currentUser 
}) {
  const hasUser = owners && owners.includes(currentUser);

  const handleClick = () => {
    if (hasUser) {
      onToggle(countryCode, number, owners.filter(u => u !== currentUser));
    } else {
      onToggle(countryCode, number, [...(owners || []), currentUser]);
    }
  };

  return (
    <div className={styles.container}>
      <button 
        className={`${styles.button} ${hasUser ? styles.active : ''}`}
        onClick={handleClick}
        title={owners ? owners.join(', ') : 'Ninguém'}
      >
        <span className={styles.number}>{number}</span>
      </button>
      {owners && owners.length > 0 && (
        <div className={styles.owners}>
          {owners.map(owner => (
            <span
              key={owner}
              className={styles.owner}
              style={{ backgroundColor: USER_COLORS[owner] || '#666' }}
            >
              {owner[0].toUpperCase()}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
