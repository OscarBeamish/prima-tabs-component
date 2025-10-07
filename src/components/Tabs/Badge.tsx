import React from 'react';
import type { BadgeProps } from './types';
import styles from './Tabs.module.css';

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  content,
  ariaLabel,
  className = '',
}) => {
  if (!content) return null;

  const badgeClass = `${styles.badge} ${styles[`badge--${variant}`]} ${className}`.trim();

  return (
    <span className={badgeClass} aria-label={ariaLabel || `${content}`}>
      {content}
    </span>
  );
};

Badge.displayName = 'Badge';
