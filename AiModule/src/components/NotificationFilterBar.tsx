import { useState, useRef, useEffect } from 'react';
import { Flex, Text, Box } from '@radix-ui/themes';
import {
    Search,
    ChevronDown,
    Filter,
    User,
    Eye,
    AtSign,
    Users,
    GitPullRequest,
    Check,
} from 'lucide-react';

interface FilterOption {
    id: string;
    label: string;
    icon: React.ReactNode;
    color: string;
}

const filterOptions: FilterOption[] = [
    { id: 'assigned', label: 'Assigned', icon: <User size={14} />, color: '#f97316' },
    { id: 'participating', label: 'Participating', icon: <Eye size={14} />, color: '#8b5cf6' },
    { id: 'mentioned', label: 'Mentioned', icon: <AtSign size={14} />, color: '#eab308' },
    { id: 'team', label: 'Team mentioned', icon: <Users size={14} />, color: '#8b5cf6' },
    { id: 'review', label: 'Review requested', icon: <GitPullRequest size={14} />, color: '#6b7280' },
];

export interface NotificationFilterBarProps {
    /** Current active filter */
    activeFilter: 'all' | 'unread';
    /** Callback when filter changes */
    onFilterChange: (filter: 'all' | 'unread') => void;
    /** Current search query */
    searchQuery: string;
    /** Callback when search changes */
    onSearchChange: (query: string) => void;
    /** Currently active reason filters */
    activeReasonFilters?: string[];
    /** Callback when reason filters change */
    onReasonFiltersChange?: (filters: string[]) => void;
}

