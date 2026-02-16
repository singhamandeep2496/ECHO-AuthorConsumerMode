import { Flex } from '@radix-ui/themes'
import type { TabId } from '../../types/branch'


interface Tab {
  id: TabId
  label: string
  count?: number
}

interface TabsWithCountProps {
  tabs: Tab[]
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}

export function TabsWithCount({ tabs, activeTab, onTabChange }: TabsWithCountProps) {
  return (
    <Flex
      align="center"
      style={{
        backgroundColor: '#f3f4f6',
        padding: '2px',
        borderRadius: '6px',
        border: '1px solid #e5e7eb',
        display: 'inline-flex'
      }}
    >
      {tabs.map(tab => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              padding: '4px 12px',
              borderRadius: '4px',
              border: isActive ? '1px solid #e5e7eb' : '1px solid transparent',
              backgroundColor: isActive ? 'white' : 'transparent',
              color: isActive ? '#1f2937' : '#6b7280',
              fontWeight: 500,
              fontSize: '0.8rem',
              cursor: 'pointer',
              boxShadow: isActive ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
              transition: 'all 0.1s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              outline: 'none'
            }}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                style={{
                  backgroundColor: isActive ? '#f3f4f6' : 'rgba(0,0,0,0.05)',
                  color: isActive ? '#1f2937' : '#6b7280',
                  padding: '0 6px',
                  borderRadius: '10px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {tab.count}
              </span>
            )}
          </button>
        )
      })}
    </Flex>
  )
}
