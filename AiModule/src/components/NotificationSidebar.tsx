import { Flex } from '@radix-ui/themes';
import { PersonIcon, BellIcon, DashboardIcon } from '@radix-ui/react-icons';

export interface NotificationSidebarProps {
    /** Currently selected top-level section (profile | notifications | dashboard) */
    activeSection: string;
    /** Callback when a top-level section is selected */
    onSectionChange: (id: string) => void;
    /** Notification badge count (unread) */
    notificationBadge?: number;
}

export function NotificationSidebar({
    activeSection,
    onSectionChange,
    notificationBadge,
}: NotificationSidebarProps) {
    const mainNavItems = [
        { id: 'profile', label: 'Account Settings', icon: <PersonIcon /> },
        { id: 'notifications', label: 'Notifications', icon: <BellIcon />, badge: notificationBadge },
        { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
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
        </Flex>
    );
}
