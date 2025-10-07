import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs, Tab } from './Tabs';

describe('Tabs Component', () => {
  describe('Basic Rendering', () => {
    it('should render all tabs', () => {
      render(
        <Tabs>
          <Tab id="tab1" label="Tab 1">Content 1</Tab>
          <Tab id="tab2" label="Tab 2">Content 2</Tab>
          <Tab id="tab3" label="Tab 3">Content 3</Tab>
        </Tabs>
      );

      expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Tab 3' })).toBeInTheDocument();
    });

    it('should render first tab as active by default', () => {
      render(
        <Tabs>
          <Tab id="tab1" label="Tab 1">Content 1</Tab>
          <Tab id="tab2" label="Tab 2">Content 2</Tab>
        </Tabs>
      );

      const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
      expect(firstTab).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Content 1')).toBeVisible();
    });

    it('should honor defaultActiveTab prop', () => {
      render(
        <Tabs defaultActiveTab="tab2">
          <Tab id="tab1" label="Tab 1">Content 1</Tab>
          <Tab id="tab2" label="Tab 2">Content 2</Tab>
        </Tabs>
      );

      const secondTab = screen.getByRole('tab', { name: 'Tab 2' });
      expect(secondTab).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Content 2')).toBeVisible();
    });
  });

  describe('Tab Switching', () => {
    it('should switch tabs on click', () => {
      render(
        <Tabs>
          <Tab id="tab1" label="Tab 1">Content 1</Tab>
          <Tab id="tab2" label="Tab 2">Content 2</Tab>
        </Tabs>
      );

      const secondTab = screen.getByRole('tab', { name: 'Tab 2' });
      fireEvent.click(secondTab);

      expect(secondTab).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Content 2')).toBeVisible();
      expect(screen.queryByText('Content 1')).not.toBeVisible();
    });

    it('should call onChange callback when tab changes', () => {
      const handleChange = vi.fn();

      render(
        <Tabs onChange={handleChange}>
          <Tab id="tab1" label="Tab 1">Content 1</Tab>
          <Tab id="tab2" label="Tab 2">Content 2</Tab>
        </Tabs>
      );

      const secondTab = screen.getByRole('tab', { name: 'Tab 2' });
      fireEvent.click(secondTab);

      expect(handleChange).toHaveBeenCalledWith('tab2');
    });

    it('should work in controlled mode', () => {
      const { rerender } = render(
        <Tabs activeTab="tab1">
          <Tab id="tab1" label="Tab 1">Content 1</Tab>
          <Tab id="tab2" label="Tab 2">Content 2</Tab>
        </Tabs>
      );

      expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('aria-selected', 'true');

      rerender(
        <Tabs activeTab="tab2">
          <Tab id="tab1" label="Tab 1">Content 1</Tab>
          <Tab id="tab2" label="Tab 2">Content 2</Tab>
        </Tabs>
      );

      expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should navigate to next tab with ArrowRight', async () => {
      const user = userEvent.setup();

      render(
        <Tabs defaultActiveTab="tab1">
          <Tab id="tab1" label="Tab 1">Content 1</Tab>
          <Tab id="tab2" label="Tab 2">Content 2</Tab>
          <Tab id="tab3" label="Tab 3">Content 3</Tab>
        </Tabs>
      );

      const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
      firstTab.focus();

      await user.keyboard('{ArrowRight}');

      const secondTab = screen.getByRole('tab', { name: 'Tab 2' });
      expect(secondTab).toHaveFocus();
    });

    it('should navigate to previous tab with ArrowLeft', async () => {
      const user = userEvent.setup();

      render(
        <Tabs defaultActiveTab="tab2">
          <Tab id="tab1" label="Tab 1">Content 1</Tab>
          <Tab id="tab2" label="Tab 2">Content 2</Tab>
          <Tab id="tab3" label="Tab 3">Content 3</Tab>
        </Tabs>
      );

      const secondTab = screen.getByRole('tab', { name: 'Tab 2' });
      secondTab.focus();

      await user.keyboard('{ArrowLeft}');

      const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
      expect(firstTab).toHaveFocus();
    });

    it('should wrap around when navigating with arrows', async () => {
      const user = userEvent.setup();

      render(
        <Tabs defaultActiveTab="tab3">
          <Tab id="tab1" label="Tab 1">Content 1</Tab>
          <Tab id="tab2" label="Tab 2">Content 2</Tab>
          <Tab id="tab3" label="Tab 3">Content 3</Tab>
        </Tabs>
      );

      const lastTab = screen.getByRole('tab', { name: 'Tab 3' });
      lastTab.focus();

      await user.keyboard('{ArrowRight}');

      const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
      expect(firstTab).toHaveFocus();
    });

    it('should navigate to first tab with Home key', async () => {
      const user = userEvent.setup();

      render(
        <Tabs defaultActiveTab="tab2">
          <Tab id="tab1" label="Tab 1">Content 1</Tab>
          <Tab id="tab2" label="Tab 2">Content 2</Tab>
          <Tab id="tab3" label="Tab 3">Content 3</Tab>
        </Tabs>
      );

      const secondTab = screen.getByRole('tab', { name: 'Tab 2' });
      secondTab.focus();

      await user.keyboard('{Home}');

      const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
      expect(firstTab).toHaveFocus();
    });

    it('should navigate to last tab with End key', async () => {
      const user = userEvent.setup();

      render(
        <Tabs defaultActiveTab="tab1">
          <Tab id="tab1" label="Tab 1">Content 1</Tab>
          <Tab id="tab2" label="Tab 2">Content 2</Tab>
          <Tab id="tab3" label="Tab 3">Content 3</Tab>
        </Tabs>
      );

      const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
      firstTab.focus();

      await user.keyboard('{End}');

      const lastTab = screen.getByRole('tab', { name: 'Tab 3' });
      expect(lastTab).toHaveFocus();
    });

    it('should activate tab with Enter key', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Tabs defaultActiveTab="tab1" onChange={handleChange}>
          <Tab id="tab1" label="Tab 1">Content 1</Tab>
          <Tab id="tab2" label="Tab 2">Content 2</Tab>
        </Tabs>
      );

      const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
      firstTab.focus();

      await user.keyboard('{ArrowRight}');
      await user.keyboard('{Enter}');

      expect(handleChange).toHaveBeenCalledWith('tab2');
    });

    it('should activate tab with Space key', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Tabs defaultActiveTab="tab1" onChange={handleChange}>
          <Tab id="tab1" label="Tab 1">Content 1</Tab>
          <Tab id="tab2" label="Tab 2">Content 2</Tab>
        </Tabs>
      );

      const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
      firstTab.focus();

      await user.keyboard('{ArrowRight}');
      await user.keyboard(' ');

      expect(handleChange).toHaveBeenCalledWith('tab2');
    });

    it('should skip disabled tabs during keyboard navigation', async () => {
      const user = userEvent.setup();

      render(
        <Tabs defaultActiveTab="tab1">
          <Tab id="tab1" label="Tab 1">Content 1</Tab>
          <Tab id="tab2" label="Tab 2" disabled>Content 2</Tab>
          <Tab id="tab3" label="Tab 3">Content 3</Tab>
        </Tabs>
      );

      const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
      firstTab.focus();

      await user.keyboard('{ArrowRight}');

      const thirdTab = screen.getByRole('tab', { name: 'Tab 3' });
      expect(thirdTab).toHaveFocus();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA roles', () => {
      render(
        <Tabs>
          <Tab id="tab1" label="Tab 1">Content 1</Tab>
          <Tab id="tab2" label="Tab 2">Content 2</Tab>
        </Tabs>
      );

      expect(screen.getByRole('tablist')).toBeInTheDocument();
      expect(screen.getAllByRole('tab')).toHaveLength(2);
      expect(screen.getAllByRole('tabpanel', { hidden: true })).toHaveLength(2);
    });

    it('should have correct aria-selected attributes', () => {
      render(
        <Tabs defaultActiveTab="tab1">
          <Tab id="tab1" label="Tab 1">Content 1</Tab>
          <Tab id="tab2" label="Tab 2">Content 2</Tab>
        </Tabs>
      );

      const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
      const secondTab = screen.getByRole('tab', { name: 'Tab 2' });

      expect(firstTab).toHaveAttribute('aria-selected', 'true');
      expect(secondTab).toHaveAttribute('aria-selected', 'false');
    });

    it('should have correct aria-controls and aria-labelledby', () => {
      render(
        <Tabs>
          <Tab id="tab1" label="Tab 1">Content 1</Tab>
        </Tabs>
      );

      const tab = screen.getByRole('tab', { name: 'Tab 1' });
      const panel = screen.getByRole('tabpanel');

      expect(tab).toHaveAttribute('aria-controls', 'tabpanel-tab1');
      expect(panel).toHaveAttribute('aria-labelledby', 'tab-tab1');
    });

    it('should use roving tabindex', () => {
      render(
        <Tabs defaultActiveTab="tab1">
          <Tab id="tab1" label="Tab 1">Content 1</Tab>
          <Tab id="tab2" label="Tab 2">Content 2</Tab>
        </Tabs>
      );

      const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
      const secondTab = screen.getByRole('tab', { name: 'Tab 2' });

      expect(firstTab).toHaveAttribute('tabindex', '0');
      expect(secondTab).toHaveAttribute('tabindex', '-1');
    });

    it('should set aria-disabled on disabled tabs', () => {
      render(
        <Tabs>
          <Tab id="tab1" label="Tab 1" disabled>Content 1</Tab>
        </Tabs>
      );

      const tab = screen.getByRole('tab', { name: 'Tab 1' });
      expect(tab).toHaveAttribute('aria-disabled', 'true');
    });

    it('should include position info for screen readers', () => {
      render(
        <Tabs>
          <Tab id="tab1" label="Tab 1">Content 1</Tab>
          <Tab id="tab2" label="Tab 2">Content 2</Tab>
          <Tab id="tab3" label="Tab 3">Content 3</Tab>
        </Tabs>
      );

      const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
      expect(firstTab).toHaveAttribute('aria-posinset', '1');
      expect(firstTab).toHaveAttribute('aria-setsize', '3');
    });
  });

  describe('Badge Support', () => {
    it('should render badge when provided', () => {
      render(
        <Tabs>
          <Tab id="tab1" label="Tab 1" badge={{ content: 5 }}>Content 1</Tab>
        </Tabs>
      );

      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('should render badge with different variants', () => {
      render(
        <Tabs>
          <Tab id="tab1" label="Tab 1" badge={{ content: 3, variant: 'default' }}>Content 1</Tab>
          <Tab id="tab2" label="Tab 2" badge={{ content: '!', variant: 'warning' }}>Content 2</Tab>
          <Tab id="tab3" label="Tab 3" badge={{ content: '✓', variant: 'success' }}>Content 3</Tab>
        </Tabs>
      );

      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('!')).toBeInTheDocument();
      expect(screen.getByText('✓')).toBeInTheDocument();
    });

    it('should not render badge when content is not provided', () => {
      render(
        <Tabs>
          <Tab id="tab1" label="Tab 1" badge={{ variant: 'default' }}>Content 1</Tab>
        </Tabs>
      );

      const tab = screen.getByRole('tab', { name: 'Tab 1' });
      expect(tab.querySelector('.badge')).not.toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('should not activate disabled tab on click', () => {
      const handleChange = vi.fn();

      render(
        <Tabs onChange={handleChange}>
          <Tab id="tab1" label="Tab 1">Content 1</Tab>
          <Tab id="tab2" label="Tab 2" disabled>Content 2</Tab>
        </Tabs>
      );

      const disabledTab = screen.getByRole('tab', { name: 'Tab 2' });
      fireEvent.click(disabledTab);

      expect(handleChange).not.toHaveBeenCalled();
      expect(disabledTab).toHaveAttribute('aria-selected', 'false');
    });
  });
});
