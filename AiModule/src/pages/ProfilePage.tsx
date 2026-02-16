import { useState } from 'react';
import { Box, Flex, Text } from '@radix-ui/themes';
import { Navbar } from '../components/Navbar/Navbar';
import { NotificationSidebar } from '../components/NotificationSidebar';
import { NotificationFilterBar } from '../components/NotificationFilterBar';
import { NotificationList } from '../components/NotificationList';
import Peep from 'react-peeps';

// Dummy notification data — adapted to GitHub-style
import { notificationsData } from '../data/mockNotifications';



const mockUser = {
    id: '1',
    name: 'Dev User'
};

export function ProfilePage() {
    const [activeSection, setActiveSection] = useState('notifications');

    const [activeFilter, setActiveFilter] = useState<'all' | 'unread'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeReasonFilters, setActiveReasonFilters] = useState<string[]>([]);
    const [doneNotifications, setDoneNotifications] = useState<string[]>([]);
    // const [activeSidebarItem, setActiveSidebarItem] = useState('inbox');

    const unreadCount = notificationsData.filter(n => !n.read && !doneNotifications.includes(n.id)).length;
    // const doneCount = doneNotifications.length;

    // Mark a single notification as done (or undo)
    const markAsDone = (id: string) => {
        setDoneNotifications(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const filteredNotifications = notificationsData.filter(n => {
        // Always show non-done notifications (Inbox behavior)
        if (doneNotifications.includes(n.id)) return false;

        const matchesFilter = activeFilter === 'all' || !n.read;
        const matchesSearch = searchQuery === '' ||
            n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            n.repo.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesReason = activeReasonFilters.length === 0 || activeReasonFilters.some(filter => {
            if (filter === 'assigned') return n.role === 'author'; // Mapping 'author' to 'assigned' for demo
            if (filter === 'participating') return n.role === 'participating';
            if (filter === 'mentioned') return n.role === 'mentioned';
            if (filter === 'team') return n.role === 'team mentioned';
            if (filter === 'review') return n.role === 'review requested';
            return false;
        });

        return matchesFilter && matchesSearch && matchesReason;
    });

    const showEmptyState = filteredNotifications.length === 0;



    // Unique repos from notifications
    // const repos = [...new Set(notificationsData.map(n => n.repo))];

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <Navbar
                user={mockUser}
                onLogin={() => console.log('Login clicked')}
                onLogout={() => console.log('Logout clicked')}
                showNotificationDot={activeSection !== 'notifications'}
            />
            <Flex style={{ flex: 1, backgroundColor: '#fafafa', overflow: 'hidden' }}>
                {/* Left Sidebar */}
                <Box
                    style={{
                        width: 240,
                        backgroundColor: 'white',
                        borderRight: '1px solid #e5e7eb',
                        padding: '16px 12px',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <NotificationSidebar
                        activeSection={activeSection}
                        onSectionChange={setActiveSection}
                        notificationBadge={unreadCount}
                    />
                </Box>

                {/* Main Content */}
                <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    {activeSection === 'notifications' && (
                        <Flex direction="column" style={{ flex: 1, overflow: 'hidden' }}>
                            <NotificationFilterBar
                                activeFilter={activeFilter}
                                onFilterChange={setActiveFilter}
                                searchQuery={searchQuery}
                                onSearchChange={setSearchQuery}
                                activeReasonFilters={activeReasonFilters}
                                onReasonFiltersChange={setActiveReasonFilters}
                            />

                            <NotificationList
                                notifications={filteredNotifications}
                                doneNotifications={doneNotifications}
                                onMarkAsDone={markAsDone}
                                headerLabel="Inbox"
                                showEmptyState={showEmptyState}
                            />
                        </Flex>
                    )}

                    {activeSection === 'profile' && (
                        <Flex
                            direction="column"
                            align="center"
                            justify="center"
                            style={{ flex: 1, textAlign: 'center', paddingBottom: 60, backgroundColor: 'white' }}
                        >
                            <Box style={{ marginBottom: 24 }}>
                                <Peep
                                    style={{ width: 200, height: 200 }}
                                    accessory="GlassRoundThick"
                                    body="Shirt"
                                    face="Cute"
                                    hair="ShortVolumed"
                                    facialHair="None"
                                    strokeColor="#f97316"
                                    viewBox={{ x: '0', y: '0', width: '1050', height: '1200' }}
                                />
                            </Box>
                            <Text size="5" weight="bold" style={{ color: '#1f2937', marginBottom: 8 }}>
                                Profile
                            </Text>
                            <Text size="2" style={{ color: '#6b7280' }}>
                                Profile settings coming soon...
                            </Text>
                        </Flex>
                    )}

                    {activeSection === 'dashboard' && (
                        <Flex
                            direction="column"
                            align="center"
                            justify="center"
                            style={{ flex: 1, textAlign: 'center', paddingBottom: 60, backgroundColor: 'white' }}
                        >
                            <Box style={{ marginBottom: 24 }}>
                                <Peep
                                    style={{ width: 200, height: 200 }}
                                    accessory="None"
                                    body="DotJacket"
                                    face="Driven"
                                    hair="Turban"
                                    facialHair="None"
                                    strokeColor="#22c55e"
                                    viewBox={{ x: '0', y: '0', width: '1050', height: '1200' }}
                                />
                            </Box>
                            <Text size="5" weight="bold" style={{ color: '#1f2937', marginBottom: 8 }}>
                                Dashboard
                            </Text>
                            <Text size="2" style={{ color: '#6b7280' }}>
                                User dashboard coming soon...
                            </Text>
                        </Flex>
                    )}
                </Box>
            </Flex>
        </div >
    );
}
