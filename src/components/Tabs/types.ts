export type BadgeVariant = 'default' | 'warning' | 'success';

export interface BadgeConfig {
  variant?: BadgeVariant;
  content?: string | number;
  ariaLabel?: string;
}

export interface TabProps {
  id: string | number;
  label: string;
  badge?: BadgeConfig;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export interface TabsProps {
  activeTab?: string | number;
  defaultActiveTab?: string | number;
  onChange?: (tabId: string | number) => void;
  children: React.ReactElement<TabProps> | React.ReactElement<TabProps>[];
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  ariaLabel?: string;
}

export interface BadgeProps {
  variant?: BadgeVariant;
  content?: string | number;
  ariaLabel?: string;
  className?: string;
}
