import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, Tab } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// Basic tabs without badges
export const Default: Story = {
  render: () => (
    <Tabs defaultActiveTab="emails">
      <Tab id="emails" label="Emails">
        <div style={{ padding: '16px' }}>
          <h3>Emails Content</h3>
          <p>Your inbox messages appear here.</p>
        </div>
      </Tab>
      <Tab id="files" label="Files">
        <div style={{ padding: '16px' }}>
          <h3>Files Content</h3>
          <p>Your files and documents appear here.</p>
        </div>
      </Tab>
      <Tab id="edits" label="Edits">
        <div style={{ padding: '16px' }}>
          <h3>Edits Content</h3>
          <p>Your recent edits appear here.</p>
        </div>
      </Tab>
      <Tab id="downloads" label="Downloads">
        <div style={{ padding: '16px' }}>
          <h3>Downloads Content</h3>
          <p>Your downloads appear here.</p>
        </div>
      </Tab>
      <Tab id="documents" label="Documents">
        <div style={{ padding: '16px' }}>
          <h3>Documents Content</h3>
          <p>Your documents appear here.</p>
        </div>
      </Tab>
    </Tabs>
  ),
};

// Tabs with badges (all variants)
export const WithBadges: Story = {
  render: () => (
    <Tabs defaultActiveTab="emails">
      <Tab id="emails" label="Emails" badge={{ content: 3 }}>
        <div style={{ padding: '16px' }}>
          <h3>Emails Content</h3>
          <p>You have 3 new emails.</p>
        </div>
      </Tab>
      <Tab id="files" label="Files" badge={{ content: 5, variant: 'success' }}>
        <div style={{ padding: '16px' }}>
          <h3>Files Content</h3>
          <p>You have 5 files ready.</p>
        </div>
      </Tab>
      <Tab id="edits" label="Edits" badge={{ content: '!', variant: 'warning' }}>
        <div style={{ padding: '16px' }}>
          <h3>Edits Content</h3>
          <p>You have pending edits that need attention.</p>
        </div>
      </Tab>
      <Tab id="downloads" label="Downloads">
        <div style={{ padding: '16px' }}>
          <h3>Downloads Content</h3>
          <p>Your downloads appear here.</p>
        </div>
      </Tab>
      <Tab id="messages" label="Messages" badge={{ content: 12 }}>
        <div style={{ padding: '16px' }}>
          <h3>Messages Content</h3>
          <p>You have 12 unread messages.</p>
        </div>
      </Tab>
    </Tabs>
  ),
};

// Badge variants showcase
export const BadgeVariants: Story = {
  render: () => (
    <Tabs defaultActiveTab="default">
      <Tab id="default" label="Default Badge" badge={{ content: 3, variant: 'default' }}>
        <div style={{ padding: '16px' }}>
          <h3>Default Badge</h3>
          <p>This tab uses the default badge variant.</p>
        </div>
      </Tab>
      <Tab id="warning" label="Warning Badge" badge={{ content: '!', variant: 'warning' }}>
        <div style={{ padding: '16px' }}>
          <h3>Warning Badge</h3>
          <p>This tab uses the warning badge variant for alerts.</p>
        </div>
      </Tab>
      <Tab id="success" label="Success Badge" badge={{ content: '✓', variant: 'success' }}>
        <div style={{ padding: '16px' }}>
          <h3>Success Badge</h3>
          <p>This tab uses the success badge variant.</p>
        </div>
      </Tab>
    </Tabs>
  ),
};

// Controlled mode
export const Controlled: Story = {
  render: function ControlledTabs() {
    const [activeTab, setActiveTab] = React.useState<string | number>('tab1');

    return (
      <div>
        <div style={{ marginBottom: '16px' }}>
          <p>Current active tab: <strong>{activeTab}</strong></p>
          <button onClick={() => setActiveTab('tab1')}>Switch to Tab 1</button>{' '}
          <button onClick={() => setActiveTab('tab2')}>Switch to Tab 2</button>
        </div>
        <Tabs activeTab={activeTab} onChange={setActiveTab}>
          <Tab id="tab1" label="Tab 1">
            <div style={{ padding: '16px' }}>
              <h3>Tab 1 Content</h3>
              <p>This is controlled by external state.</p>
            </div>
          </Tab>
          <Tab id="tab2" label="Tab 2">
            <div style={{ padding: '16px' }}>
              <h3>Tab 2 Content</h3>
              <p>Try using the buttons above to switch tabs.</p>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  },
};

// With disabled tab
export const WithDisabledTab: Story = {
  render: () => (
    <Tabs defaultActiveTab="emails">
      <Tab id="emails" label="Emails">
        <div style={{ padding: '16px' }}>
          <h3>Emails Content</h3>
          <p>Your inbox messages appear here.</p>
        </div>
      </Tab>
      <Tab id="files" label="Files" disabled>
        <div style={{ padding: '16px' }}>
          <h3>Files Content</h3>
          <p>This tab is disabled.</p>
        </div>
      </Tab>
      <Tab id="edits" label="Edits">
        <div style={{ padding: '16px' }}>
          <h3>Edits Content</h3>
          <p>Your recent edits appear here.</p>
        </div>
      </Tab>
    </Tabs>
  ),
};

// Mobile responsive preview
export const MobileView: Story = {
  render: () => (
    <div style={{ maxWidth: '375px', border: '1px solid #ddd', padding: '16px' }}>
      <Tabs defaultActiveTab="emails">
        <Tab id="emails" label="Emails" badge={{ content: 3 }}>
          <div style={{ padding: '16px' }}>
            <h3>Emails</h3>
            <p>Swipe to navigate on mobile.</p>
          </div>
        </Tab>
        <Tab id="files" label="Files">
          <div style={{ padding: '16px' }}>
            <h3>Files</h3>
            <p>Your files appear here.</p>
          </div>
        </Tab>
        <Tab id="edits" label="Edits">
          <div style={{ padding: '16px' }}>
            <h3>Edits</h3>
            <p>Your edits appear here.</p>
          </div>
        </Tab>
        <Tab id="downloads" label="Downloads">
          <div style={{ padding: '16px' }}>
            <h3>Downloads</h3>
            <p>Downloads appear here.</p>
          </div>
        </Tab>
        <Tab id="documents" label="Documents">
          <div style={{ padding: '16px' }}>
            <h3>Documents</h3>
            <p>Documents appear here.</p>
          </div>
        </Tab>
      </Tabs>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
