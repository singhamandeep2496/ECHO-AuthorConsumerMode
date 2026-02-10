import { Flex, Text } from '@radix-ui/themes';
import { Search, ChevronDown } from 'lucide-react';

export interface NotificationFilterBarProps {
    /** Current active filter */
    activeFilter: 'all' | 'unread';
    /** Callback when filter changes */
    onFilterChange: (filter: 'all' | 'unread') => void;
    /** Current search query */
    searchQuery: string;
    /** Callback when search changes */
    onSearchChange: (query: string) => void;
}

export function NotificationFilterBar({
    activeFilter,
    onFilterChange,
    searchQuery,
    onSearchChange,
}: NotificationFilterBarProps) {
    return (
        <Flex
            align="center"
            justify="between"
            style={{
                padding: '12px 24px',
                borderBottom: '1px solid #e5e7eb',
                backgroundColor: 'white',
                gap: 12
            }}
        >
            <Flex align="center" gap="2">
                <button
                    onClick={() => onFilterChange('all')}
                    style={{
                        padding: '5px 14px',
                        borderRadius: 6,
                        border: '1px solid',
                        borderColor: activeFilter === 'all' ? '#d1d5db' : 'transparent',
                        backgroundColor: activeFilter === 'all' ? '#f3f4f6' : 'transparent',
                        color: activeFilter === 'all' ? '#1f2937' : '#6b7280',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                    }}
                >
                    All
                </button>
                <button
                    onClick={() => onFilterChange('unread')}
                    style={{
                        padding: '5px 14px',
                        borderRadius: 6,
                        border: '1px solid',
                        borderColor: activeFilter === 'unread' ? '#d1d5db' : 'transparent',
                        backgroundColor: activeFilter === 'unread' ? '#f3f4f6' : 'transparent',
                        color: activeFilter === 'unread' ? '#1f2937' : '#6b7280',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                    }}
                >
                    Unread
                </button>
            </Flex>

            <Flex
                align="center"
                style={{
                    flex: 1,
                    maxWidth: 480,
                    backgroundColor: '#f9fafb',
                    border: '1px solid #e5e7eb',
                    borderRadius: 6,
                    padding: '5px 10px',
                    gap: 6
                }}
            >
                <Search size={14} style={{ color: '#9ca3af', flexShrink: 0 }} />
                <input
                    type="text"
                    placeholder="Search notifications"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    style={{
                        border: 'none',
                        outline: 'none',
                        fontSize: '0.8rem',
                        color: '#374151',
                        backgroundColor: 'transparent',
                        width: '100%'
                    }}
                />
            </Flex>

            <Flex
                align="center"
                gap="1"
                style={{
                    padding: '5px 10px',
                    borderRadius: 6,
                    border: '1px solid #e5e7eb',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                }}
            >
                <Text size="1" style={{ color: '#6b7280' }}>Group by:</Text>
                <Text size="1" weight="bold" style={{ color: '#1f2937' }}>Date</Text>
                <ChevronDown size={12} style={{ color: '#9ca3af' }} />
            </Flex>
        </Flex>
    );
}
