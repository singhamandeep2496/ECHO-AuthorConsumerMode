import { Link } from 'react-router-dom';
import { Flex, Text, Button, Avatar, Badge, Box } from '@radix-ui/themes';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Sun, Zap, ChevronDown, User, Settings, LogOut } from 'lucide-react';

export function Header() {
    return (
        <Box asChild className="border-b border-gray-200 bg-white sticky top-0 z-50">
            <header>
                <Flex align="center" justify="between" px="5" style={{ height: '56px' }}>
                    {/* Left section - Logo and navigation */}
                    <Flex align="center" gap="6">
                        {/* Logo */}
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <Flex align="center" gap="2">
                                <Flex
                                    align="center"
                                    justify="center"
                                    style={{
                                        width: 28,
                                        height: 28,
                                        backgroundColor: '#f97316',
                                        borderRadius: '6px'
                                    }}
                                >
                                    <Text size="2" weight="bold" style={{ color: 'white' }}>E</Text>
                                </Flex>
                                <Text size="3" weight="medium" style={{ color: '#1f2937' }}>Echo Portal</Text>
                            </Flex>
                        </Link>

                        {/* Navigation links */}
                        <Flex align="center" gap="5">
                            <Link to="/library" style={{ textDecoration: 'none' }}>
                                <Text size="2" style={{ color: '#4b5563' }} className="hover:text-gray-900 transition-colors">
                                    Library
                                </Text>
                            </Link>
                            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                                <Text size="2" style={{ color: '#4b5563' }} className="hover:text-gray-900 transition-colors">
                                    Dashboard
                                </Text>
                            </Link>

                            {/* Create branch with icon */}
                            <Flex align="center" gap="1">
                                <Zap size={14} style={{ color: '#6b7280' }} />
                                <Text size="2" style={{ color: '#4b5563' }}>create branc...</Text>
                            </Flex>

                            {/* Draft tag */}
                            <Badge size="1" variant="soft" color="gray">
                                Draft
                            </Badge>
                        </Flex>
                    </Flex>

                    {/* Right section - User controls */}
                    <Flex align="center" gap="3">
                        {/* Theme toggle (light/dark mode) */}
                        <Button
                            variant="ghost"
                            size="1"
                            style={{ color: '#9ca3af', cursor: 'pointer' }}
                            className="hover:bg-gray-100"
                        >
                            <Sun size={18} />
                        </Button>

                        {/* User profile dropdown (Avatar + Administrator) */}
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger asChild>
                                <button
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        padding: '6px 12px',
                                        border: '1px solid #e5e7eb',
                                        background: 'white',
                                        borderRadius: 6,
                                        cursor: 'pointer',
                                        transition: 'all 0.15s'
                                    }}
                                    className="hover:bg-gray-50 hover:border-gray-300"
                                >
                                    <Avatar
                                        size="1"
                                        fallback="D"
                                        radius="full"
                                        style={{ backgroundColor: '#60a5fa', color: 'white' }}
                                    />
                                    <Text size="1" weight="medium" style={{ color: '#f97316' }}>Administrator</Text>
                                    <ChevronDown size={14} style={{ color: '#9ca3af' }} />
                                </button>
                            </DropdownMenu.Trigger>

                            <DropdownMenu.Portal>
                                <DropdownMenu.Content
                                    style={{
                                        minWidth: 180,
                                        backgroundColor: 'white',
                                        borderRadius: 8,
                                        padding: 6,
                                        boxShadow: '0 10px 38px -10px rgba(22, 23, 24, 0.35), 0 10px 20px -15px rgba(22, 23, 24, 0.2)',
                                        border: '1px solid #e5e7eb',
                                        zIndex: 100
                                    }}
                                    sideOffset={8}
                                    align="end"
                                >
                                    <DropdownMenu.Item
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 10,
                                            padding: '10px 12px',
                                            borderRadius: 4,
                                            fontSize: 14,
                                            color: '#374151',
                                            cursor: 'pointer',
                                            outline: 'none'
                                        }}
                                        className="hover:bg-gray-100"
                                    >
                                        <User size={16} />
                                        Profile Settings
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 10,
                                            padding: '10px 12px',
                                            borderRadius: 4,
                                            fontSize: 14,
                                            color: '#374151',
                                            cursor: 'pointer',
                                            outline: 'none'
                                        }}
                                        className="hover:bg-gray-100"
                                    >
                                        <Settings size={16} />
                                        Account Settings
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Separator
                                        style={{
                                            height: 1,
                                            backgroundColor: '#e5e7eb',
                                            margin: '6px 0'
                                        }}
                                    />
                                    <DropdownMenu.Item
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 10,
                                            padding: '10px 12px',
                                            borderRadius: 4,
                                            fontSize: 14,
                                            color: '#ef4444',
                                            cursor: 'pointer',
                                            outline: 'none'
                                        }}
                                        className="hover:bg-red-50"
                                    >
                                        <LogOut size={16} />
                                        Sign Out
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Portal>
                        </DropdownMenu.Root>

                        {/* Sign out - secondary button */}
                        <Button
                            variant="outline"
                            size="2"
                            style={{
                                color: '#f97316',
                                borderColor: '#f97316',
                                cursor: 'pointer',
                                height: 32
                            }}
                            className="hover:bg-orange-50"
                        >
                            <Text size="2" weight="medium">Sign out</Text>
                        </Button>
                    </Flex>
                </Flex>
            </header>
        </Box>
    );
}
