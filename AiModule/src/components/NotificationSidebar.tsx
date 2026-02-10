import { Box, Flex, Text } from '@radix-ui/themes';
import { PersonIcon, BellIcon, DashboardIcon } from '@radix-ui/react-icons';
import {
    Inbox,
    BookmarkCheck,
    CheckCircle2,
    User,
    Eye,
    AtSign,
    Users,
    GitPullRequest,
    Plus,
} from 'lucide-react';

export interface FilterItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    color: string;
}

export interface NotificationSidebarProps {
    /** Currently selected top-level section (profile | notifications | dashboard) */
    activeSection: string;
    /** Callback when a top-level section is selected */
    onSectionChange: (id: string) => void;
    /** Currently selected notification sub-panel (inbox | saved | done) */
    activeSidebarItem: string;
    /** Callback when a notification sub-panel is selected */
    onSidebarItemChange: (id: string) => void;
    /** Number of notifications in the inbox */
    inboxCount: number;
    /** Number of done notifications */
    doneCount: number;
    /** Notification badge count (unread) */
    notificationBadge?: number;
    /** List of repository names to display */
    repositories: string[];
    /** Custom filter items to display */
    filterItems?: FilterItem[];
}

const defaultFilterItems: FilterItem[] = [
    { id: 'assigned', label: 'Assigned', icon: <User size={14} />, color: '#f97316' },
    { id: 'participating', label: 'Participating', icon: <Eye size={14} />, color: '#8b5cf6' },
    { id: 'mentioned', label: 'Mentioned', icon: <AtSign size={14} />, color: '#eab308' },
    { id: 'team', label: 'Team mentioned', icon: <Users size={14} />, color: '#8b5cf6' },
    { id: 'review', label: 'Review requested', icon: <GitPullRequest size={14} />, color: '#6b7280' },
];

