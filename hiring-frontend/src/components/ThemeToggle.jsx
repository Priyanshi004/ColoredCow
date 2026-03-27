import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
        {isDarkMode ? 'DARK' : 'LIGHT'}
      </span>
      <label className="switch">
        <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
        <span className="slider round"></span>
      </label>
    </div>
  );
}
