import React, { forwardRef } from 'react';
import type { TabProps } from './types';
import { Badge } from './Badge';
import styles from './Tabs.module.css';

interface InternalTabProps extends TabProps {
  isActive: boolean;
  onClick: () => void;
  index: number;
  totalTabs: number;
}

export const Tab = forwardRef<HTMLButtonElement, InternalTabProps>(({
  id,
  label,
  badge,
  isActive,
  disabled = false,
  className = '',
  onClick,
  index,
  totalTabs,
}, ref) => {
  const tabClass = `${styles.tabs__tab} ${
    isActive ? styles['tabs__tab--active'] : ''
  } ${disabled ? styles['tabs__tab--disabled'] : ''} ${className}`.trim();

  const panelId = `tabpanel-${id}`;
  const tabId = `tab-${id}`;

  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    // Activate tab with Enter or Space
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <button
      ref={ref}
      id={tabId}
      role="tab"
      type="button"
      className={tabClass}
      aria-selected={isActive}
      aria-controls={panelId}
      aria-disabled={disabled}
      tabIndex={isActive ? 0 : -1}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-setsize={totalTabs}
      aria-posinset={index + 1}
    >
      <span>{label}</span>
      {badge && <Badge {...badge} />}
    </button>
  );
});

Tab.displayName = 'Tab';