export function NotificationFilterBar({
    activeFilter,
    onFilterChange,
    searchQuery,
    onSearchChange,
    activeReasonFilters = [],
    onReasonFiltersChange,
}: NotificationFilterBarProps) {
    const [filtersOpen, setFiltersOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
                setFiltersOpen(false);
            }
        }
        if (filtersOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [filtersOpen]);

    const toggleReasonFilter = (id: string) => {
        if (!onReasonFiltersChange) return;
        const next = activeReasonFilters.includes(id)
            ? activeReasonFilters.filter(f => f !== id)
            : [...activeReasonFilters, id];
        onReasonFiltersChange(next);
    };

    const hasActiveReasonFilters = activeReasonFilters.length > 0;

    return (
        <Flex
            align="center"
            justify="between"
            style={{
                padding: '12px 24px',
                backgroundColor: 'white',
                gap: 16
            }}
        >
            {/* Left Group: Segmented Control & Filter */}
            <Flex align="center" gap="3">
                {/* Segmented Control for All / Unread */}
                <Flex
                    align="center"
                    style={{
                        backgroundColor: '#f3f4f6',
                        padding: '2px',
                        borderRadius: 6,
                        border: '1px solid #e5e7eb'
                    }}
                >
                    <button
                        onClick={() => onFilterChange('all')}
                        style={{
                            padding: '4px 12px',
                            borderRadius: 4,
                            border: activeFilter === 'all' ? '1px solid #e5e7eb' : 'none',
                            backgroundColor: activeFilter === 'all' ? 'white' : 'transparent',
                            color: activeFilter === 'all' ? '#1f2937' : '#6b7280',
                            fontWeight: 500,
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            shadow: activeFilter === 'all' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                            transition: 'all 0.1s ease',
                        }}
                    >
                        All
                    </button>
                    <button
                        onClick={() => onFilterChange('unread')}
                        style={{
                            padding: '4px 12px',
                            borderRadius: 4,
                            border: activeFilter === 'unread' ? '1px solid #e5e7eb' : 'none',
                            backgroundColor: activeFilter === 'unread' ? 'white' : 'transparent',
                            color: activeFilter === 'unread' ? '#1f2937' : '#6b7280',
                            fontWeight: 500,
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            shadow: activeFilter === 'unread' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                            transition: 'all 0.1s ease',
                        }}
                    >
                        Unread
                    </button>
                </Flex>

                {/* Optional: Filter Button (kept for functionality but styled minimally) */}
                <div ref={filterRef} style={{ position: 'relative' }}>
                    <button
                        onClick={() => setFiltersOpen(prev => !prev)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                            padding: '6px 10px',
                            borderRadius: 6,
                            color: hasActiveReasonFilters ? '#3b82f6' : '#6b7280',
                            fontSize: '0.8rem',
                            fontWeight: 500,
                            cursor: 'pointer',
                            backgroundColor: hasActiveReasonFilters ? '#eff6ff' : 'transparent',
                            border: '1px solid transparent', // invisible border to keep layout stable
                        }}
                        className="hover:bg-gray-50 hover:text-gray-900"
                    >
                        {hasActiveReasonFilters ? (
                            <Flex align="center" gap="1">
                                <Text>Filters</Text>
                                <span
                                    style={{
                                        backgroundColor: '#3b82f6',
                                        color: 'white',
                                        fontSize: '0.65rem',
                                        fontWeight: 600,
                                        padding: '0 5px',
                                        borderRadius: 10,
                                        minWidth: 16,
                                        textAlign: 'center',
                                        lineHeight: '1rem',
                                    }}
                                >
                                    {activeReasonFilters.length}
                                </span>
                            </Flex>
                        ) : (
                            <Flex align="center" gap="1">
                                <Filter size={14} />
                                <Text>Filters</Text>
                                <ChevronDown size={12} />
                            </Flex>
                        )}
                    </button>

                    {filtersOpen && (
                        <Box
                            style={{
                                position: 'absolute',
                                top: 'calc(100% + 6px)',
                                left: 0,
                                zIndex: 50,
                                minWidth: 200,
                                backgroundColor: 'white',
                                border: '1px solid #e5e7eb',
                                borderRadius: 8,
                                boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                                padding: '6px 0',
                            }}
                        >
                            <Text
                                size="1"
                                weight="medium"
                                style={{
                                    display: 'block',
                                    padding: '6px 14px',
                                    color: '#6b7280',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    fontSize: '0.6rem',
                                }}
                            >
                                Filter by reason
                            </Text>
                            {filterOptions.map(opt => {
                                const isActive = activeReasonFilters.includes(opt.id);
                                return (
                                    <Flex
                                        key={opt.id}
                                        align="center"
                                        gap="2"
                                        onClick={() => toggleReasonFilter(opt.id)}
                                        style={{
                                            padding: '6px 14px',
                                            cursor: 'pointer',
                                            backgroundColor: isActive ? '#f9fafb' : 'transparent',
                                            transition: 'background-color 0.1s ease',
                                        }}
                                        className="hover:bg-gray-50"
                                    >
                                        <Box style={{ color: opt.color, flexShrink: 0 }}>
                                            {opt.icon}
                                        </Box>
                                        <Text
                                            size="1"
                                            style={{
                                                color: isActive ? '#1f2937' : '#4b5563',
                                                flex: 1,
                                                fontSize: '0.8rem',
                                            }}
                                        >
                                            {opt.label}
                                        </Text>
                                        {isActive && (
                                            <Check size={13} style={{ color: '#3b82f6', flexShrink: 0 }} />
                                        )}
                                    </Flex>
                                );
                            })}
                        </Box>
                    )}
                </div>
            </Flex>

            {/* Search Bar - Flex to fill space */}
            <Flex
                align="center"
                style={{
                    flex: 1,
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: 6,
                    padding: '6px 12px',
                    gap: 8,
                    maxWidth: 600, // wider max width
                    margin: '0 16px',
                    transition: 'border-color 0.15s ease',
                }}
                className="focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"
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
                        color: '#1f2937',
                        backgroundColor: 'transparent',
                        width: '100%'
                    }}
                />
            </Flex>

            {/* Right Group: Group By */}
            <Flex
                align="center"
                gap="1"
                style={{
                    padding: '6px 12px',
                    borderRadius: 6,
                    border: '1px solid #e5e7eb',
                    backgroundColor: '#f9fafb', // Light gray background like button/input
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                }}
                className="hover:bg-gray-100 hover:border-gray-300 transition-colors"
            >
                <Text size="1" style={{ color: '#6b7280', marginRight: 4 }}>Group by:</Text>
                <Text size="1" weight="medium" style={{ color: '#1f2937' }}>Date</Text>
                <ChevronDown size={12} style={{ color: '#9ca3af', marginLeft: 4 }} />
            </Flex>
        </Flex>
    );
}
