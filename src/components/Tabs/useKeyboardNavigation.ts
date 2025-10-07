import { useRef, useCallback } from 'react';

interface UseKeyboardNavigationProps {
  tabCount: number;
  activeIndex: number;
  onTabChange: (index: number, shouldFocus?: boolean) => void;
  orientation?: 'horizontal' | 'vertical';
  disabled?: boolean[];
}

export const useKeyboardNavigation = ({
  tabCount,
  activeIndex,
  onTabChange,
  orientation = 'horizontal',
  disabled = [],
}: UseKeyboardNavigationProps) => {
  const tabsListRef = useRef<HTMLDivElement>(null);

  const getNextEnabledIndex = useCallback(
    (startIndex: number, direction: 1 | -1): number => {
      let nextIndex = startIndex;
      let iterations = 0;

      // Prevent infinite loops
      while (iterations < tabCount) {
        nextIndex = (nextIndex + direction + tabCount) % tabCount;

        if (!disabled[nextIndex]) {
          return nextIndex;
        }

        iterations++;
      }

      return startIndex;
    },
    [tabCount, disabled]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const isHorizontal = orientation === 'horizontal';
      const { key } = event;

      // Determine navigation keys based on orientation
      const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';
      const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';

      switch (key) {
        case nextKey: {
          event.preventDefault();
          const nextIndex = getNextEnabledIndex(activeIndex, 1);
          onTabChange(nextIndex, true);
          break;
        }

        case prevKey: {
          event.preventDefault();
          const prevIndex = getNextEnabledIndex(activeIndex, -1);
          onTabChange(prevIndex, true);
          break;
        }

        case 'Home': {
          event.preventDefault();
          const firstEnabled = getNextEnabledIndex(-1, 1);
          onTabChange(firstEnabled, true);
          break;
        }

        case 'End': {
          event.preventDefault();
          const lastEnabled = getNextEnabledIndex(tabCount, -1);
          onTabChange(lastEnabled, true);
          break;
        }

        default:
          break;
      }
    },
    [activeIndex, orientation, onTabChange, getNextEnabledIndex, tabCount]
  );

  return {
    tabsListRef,
    handleKeyDown,
  };
};
