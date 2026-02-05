import { Link } from 'react-router-dom';
import { Box, Flex, Text, Avatar, Badge, Separator } from '@radix-ui/themes';

interface TableOfContentsItem {
    id: string;
    label: string;
}

const tocItems: TableOfContentsItem[] = [
    { id: 'intro', label: 'INTRO' },
    { id: 'challenge', label: 'CHALLENGE' },
    { id: 'our-approach', label: 'OUR APPROACH' },
    { id: 'method1', label: 'METHOD1' },
];

export function RightSidebar() {
    return (
        <Box
            asChild
            style={{
                width: 320,
                borderLeft: '1px solid #e5e7eb',
                backgroundColor: 'white',
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                overflowY: 'auto'
            }}
        >
            <aside>
                {/* Author Section */}
                <Box>
                    <Text size="1" weight="medium" style={{ color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Author
                    </Text>
                    <Flex align="center" gap="2" mt="2">
                        <Avatar
                            size="2"
                            fallback="D"
                            radius="full"
                            style={{ backgroundColor: '#60a5fa', color: 'white' }}
                        />
                        <Text size="2" style={{ color: '#374151' }}>Dev User</Text>
                    </Flex>
                </Box>

                <Separator size="4" style={{ backgroundColor: '#e5e7eb', marginLeft: -16, marginRight: -16, width: 'calc(100% + 32px)' }} />

                {/* Details Section */}
                <Box>
                    <Text size="1" weight="medium" style={{ color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Details
                    </Text>
                    <Box mt="2">
                        <Link to="#" style={{ textDecoration: 'none' }}>
                            <Flex align="center" gap="1">
                                <Text size="2" style={{ color: '#f97316' }}>✦</Text>
                                <Text size="2" style={{ color: '#f97316' }}>Case Study</Text>
                            </Flex>
                        </Link>
                    </Box>
                </Box>

                <Separator size="4" style={{ backgroundColor: '#e5e7eb', marginLeft: -16, marginRight: -16, width: 'calc(100% + 32px)' }} />

                {/* Tags Section */}
                <Box>
                    <Text size="1" weight="medium" style={{ color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Tags
                    </Text>
                    <Box mt="2">
                        <Badge color="amber" variant="soft" size="1">
                            High
                        </Badge>
                    </Box>
                </Box>

                <Separator size="4" style={{ backgroundColor: '#e5e7eb', marginLeft: -16, marginRight: -16, width: 'calc(100% + 32px)' }} />

                {/* On This Page Section */}
                <Box>
                    <Text size="1" weight="medium" style={{ color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        On This Page
                    </Text>
                    <Flex direction="column" gap="1" mt="2">
                        {tocItems.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                style={{
                                    textDecoration: 'none',
                                    paddingLeft: 8,
                                    borderLeft: '2px solid transparent',
                                    transition: 'all 0.15s'
                                }}
                                className="hover:border-l-orange-500 hover:text-orange-500"
                            >
                                <Text size="2" style={{ color: '#6b7280' }} className="hover:text-orange-500">
                                    {item.label}
                                </Text>
                            </a>
                        ))}
                    </Flex>
                </Box>
            </aside>
        </Box>
    );
}