export function NotificationSidebar({
    activeSection,
    onSectionChange,
    activeSidebarItem,
    onSidebarItemChange,
    inboxCount,
    doneCount,
    notificationBadge,
    repositories,
    filterItems = defaultFilterItems,
}: NotificationSidebarProps) {
    const mainNavItems = [
        { id: 'profile', label: 'Profile', icon: <PersonIcon /> },
        { id: 'notifications', label: 'Notifications', icon: <BellIcon />, badge: notificationBadge },
        { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    ];

    const notifSubItems = [
        { id: 'inbox', label: 'Inbox', icon: <Inbox size={14} />, count: inboxCount },
        { id: 'saved', label: 'Saved', icon: <BookmarkCheck size={14} />, count: 0 },
        { id: 'done', label: 'Done', icon: <CheckCircle2 size={14} />, count: doneCount },
    ];

    return (
        <Flex direction="column" style={{ height: '100%' }}>
            {/* ── Main navigation ── */}
            <Flex direction="column" gap="0">
                {mainNavItems.map(item => {
                    const isActive = activeSection === item.id;
                    return (
                        <a
                            key={item.id}
                            href="#"
                            onClick={(e) => { e.preventDefault(); onSectionChange(item.id); }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '8px',
                                padding: '8px 12px',
                                fontSize: '0.875rem',
                                fontWeight: isActive ? 600 : 400,
                                color: isActive ? '#1f2937' : '#374151',
                                backgroundColor: isActive ? '#f3f4f6' : 'transparent',
                                textDecoration: 'none',
                                borderRadius: 6,
                                cursor: 'pointer',
                                transition: 'background-color 0.15s ease',
                            }}
                            className="hover:bg-gray-100"
                        >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {item.icon}
                                {item.label}
                            </span>
                            {item.badge && item.badge > 0 && (
                                <span
                                    style={{
                                        backgroundColor: '#ef4444',
                                        color: 'white',
                                        fontSize: '0.7rem',
                                        fontWeight: 600,
                                        padding: '2px 6px',
                                        borderRadius: '10px',
                                        minWidth: '18px',
                                        textAlign: 'center'
                                    }}
                                >
                                    {item.badge}
                                </span>
                            )}
                        </a>
                    );
                })}
            </Flex>

            {/* ── Notification sub-sections (only when Notifications is active) ── */}
            {activeSection === 'notifications' && (
                <>
                    {/* Inbox / Saved / Done */}
                    <Box style={{ marginTop: 16, borderTop: '1px solid #e5e7eb', paddingTop: 12 }}>
                        <Text
                            size="1"
                            weight="medium"
                            style={{
                                color: '#6b7280',
                                display: 'block',
                                paddingLeft: 12,
                                marginBottom: 6,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                fontSize: '0.65rem',
                            }}
                        >
                            Inbox
                        </Text>
                        <Flex direction="column" gap="0">
                            {notifSubItems.map(item => {
                                const isActive = activeSidebarItem === item.id;
                                return (
                                    <Flex
                                        key={item.id}
                                        align="center"
                                        gap="2"
                                        onClick={() => onSidebarItemChange(item.id)}
                                        style={{
                                            padding: '6px 12px',
                                            borderRadius: 6,
                                            cursor: 'pointer',
                                            backgroundColor: isActive ? '#f3f4f6' : 'transparent',
                                            fontWeight: isActive ? 500 : 400,
                                            transition: 'background-color 0.15s ease',
                                        }}
                                        className="hover:bg-gray-50"
                                    >
                                        <Box style={{ color: isActive ? '#1f2937' : '#6b7280' }}>
                                            {item.icon}
                                        </Box>
                                        <Text size="1" style={{ color: isActive ? '#1f2937' : '#4b5563', flex: 1 }}>
                                            {item.label}
                                        </Text>
                                        {item.count > 0 && (
                                            <Text size="1" style={{ color: '#9ca3af', fontSize: '0.7rem' }}>
                                                {item.count}
                                            </Text>
                                        )}
                                    </Flex>
                                );
                            })}
                        </Flex>
                    </Box>

                    {/* Filters */}
                    <Box style={{ marginTop: 12, borderTop: '1px solid #e5e7eb', paddingTop: 12 }}>
                        <Text
                            size="1"
                            weight="medium"
                            style={{
                                color: '#6b7280',
                                display: 'block',
                                paddingLeft: 12,
                                marginBottom: 6,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                fontSize: '0.65rem',
                            }}
                        >
                            Filters
                        </Text>
                        <Flex direction="column" gap="0">
                            {filterItems.map(item => (
                                <Flex
                                    key={item.id}
                                    align="center"
                                    gap="2"
                                    style={{
                                        padding: '5px 12px',
                                        borderRadius: 6,
                                        cursor: 'pointer',
                                        fontSize: '0.8rem',
                                        color: '#4b5563',
                                        transition: 'background-color 0.15s ease'
                                    }}
                                    className="hover:bg-gray-50"
                                >
                                    <Box style={{ color: item.color }}>{item.icon}</Box>
                                    <Text size="1">{item.label}</Text>
                                </Flex>
                            ))}
                            <Flex
                                align="center"
                                gap="2"
                                style={{
                                    padding: '5px 12px',
                                    borderRadius: 6,
                                    cursor: 'pointer',
                                    color: '#6b7280',
                                    transition: 'background-color 0.15s ease'
                                }}
                                className="hover:bg-gray-50"
                            >
                                <Plus size={14} />
                                <Text size="1">Add new filter</Text>
                            </Flex>
                        </Flex>
                    </Box>

                    {/* Repositories */}
                    <Box style={{ marginTop: 12, borderTop: '1px solid #e5e7eb', paddingTop: 12 }}>
                        <Text
                            size="1"
                            weight="medium"
                            style={{
                                color: '#6b7280',
                                display: 'block',
                                paddingLeft: 12,
                                marginBottom: 6,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                fontSize: '0.65rem',
                            }}
                        >
                            Repositories
                        </Text>
                        <Flex direction="column" gap="0">
                            {repositories.map(repo => (
                                <Flex
                                    key={repo}
                                    align="center"
                                    style={{
                                        padding: '5px 12px',
                                        borderRadius: 6,
                                        cursor: 'pointer',
                                        fontSize: '0.8rem',
                                        color: '#4b5563',
                                        transition: 'background-color 0.15s ease'
                                    }}
                                    className="hover:bg-gray-50"
                                >
                                    <Text size="1">{repo}</Text>
                                </Flex>
                            ))}
                        </Flex>
                    </Box>
                </>
            )}
        </Flex>
    );
}
