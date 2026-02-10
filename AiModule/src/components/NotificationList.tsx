import { useState } from 'react';
import { Box, Flex, Text } from '@radix-ui/themes';
import {
    MessageSquare,
    CheckCircle,
    Bell,
    GitPullRequest,
    Check,
    BellOff,
    Bookmark,
    Info
} from 'lucide-react';
import Peep from 'react-peeps';

export interface Notification {
    id: string;
    type: string;
    repo: string;
    issueNumber: string;
    title: string;
    role: string;
    avatarInitials: string;
    time: string;
    read: boolean;
}

export interface NotificationListProps {
    /** Filtered notifications to display */
    notifications: Notification[];
    /** IDs of notifications marked as done */
    doneNotifications: string[];
    /** Callback to toggle done status */
    onMarkAsDone: (id: string) => void;
    /** Label for the header (e.g. 'Inbox' or 'Completed') */
    headerLabel: string;
    /** Whether to show the empty state */
    showEmptyState: boolean;
}

function getTypeIcon(type: string) {
    switch (type) {
        case 'review':
            return <GitPullRequest size={16} style={{ color: '#8b5cf6' }} />;
        case 'feedback':
            return <MessageSquare size={16} style={{ color: '#3b82f6' }} />;
        case 'approval':
            return <CheckCircle size={16} style={{ color: '#22c55e' }} />;
        default:
            return <Bell size={16} style={{ color: '#6b7280' }} />;
    }
}

