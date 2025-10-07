import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge Component', () => {
  it('should render badge with content', () => {
    render(<Badge content={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should render badge with string content', () => {
    render(<Badge content="!" />);
    expect(screen.getByText('!')).toBeInTheDocument();
  });

  it('should not render when content is not provided', () => {
    const { container } = render(<Badge />);
    expect(container.firstChild).toBeNull();
  });

  it('should apply default variant class', () => {
    render(<Badge content={3} variant="default" />);
    const badge = screen.getByText('3');
    expect(badge.className).toContain('badge--default');
  });

  it('should apply warning variant class', () => {
    render(<Badge content="!" variant="warning" />);
    const badge = screen.getByText('!');
    expect(badge.className).toContain('badge--warning');
  });

  it('should apply success variant class', () => {
    render(<Badge content="✓" variant="success" />);
    const badge = screen.getByText('✓');
    expect(badge.className).toContain('badge--success');
  });

  it('should use default variant when not specified', () => {
    render(<Badge content={5} />);
    const badge = screen.getByText('5');
    expect(badge.className).toContain('badge--default');
  });

  it('should apply custom className', () => {
    render(<Badge content={5} className="custom-class" />);
    const badge = screen.getByText('5');
    expect(badge).toHaveClass('custom-class');
  });

  it('should have aria-label', () => {
    render(<Badge content={5} ariaLabel="5 notifications" />);
    const badge = screen.getByText('5');
    expect(badge).toHaveAttribute('aria-label', '5 notifications');
  });

  it('should use content as default aria-label', () => {
    render(<Badge content={5} />);
    const badge = screen.getByText('5');
    expect(badge).toHaveAttribute('aria-label', '5');
  });
});
