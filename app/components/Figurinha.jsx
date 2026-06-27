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
  const isMarked = owners && owners.length > 0;

  const handleClick = () => {
    if (hasUser) {
      onToggle(countryCode, number, owners.filter(u => u !== currentUser));
    } else {
      onToggle(countryCode, number, [...(owners || []), currentUser]);
    }
  };

  // Colore toda figurinha marcada com a cor de cada dono (faixas se houver vários)
  let buttonStyle = {};
  if (isMarked) {
    const colors = owners.map(o => USER_COLORS[o] || '#666');
    const stops = colors
      .map((c, i) => {
        const start = (i / colors.length) * 100;
        const end = ((i + 1) / colors.length) * 100;
        return `${c} ${start}%, ${c} ${end}%`;
      })
      .join(', ');
    buttonStyle = { background: `linear-gradient(135deg, ${stops})` };
  }

  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${isMarked ? styles.marked : ''} ${hasUser ? styles.mine : ''}`}
        style={buttonStyle}
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
