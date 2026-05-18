'use client';

import { useState, useEffect } from 'react';
import { COUNTRIES, USERS } from '@/lib/countries';
import Selecao from './components/Selecao';
import styles from './page.module.css';

const USER_COLORS = {
  chris: '#eab308',
  isa: '#3b82f6',
  andre: '#10b981',
};

export default function Home() {
  const [currentUser, setCurrentUser] = useState(null);
  const [data, setData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(COUNTRIES);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadData();
    setCurrentUser(USERS[0]);
  }, []);

  useEffect(() => {
    const filtered = COUNTRIES.filter(country =>
      country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [searchTerm]);

  const initializeData = () => {
    const newData = {};
    COUNTRIES.forEach(country => {
      newData[country.code] = {};
      for (let i = 1; i <= country.count; i++) {
        newData[country.code][i] = [];
      }
    });
    return newData;
  };

  const loadData = async () => {
    try {
      const res = await fetch('/api/figurinhas');
      if (!res.ok) throw new Error('Falha ao carregar dados');
      const fetchedData = await res.json();
      setData(fetchedData);
    } catch (e) {
      console.error('Erro ao carregar dados:', e);
      setData(initializeData());
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFigurinhas = async (countryCode, number, newOwners) => {
    const newData = { ...data };
    if (!newData[countryCode]) newData[countryCode] = {};
    newData[countryCode][number] = newOwners;
    setData(newData);

    setIsSaving(true);
    try {
      const res = await fetch('/api/figurinhas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ countryCode, stickerNumber: number, owners: newOwners }),
      });
      if (!res.ok) throw new Error('Falha ao salvar');
    } catch (e) {
      console.error('Erro ao salvar:', e);
      loadData();
    } finally {
      setIsSaving(false);
    }
  };

  const getStats = () => {
    if (!data || Object.keys(data).length === 0) {
      return { total: 0, filled: 0, percentage: 0 };
    }
    let total = 0;
    let filled = 0;
    Object.values(data).forEach(country => {
      Object.values(country).forEach(owners => {
        total++;
        if (owners && owners.length > 0) filled++;
      });
    });
    return { total, filled, percentage: total > 0 ? Math.round((filled / total) * 100) : 0 };
  };

  const stats = getStats();
  const userStats = currentUser
    ? Object.values(data).reduce((acc, country) => {
        Object.values(country).forEach(owners => {
          if (owners && owners.includes(currentUser)) acc++;
        });
        return acc;
      }, 0)
    : 0;

  if (isLoading || !currentUser) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Figurinhas Copa 2026</h1>
          </div>
          {isSaving && <span className={styles.savingIndicator}>Salvando...</span>}
        </div>

        {/* User Selector */}
        <div className={styles.userSection}>
          <div className={styles.userLabel}>Você está como:</div>
          <div className={styles.userButtons}>
            {USERS.map(user => {
              const isActive = currentUser === user;
              const color = USER_COLORS[user];
              return (
                <button
                  key={user}
                  className={`${styles.userButton} ${isActive ? styles.active : ''}`}
                  style={isActive ? { borderColor: color, backgroundColor: color, color: 'white' } : {}}
                  onClick={() => setCurrentUser(user)}
                >
                  {user}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Total do álbum</div>
            <div className={styles.statValue}>{stats.filled}/{stats.total}</div>
            <div className={styles.statBar}>
              <div
                className={styles.statBarFill}
                style={{ width: `${stats.percentage}%` }}
              />
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statLabel}>Suas figurinhas</div>
            <div className={styles.statValue}>{userStats}</div>
            <div className={styles.statPercent}>{Math.round((userStats / stats.total) * 100) || 0}%</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statLabel}>Progresso geral</div>
            <div className={styles.statValue}>{stats.percentage}%</div>
          </div>
        </div>

        {/* Search */}
        <div className={styles.searchSection}>
          <input
            type="text"
            placeholder="Buscar país ou código..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <button
            onClick={() => setSearchTerm('')}
            className={styles.clearButton}
            style={{ display: searchTerm ? 'block' : 'none' }}
          >
            Limpar
          </button>
        </div>

        {/* Countries Grid */}
        <div className={styles.countriesSection}>
          {filteredCountries.length > 0 ? (
            filteredCountries.map(country => (
              <Selecao
                key={country.code}
                country={country}
                figurinhas={data[country.code] || {}}
                onToggle={handleToggleFigurinhas}
                currentUser={currentUser}
              />
            ))
          ) : (
            <div className={styles.noResults}>
              Nenhum país encontrado com "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
