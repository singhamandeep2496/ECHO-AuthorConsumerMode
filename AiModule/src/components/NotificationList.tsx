import { useState, useEffect, useRef } from 'react';
import { Box, Flex, Text } from '@radix-ui/themes';
import {
    GitPullRequest,
    GitMerge,
    CircleDot,
    Check,
    BellOff,
    Bookmark,
    ChevronLeft,
    ChevronRight,
    MessageSquare
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
            // Open PR - Green
            return <GitPullRequest size={16} style={{ color: '#22c55e' }} />;
        case 'approval':
            // Merged/Approved PR - Purple
            return <GitMerge size={16} style={{ color: '#a855f7' }} />;
        case 'feedback':
            // Open Issue/Discussion - Green
            return <CircleDot size={16} style={{ color: '#22c55e' }} />;
        default:
            return <MessageSquare size={16} style={{ color: '#6b7280' }} />;
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
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const headerCheckboxRef = useRef<HTMLInputElement>(null);

    // Reset selection when notifications change (e.g. filter change)
    useEffect(() => {
        setSelectedItems([]);
    }, [notifications]);

    // Update indeterminate state of header checkbox
    useEffect(() => {
        if (headerCheckboxRef.current) {
            headerCheckboxRef.current.indeterminate = selectedItems.length > 0 && selectedItems.length < notifications.length;
        }
    }, [selectedItems, notifications]);

    const handleSelectAll = () => {
        if (selectedItems.length === notifications.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(notifications.map(n => n.id));
        }
    };

    const toggleSelection = (id: string) => {
        setSelectedItems(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

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
        <Flex
            direction="column"
            style={{
                flex: 1,
                padding: '0 16px 24px', // Increased bottom padding
                overflow: 'hidden'
            }}
        >
            <Flex
                direction="column"
                style={{
                    // Removed flex: 1 so it hugs content
                    maxHeight: '100%',
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: 6,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {/* Header row with Select All */}
                <Flex
                    align="center"
                    style={{
                        padding: '10px 24px',
                        borderBottom: '1px solid #e5e7eb',
                        backgroundColor: '#f9fafb',
                        gap: 16,
                        flexShrink: 0
                    }}
                >
                    <input
                        ref={headerCheckboxRef}
                        type="checkbox"
                        checked={notifications.length > 0 && selectedItems.length === notifications.length}
                        onChange={handleSelectAll}
                        style={{
                            width: 16,
                            height: 16,
                            accentColor: '#3b82f6',
                            cursor: 'pointer',
                        }}
                    />
                    <Text size="2" weight="medium" style={{ color: '#1f2937' }}>
                        Select all
                    </Text>
                </Flex>

                {/* Scrollable List Container */}
                <Box style={{ flex: 1, overflow: 'auto' }}>
                    {notifications.map((notification) => {
                        const isHovered = hoveredNotification === notification.id;
                        const isDone = doneNotifications.includes(notification.id);
                        const isSelected = selectedItems.includes(notification.id);

                        return (
                            <Flex
                                key={notification.id}
                                align="start"
                                onMouseEnter={() => setHoveredNotification(notification.id)}
                                onMouseLeave={() => setHoveredNotification(null)}
                                style={{
                                    padding: '12px 24px',
                                    borderBottom: '1px solid #f3f4f6',
                                    backgroundColor: isHovered || isSelected ? '#f8fafc' : 'white',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.1s ease',
                                    gap: 16
                                }}
                                className="group"
                            >
                                {/* Checkbox for selection */}
                                <Box style={{ paddingTop: 2 }}>
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => toggleSelection(notification.id)}
                                        onClick={(e) => e.stopPropagation()}
                                        style={{
                                            width: 16,
                                            height: 16,
                                            accentColor: '#3b82f6',
                                            cursor: 'pointer',
                                        }}
                                    />
                                </Box>

                                {/* Type Icon */}
                                <Box style={{ paddingTop: 2 }}>
                                    {getTypeIcon(notification.type)}
                                </Box>

                                {/* Main Content */}
                                <Flex direction="column" style={{ flex: 1, minWidth: 0, gap: 2 }}>
                                    <Text size="1" style={{ color: '#6b7280', fontSize: '0.75rem' }}>
                                        {notification.repo} <span style={{ color: '#9ca3af' }}>{notification.issueNumber}</span>
                                    </Text>
                                    <Text size="2" weight="bold" style={{ color: '#1f2937', lineHeight: '1.25rem' }}>
                                        {notification.title}
                                    </Text>
                                </Flex>

                                {/* Right side: role, avatar, actions/time */}
                                <Flex align="center" gap="4" style={{ flexShrink: 0, height: 40 }}>
                                    {isHovered ? (
                                        /* Hover Actions */
                                        <Flex align="center" gap="2">
                                            <Text size="1" style={{ color: '#9ca3af', marginRight: 8 }}>
                                                {notification.role}
                                            </Text>

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
                                                marginRight: 8
                                            }}>
                                                {notification.avatarInitials}
                                            </Box>

                                            {/* Action Buttons */}
                                            <button
                                                title={isDone ? 'Move to Inbox' : 'Mark as done'}
                                                onClick={(e) => { e.stopPropagation(); onMarkAsDone(notification.id); }}
                                                style={{ color: '#6b7280', padding: 4 }}
                                                className="hover:text-blue-600 hover:bg-blue-50 rounded"
                                            >
                                                <Check size={16} />
                                            </button>
                                            <button
                                                title="Mute thread"
                                                onClick={(e) => e.stopPropagation()}
                                                style={{ color: '#6b7280', padding: 4 }}
                                                className="hover:text-gray-900 hover:bg-gray-100 rounded"
                                            >
                                                <BellOff size={16} />
                                            </button>
                                            <button
                                                title="Save for later"
                                                onClick={(e) => e.stopPropagation()}
                                                style={{ color: '#6b7280', padding: 4 }}
                                                className="hover:text-gray-900 hover:bg-gray-100 rounded"
                                            >
                                                <Bookmark size={16} />
                                            </button>
                                        </Flex>
                                    ) : (
                                        /* Default View: Role, Avatar, Time */
                                        <Flex align="center" gap="3">
                                            <Text size="1" style={{ color: '#9ca3af' }}>
                                                {notification.role}
                                            </Text>
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
                                            }}>
                                                {notification.avatarInitials}
                                            </Box>
                                            <Text size="1" style={{ color: '#6b7280', minWidth: 70, textAlign: 'right' }}>
                                                {notification.time}
                                            </Text>
                                        </Flex>
                                    )}
                                </Flex>
                            </Flex>
                        );
                    })}
                </Box>

                {/* Pagination Footer */}
                <Flex
                    align="center"
                    justify="between"
                    style={{
                        padding: '12px 24px',
                        borderTop: '1px solid #e5e7eb',
                        backgroundColor: 'white',
                        flexShrink: 0
                    }}
                >
                    <Text size="1" style={{ color: '#6b7280' }}>
                        1-5 of {notifications.length}
                    </Text>

                    <Flex gap="2">
                        <button
                            disabled
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 4,
                                padding: '4px 10px',
                                border: '1px solid #e5e7eb',
                                borderRadius: 6,
                                backgroundColor: '#f9fafb',
                                color: '#9ca3af',
                                fontSize: '0.8rem',
                                cursor: 'not-allowed'
                            }}
                        >
                            <ChevronLeft size={14} />
                            Prev
                        </button>
                        <button
                            disabled
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 4,
                                padding: '4px 10px',
                                border: '1px solid #e5e7eb',
                                borderRadius: 6,
                                backgroundColor: '#f9fafb',
                                color: '#9ca3af',
                                fontSize: '0.8rem',
                                cursor: 'not-allowed'
                            }}
                        >
                            Next
                            <ChevronRight size={14} />
                        </button>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}
