import { useState } from 'react';
import { Box, Flex, Text } from '@radix-ui/themes';
import { Navbar } from '../components/Navbar/Navbar';
import { NotificationSidebar } from '../components/NotificationSidebar';
import { NotificationFilterBar } from '../components/NotificationFilterBar';
import { NotificationList } from '../components/NotificationList';
import Peep from 'react-peeps';

// Dummy notification data — adapted to GitHub-style
const notificationsData = [
    {
        id: '1',
        type: 'review',
        repo: 'arul-vida/ECHO-PM',
        issueNumber: '#5',
        title: 'Design specs for echo portal derived from system level specs in the PRDs',
        role: 'author',
        avatarInitials: 'AV',
        time: '2 hours ago',
        read: false
    },
    {
        id: '2',
        type: 'feedback',
        repo: 'arul-vida/ECHO-PM',
        issueNumber: '#12',
        title: 'Update color palette documentation for DIRT.E K3 brand guidelines',
        role: 'mentioned',
        avatarInitials: 'SK',
        time: '5 hours ago',
        read: false
    },
    {
        id: '3',
        type: 'approval',
        repo: 'echo-design/HMI-Dashboard',
        issueNumber: '#8',
        title: 'HMI Dashboard layout improvements and responsive breakpoints',
        role: 'author',
        avatarInitials: 'MJ',
        time: '1 day ago',
        read: true
    },
    {
        id: '4',
        type: 'review',
        repo: 'echo-design/CApp-Flows',
        issueNumber: '#3',
        title: 'User flow diagrams for CApp onboarding and registration',
        role: 'review requested',
        avatarInitials: 'MK',
        time: '2 days ago',
        read: true
    },
    {
        id: '5',
        type: 'feedback',
        repo: 'arul-vida/ECHO-PM',
        issueNumber: '#7',
        title: 'Component library audit and accessibility improvements',
        role: 'participating',
        avatarInitials: 'JD',
        time: 'last month',
        read: true
    }
];



const mockUser = {
    id: '1',
    name: 'Dev User'
};

export function ProfilePage() {
    const [activeSection, setActiveSection] = useState('notifications');

    const [activeFilter, setActiveFilter] = useState<'all' | 'unread'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [doneNotifications, setDoneNotifications] = useState<string[]>([]);
    const [activeSidebarItem, setActiveSidebarItem] = useState('inbox');

    const unreadCount = notificationsData.filter(n => !n.read && !doneNotifications.includes(n.id)).length;
    const doneCount = doneNotifications.length;

    // Mark a single notification as done (or undo)
    const markAsDone = (id: string) => {
        setDoneNotifications(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const filteredNotifications = notificationsData.filter(n => {
        // Panel filter: inbox shows non-done, done shows done
        if (activeSidebarItem === 'done') {
            if (!doneNotifications.includes(n.id)) return false;
        } else {
            // inbox (and saved) show non-done
            if (doneNotifications.includes(n.id)) return false;
        }
        const matchesFilter = activeFilter === 'all' || !n.read;
        const matchesSearch = searchQuery === '' ||
            n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            n.repo.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const showEmptyState = filteredNotifications.length === 0;



    // Unique repos from notifications
    const repos = [...new Set(notificationsData.map(n => n.repo))];

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <Navbar
                user={mockUser}
                onLogin={() => console.log('Login clicked')}
                onLogout={() => console.log('Logout clicked')}
                onContribute={() => console.log('Contribute clicked')}
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
                        activeSidebarItem={activeSidebarItem}
                        onSidebarItemChange={setActiveSidebarItem}
                        inboxCount={notificationsData.length - doneCount}
                        doneCount={doneCount}
                        notificationBadge={unreadCount}
                        repositories={repos}
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
                            />

                            <NotificationList
                                notifications={filteredNotifications}
                                doneNotifications={doneNotifications}
                                onMarkAsDone={markAsDone}
                                headerLabel={activeSidebarItem === 'done' ? 'Completed' : 'Inbox'}
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
