import React, { useState, Children, isValidElement, useRef } from 'react';
import type { TabsProps, TabProps } from './types';
import { Tab as TabInternal } from './Tab';
import { useKeyboardNavigation } from './useKeyboardNavigation';
import styles from './Tabs.module.css';

export const Tabs: React.FC<TabsProps> = ({
  activeTab: controlledActiveTab,
  defaultActiveTab,
  onChange,
  children,
  orientation = 'horizontal',
  className = '',
  ariaLabel = 'Tabs',
}) => {
  // Determine if component is controlled or uncontrolled
  const isControlled = controlledActiveTab !== undefined;

  // Convert children to array and extract tab data
  const childrenArray = Children.toArray(children);
  const tabs = childrenArray.filter(
    (child): child is React.ReactElement<TabProps> =>
      isValidElement(child) && child.type === TabData
  );

  // Get initial tab ID
  const getInitialTabId = () => {
    if (defaultActiveTab !== undefined) return defaultActiveTab;
    const firstTab = tabs[0];
    return firstTab?.props.id ?? 0;
  };

  // Internal state for uncontrolled mode
  const [internalActiveTab, setInternalActiveTab] = useState(getInitialTabId);

  // Current active tab ID
  const activeTabId = isControlled ? controlledActiveTab : internalActiveTab;

  // Find active tab index
  const activeIndex = tabs.findIndex((tab) => tab.props.id === activeTabId);
  const validActiveIndex = activeIndex >= 0 ? activeIndex : 0;

  // Extract disabled states
  const disabledStates = tabs.map((tab) => tab.props.disabled || false);

  // Refs for tab buttons
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Handle tab change
  const handleTabChange = (index: number, shouldFocus = false) => {
    const newTabId = tabs[index]?.props.id;
    if (newTabId === undefined) return;

    if (!isControlled) {
      setInternalActiveTab(newTabId);
    }

    onChange?.(newTabId);

    // Focus the tab if requested (keyboard navigation)
    if (shouldFocus) {
      setTimeout(() => {
        tabRefs.current[index]?.focus();
      }, 0);
    }
  };

  // Keyboard navigation
  const { tabsListRef, handleKeyDown } = useKeyboardNavigation({
    tabCount: tabs.length,
    activeIndex: validActiveIndex,
    onTabChange: handleTabChange,
    orientation,
    disabled: disabledStates,
  });

  return (
    <div className={className}>
      {/* Tab List */}
      <div
        ref={tabsListRef}
        role="tablist"
        aria-label={ariaLabel}
        aria-orientation={orientation}
        className={styles.tabs__list}
        onKeyDown={handleKeyDown}
      >
        {tabs.map((child, index) => {
          const { id, label, badge, disabled, className: tabClassName } = child.props;

          return (
            <TabInternal
              key={id}
              ref={(el) => { tabRefs.current[index] = el; }}
              id={id}
              label={label}
              badge={badge}
              disabled={disabled}
              className={tabClassName}
              isActive={id === activeTabId}
              onClick={() => handleTabChange(index)}
              index={index}
              totalTabs={tabs.length}
            >
              {child.props.children}
            </TabInternal>
          );
        })}
      </div>

      {/* Tab Panels */}
      {tabs.map((child) => {
        const { id, children: content } = child.props;
        const isActive = id === activeTabId;
        const panelId = `tabpanel-${id}`;
        const tabId = `tab-${id}`;

        return (
          <div
            key={panelId}
            id={panelId}
            role="tabpanel"
            aria-labelledby={tabId}
            className={styles.tabs__panel}
            hidden={!isActive}
            tabIndex={0}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
};

Tabs.displayName = 'Tabs';

// Public Tab component - only used as data holder for Tabs children
export const Tab: React.FC<TabProps> = () => {
  // This component is never actually rendered - Tabs extracts its props
  return null;
};

// Add a display name to help with React DevTools
(Tab as React.FC<TabProps>).displayName = 'Tab';

// Store reference for type checking
const TabData = Tab;