export function NotificationList({
    notifications,
    doneNotifications,
    onMarkAsDone,
    headerLabel,
    showEmptyState,
}: NotificationListProps) {
    const [hoveredNotification, setHoveredNotification] = useState<string | null>(null);

    if (showEmptyState) {
        return (
            <Flex
                direction="column"
                align="center"
                justify="center"
                style={{ flex: 1, textAlign: 'center', paddingBottom: 60, backgroundColor: 'white' }}
            >
                <Box style={{ marginBottom: 24 }}>
                    <Peep
                        style={{ width: 220, height: 220 }}
                        accessory="None"
                        body="Coffee"
                        face="Calm"
                        hair="BunCurly"
                        facialHair="None"
                        strokeColor="#6366f1"
                        viewBox={{ x: '0', y: '0', width: '1050', height: '1200' }}
                    />
                </Box>
                <Text size="5" weight="bold" style={{ color: '#1f2937', marginBottom: 8 }}>
                    All caught up!
                </Text>
                <Text size="2" style={{ color: '#6b7280', maxWidth: 320 }}>
                    Take a break, write some code, do what you do best.
                </Text>
            </Flex>
        );
    }

    return (
        <Box style={{ flex: 1, overflow: 'auto', backgroundColor: 'white' }}>
            {/* Header row */}
            <Flex
                align="center"
                justify="between"
                style={{
                    padding: '10px 24px',
                    borderBottom: '1px solid #e5e7eb',
                    backgroundColor: '#f9fafb'
                }}
            >
                <Text size="2" weight="medium" style={{ color: '#1f2937' }}>
                    {headerLabel}
                </Text>
                <Text size="1" style={{ color: '#6b7280' }}>
                    {notifications.length} notification{notifications.length !== 1 ? 's' : ''}
                </Text>
            </Flex>

            {/* Notification rows */}
            {notifications.map((notification) => {
                const isHovered = hoveredNotification === notification.id;
                const isDone = doneNotifications.includes(notification.id);

                return (
                    <Flex
                        key={notification.id}
                        align="center"
                        onMouseEnter={() => setHoveredNotification(notification.id)}
                        onMouseLeave={() => setHoveredNotification(null)}
                        style={{
                            padding: '12px 24px',
                            borderBottom: '1px solid #f3f4f6',
                            backgroundColor: isHovered ? '#f8fafc' : 'white',
                            cursor: 'pointer',
                            transition: 'background-color 0.1s ease',
                            gap: 12
                        }}
                    >
                        {/* Checkbox — marks as done */}
                        <input
                            type="checkbox"
                            checked={isDone}
                            onChange={() => onMarkAsDone(notification.id)}
                            onClick={(e) => e.stopPropagation()}
                            title={isDone ? 'Move back to Inbox' : 'Mark as done'}
                            style={{
                                width: 16,
                                height: 16,
                                accentColor: '#22c55e',
                                cursor: 'pointer',
                                flexShrink: 0
                            }}
                        />

                        {/* Unread dot / type icon */}
                        <Box style={{ flexShrink: 0, width: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {!notification.read ? (
                                <Box style={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: '50%',
                                    backgroundColor: '#3b82f6'
                                }} />
                            ) : (
                                getTypeIcon(notification.type)
                            )}
                        </Box>

                        {/* Content */}
                        <Flex direction="column" style={{ flex: 1, minWidth: 0 }}>
                            <Flex align="center" gap="2" style={{ marginBottom: 2 }}>
                                <Text size="2" weight="medium" style={{ color: '#1f2937' }}>
                                    {notification.repo} {notification.issueNumber}
                                </Text>
                            </Flex>
                            <Text size="2" style={{
                                color: '#4b5563',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}>
                                {notification.title}
                            </Text>
                        </Flex>

                        {/* Right side: role, avatar, actions/time */}
                        <Flex align="center" gap="3" style={{ flexShrink: 0 }}>
                            {/* Role label */}
                            <Text size="1" style={{ color: '#9ca3af' }}>
                                {notification.role}
                            </Text>

                            {/* Avatar */}
                            <Box style={{
                                width: 24,
                                height: 24,
                                borderRadius: '50%',
                                backgroundColor: '#e5e7eb',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.6rem',
                                fontWeight: 600,
                                color: '#6b7280',
                                flexShrink: 0
                            }}>
                                {notification.avatarInitials}
                            </Box>

                            {/* Hover actions or time */}
                            {isHovered ? (
                                <Flex align="center" gap="1">
                                    {[
                                        { icon: <Check size={16} />, title: isDone ? 'Move to Inbox' : 'Mark as done', action: () => onMarkAsDone(notification.id) },
                                        { icon: <BellOff size={16} />, title: 'Mute', action: () => { } },
                                        { icon: <Bookmark size={16} />, title: 'Save', action: () => { } },
                                    ].map((actionItem, i) => (
                                        <button
                                            key={i}
                                            title={actionItem.title}
                                            onClick={(e) => { e.stopPropagation(); actionItem.action(); }}
                                            style={{
                                                width: 28,
                                                height: 28,
                                                border: '1px solid #e5e7eb',
                                                borderRadius: 6,
                                                backgroundColor: 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                color: '#6b7280',
                                                transition: 'all 0.1s ease'
                                            }}
                                            className="hover:bg-gray-100"
                                        >
                                            {actionItem.icon}
                                        </button>
                                    ))}
                                </Flex>
                            ) : (
                                <Text size="1" style={{ color: '#9ca3af', minWidth: 70, textAlign: 'right' }}>
                                    {notification.time}
                                </Text>
                            )}
                        </Flex>
                    </Flex>
                );
            })}

            {/* ProTip + pagination footer */}
            <Flex
                align="center"
                justify="between"
                style={{
                    padding: '10px 24px',
                    borderTop: '1px solid #e5e7eb',
                    backgroundColor: '#f9fafb'
                }}
            >
                <Flex align="center" gap="2">
                    <Info size={14} style={{ color: '#6b7280' }} />
                    <Text size="1" style={{ color: '#6b7280' }}>
                        <strong>ProTip!</strong> When viewing a notification, press <code style={{
                            padding: '1px 5px',
                            backgroundColor: '#e5e7eb',
                            borderRadius: 4,
                            fontSize: '0.7rem',
                            border: '1px solid #d1d5db'
                        }}>shift u</code> to mark it as Unread.
                    </Text>
                </Flex>
                <Flex align="center" gap="2">
                    <Text size="1" style={{ color: '#6b7280' }}>
                        1-{notifications.length} of {notifications.length}
                    </Text>
                    <Flex gap="1">
                        <button style={{
                            padding: '3px 10px',
                            border: '1px solid #e5e7eb',
                            borderRadius: 6,
                            backgroundColor: 'white',
                            color: '#9ca3af',
                            fontSize: '0.75rem',
                            cursor: 'not-allowed'
                        }}>
                            Prev
                        </button>
                        <button style={{
                            padding: '3px 10px',
                            border: '1px solid #e5e7eb',
                            borderRadius: 6,
                            backgroundColor: 'white',
                            color: '#9ca3af',
                            fontSize: '0.75rem',
                            cursor: 'not-allowed'
                        }}>
                            Next
                        </button>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
}
