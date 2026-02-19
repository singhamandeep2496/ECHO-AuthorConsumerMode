import { useState } from 'react';
import { Box, Flex, Text, Switch, Avatar } from '@radix-ui/themes';
import { Globe, Palette, Bell, MessageSquare, ShieldCheck, CheckCircle, Rocket, Send } from 'lucide-react';

const mockUserData = {
    name: 'Dev User',
    email: 'dev.user@echo.io',
    username: 'devuser',
    role: 'Full-Stack Developer',
    department: 'Engineering',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
};

// Reusable label-value row for info display
function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <Box style={{ minWidth: 0 }}>
            <Text
                style={{
                    fontSize: '0.775rem',
                    color: '#9ca3af',
                    display: 'block',
                    marginBottom: 4,
                    letterSpacing: '0.01em',
                }}
            >
                {label}
            </Text>
            <Text
                style={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#1f2937',
                    display: 'block',
                    wordBreak: 'break-word',
                }}
            >
                {value}
            </Text>
        </Box>
    );
}

export function AccountSettings() {
    // Review & Collaboration notification settings
    const [newComments, setNewComments] = useState(true);
    const [reviewFeedback, setReviewFeedback] = useState(true);
    const [reviewApproved, setReviewApproved] = useState(true);

    // Branch Status notification settings
    const [branchPublished, setBranchPublished] = useState(true);
    const [submissionConfirmation, setSubmissionConfirmation] = useState(false);

    // General settings
    const [language, setLanguage] = useState('en');
    const [theme, setTheme] = useState('system');

    const getInitials = (n: string) =>
        n.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2);

    // Shared styles
    const cardStyle: React.CSSProperties = {
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        padding: '16px 20px',
    };

    const cardHeaderStyle: React.CSSProperties = {
        fontSize: '1rem',
        fontWeight: 600,
        color: '#1f2937',
    };

    const selectStyle: React.CSSProperties = {
        padding: '8px 32px 8px 12px',
        fontSize: '0.875rem',
        border: '1px solid #d1d5db',
        borderRadius: 6,
        backgroundColor: 'white',
        color: '#1f2937',
        outline: 'none',
        cursor: 'pointer',
        appearance: 'none' as const,
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
        backgroundPosition: 'right 8px center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '20px',
        transition: 'border-color 0.15s ease',
    };

    const dividerStyle: React.CSSProperties = {
        height: 1,
        backgroundColor: '#f3f4f6',
        margin: '8px 0',
    };

    return (
        <Box
            style={{
                flex: 1,
                overflowY: 'auto',
                padding: '12px 16px 16px',
                backgroundColor: '#fafafa',
            }}
        >
            <Flex direction="column" gap="2">

                {/* ══════════════════════════════════════════
                    PROFILE HEADER CARD
                   ══════════════════════════════════════════ */}
                <Box style={{ ...cardStyle, padding: '20px 24px' }}>
                    <Flex gap="5" style={{ flexWrap: 'wrap' }}>
                        {/* Left: Avatar + Name + Role + Department */}
                        <Flex align="center" gap="4" style={{ minWidth: 240 }}>
                            <Avatar
                                size="6"
                                fallback={getInitials(mockUserData.name)}
                                radius="full"
                                style={{
                                    backgroundColor: 'var(--color-accent)',
                                    color: 'white',
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                }}
                            />
                            <Box>
                                <Text style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1f2937', display: 'block' }}>
                                    {mockUserData.name}
                                </Text>
                                <Text style={{ fontSize: '0.825rem', fontWeight: 500, color: 'var(--color-accent)', display: 'block', marginTop: 4 }}>
                                    {mockUserData.role}
                                </Text>
                                <Text style={{ fontSize: '0.8rem', color: '#6b7280', display: 'block', marginTop: 2 }}>
                                    {mockUserData.department}
                                </Text>
                            </Box>
                        </Flex>

                        {/* Right: Key info grid */}
                        <Box
                            style={{
                                flex: 1,
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '10px 40px',
                                minWidth: 300,
                                paddingLeft: 20,
                                borderLeft: '1px solid #f3f4f6',
                            }}
                        >
                            <InfoRow label="Username" value={`@${mockUserData.username}`} />
                            <InfoRow label="Phone number" value={mockUserData.phone} />
                            <InfoRow label="Email" value={mockUserData.email} />
                            <InfoRow label="Team/ Dept" value={mockUserData.department} />
                        </Box>
                    </Flex>
                </Box>

                {/* ══════════════════════════════════════════
                    TWO-COLUMN CARDS
                   ══════════════════════════════════════════ */}
                <Flex gap="3" style={{ flexWrap: 'wrap' }}>

                    {/* ── Notification Preferences (left) ── */}
                    <Box style={{ ...cardStyle, flex: 1, minWidth: 340 }}>
                        <Flex align="center" gap="2" style={{ marginBottom: 4 }}>
                            <Box style={{ color: '#6b7280' }}><Bell size={18} /></Box>
                            <Text style={cardHeaderStyle}>Notification Preferences</Text>
                        </Flex>

                        <div style={dividerStyle} />

                        {/* ── Review & Collaboration Settings ── */}
                        <Text style={{ fontSize: '0.75rem', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
                            Review & Collaboration
                        </Text>
                        <Text style={{ fontSize: '0.7rem', color: '#9ca3af', display: 'block', marginBottom: 12 }}>
                            Notifications for incoming actions from other users on your branch.
                        </Text>

                        <Flex direction="column" gap="2">
                            {/* New Comments */}
                            <Flex align="center" justify="between" style={{ padding: '4px 0' }}>
                                <Flex align="center" gap="3">
                                    <Box
                                        style={{
                                            width: 36, height: 36, borderRadius: 8,
                                            backgroundColor: '#eff6ff',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: '#3b82f6',
                                        }}
                                    >
                                        <MessageSquare size={16} />
                                    </Box>
                                    <Box>
                                        <Text style={{ fontSize: '0.875rem', fontWeight: 500, color: '#1f2937' }}>
                                            New Comments
                                        </Text>
                                        <Text style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block', marginTop: 2 }}>
                                            When someone leaves a comment on my branch
                                        </Text>
                                    </Box>
                                </Flex>
                                <Switch checked={newComments} onCheckedChange={setNewComments} className="cursor-pointer" />
                            </Flex>

                            <div style={{ height: 1, backgroundColor: '#f3f4f6' }} />

                            {/* Review Feedback / Changes Requested */}
                            <Flex align="center" justify="between" style={{ padding: '4px 0' }}>
                                <Flex align="center" gap="3">
                                    <Box
                                        style={{
                                            width: 36, height: 36, borderRadius: 8,
                                            backgroundColor: '#fff7ed',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: '#f97316',
                                        }}
                                    >
                                        <ShieldCheck size={16} />
                                    </Box>
                                    <Box>
                                        <Text style={{ fontSize: '0.875rem', fontWeight: 500, color: '#1f2937' }}>
                                            Review Feedback
                                        </Text>
                                        <Text style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block', marginTop: 2 }}>
                                            When a reviewer submits feedback or requests changes
                                        </Text>
                                    </Box>
                                </Flex>
                                <Switch checked={reviewFeedback} onCheckedChange={setReviewFeedback} className="cursor-pointer" />
                            </Flex>

                            <div style={{ height: 1, backgroundColor: '#f3f4f6' }} />

                            {/* Review Approved */}
                            <Flex align="center" justify="between" style={{ padding: '4px 0' }}>
                                <Flex align="center" gap="3">
                                    <Box
                                        style={{
                                            width: 36, height: 36, borderRadius: 8,
                                            backgroundColor: '#f0fdf4',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: '#22c55e',
                                        }}
                                    >
                                        <CheckCircle size={16} />
                                    </Box>
                                    <Box>
                                        <Text style={{ fontSize: '0.875rem', fontWeight: 500, color: '#1f2937' }}>
                                            Review Approved
                                        </Text>
                                        <Text style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block', marginTop: 2 }}>
                                            When a reviewer approves my branch
                                        </Text>
                                    </Box>
                                </Flex>
                                <Switch checked={reviewApproved} onCheckedChange={setReviewApproved} className="cursor-pointer" />
                            </Flex>

                            <div style={{ height: 1, backgroundColor: '#f3f4f6' }} />

                            {/* Submission Confirmation (Review Request) */}
                            <Flex align="center" justify="between" style={{ padding: '4px 0' }}>
                                <Flex align="center" gap="3">
                                    <Box
                                        style={{
                                            width: 36, height: 36, borderRadius: 8,
                                            backgroundColor: '#f0f9ff',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: '#0ea5e9',
                                        }}
                                    >
                                        <Send size={16} />
                                    </Box>
                                    <Box>
                                        <Text style={{ fontSize: '0.875rem', fontWeight: 500, color: '#1f2937' }}>
                                            Review Requested
                                        </Text>
                                        <Text style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block', marginTop: 2 }}>
                                            When someone adds me as a reviewer on their branch
                                        </Text>
                                    </Box>
                                </Flex>
                                <Switch checked={submissionConfirmation} onCheckedChange={setSubmissionConfirmation} className="cursor-pointer" />
                            </Flex>
                        </Flex>

                        {/* Spacer between groups */}
                        <div style={{ height: 1, backgroundColor: '#e5e7eb', margin: '12px 0' }} />

                        {/* ── Branch Status Settings ── */}
                        <Text style={{ fontSize: '0.75rem', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
                            Branch Status
                        </Text>
                        <Text style={{ fontSize: '0.7rem', color: '#9ca3af', display: 'block', marginBottom: 12 }}>
                            Notifications regarding the lifecycle and status of your branch.
                        </Text>

                        <Flex direction="column" gap="2">
                            {/* Branch Published */}
                            <Flex align="center" justify="between" style={{ padding: '4px 0' }}>
                                <Flex align="center" gap="3">
                                    <Box
                                        style={{
                                            width: 36, height: 36, borderRadius: 8,
                                            backgroundColor: '#fdf4ff',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: '#a855f7',
                                        }}
                                    >
                                        <Rocket size={16} />
                                    </Box>
                                    <Box>
                                        <Text style={{ fontSize: '0.875rem', fontWeight: 500, color: '#1f2937' }}>
                                            Branch Published
                                        </Text>
                                        <Text style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block', marginTop: 2 }}>
                                            When my branch is successfully published and live
                                        </Text>
                                    </Box>
                                </Flex>
                                <Switch checked={branchPublished} onCheckedChange={setBranchPublished} className="cursor-pointer" />
                            </Flex>
                        </Flex>
                    </Box>

                    {/* ── General Account Settings (right) ── */}
                    <Box style={{ ...cardStyle, flex: 1, minWidth: 340 }}>
                        <Flex align="center" gap="2" style={{ marginBottom: 4 }}>
                            <Box style={{ color: '#6b7280' }}><Globe size={18} /></Box>
                            <Text style={cardHeaderStyle}>General Account Settings</Text>
                        </Flex>

                        <div style={dividerStyle} />

                        <Flex direction="column" gap="3">
                            {/* Language */}
                            <Flex align="center" justify="between" style={{ padding: '4px 0' }}>
                                <Flex align="center" gap="3">
                                    <Box
                                        style={{
                                            width: 36, height: 36, borderRadius: 8,
                                            backgroundColor: '#fff7ed',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: '#f97316',
                                        }}
                                    >
                                        <Globe size={16} />
                                    </Box>
                                    <Box>
                                        <Text style={{ fontSize: '0.875rem', fontWeight: 500, color: '#1f2937' }}>
                                            Language
                                        </Text>
                                        <Text style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block', marginTop: 2 }}>
                                            Display language for the interface
                                        </Text>
                                    </Box>
                                </Flex>
                                <select
                                    value={language}
                                    onChange={e => setLanguage(e.target.value)}
                                    style={selectStyle}
                                >
                                    <option value="en">English</option>
                                    <option value="es">Español</option>
                                    <option value="fr">Français</option>
                                    <option value="de">Deutsch</option>
                                    <option value="ja">日本語</option>
                                </select>
                            </Flex>

                            <div style={{ height: 1, backgroundColor: '#f3f4f6' }} />

                            {/* Theme */}
                            <Flex align="center" justify="between" style={{ padding: '4px 0' }}>
                                <Flex align="center" gap="3">
                                    <Box
                                        style={{
                                            width: 36, height: 36, borderRadius: 8,
                                            backgroundColor: '#f5f3ff',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: '#7c3aed',
                                        }}
                                    >
                                        <Palette size={16} />
                                    </Box>
                                    <Box>
                                        <Text style={{ fontSize: '0.875rem', fontWeight: 500, color: '#1f2937' }}>
                                            Theme
                                        </Text>
                                        <Text style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block', marginTop: 2 }}>
                                            Choose your preferred appearance
                                        </Text>
                                    </Box>
                                </Flex>
                                <select
                                    value={theme}
                                    onChange={e => setTheme(e.target.value)}
                                    style={selectStyle}
                                >
                                    <option value="light">Light</option>
                                    <option value="dark">Dark</option>
                                    <option value="system">System</option>
                                </select>
                            </Flex>


                        </Flex>
                    </Box>
                </Flex>


            </Flex>
        </Box>
    );
}
