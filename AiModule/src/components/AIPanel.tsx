import { useState } from 'react';
import { Box, Flex, Text, Button, ScrollArea } from '@radix-ui/themes';
import { ThumbsUp, ThumbsDown, Send, Plus, RefreshCw, MoreHorizontal, ChevronDown, Mic } from 'lucide-react';

export function AIPanel() {
    const [inputValue, setInputValue] = useState('');

    return (
        <Box
            style={{
                width: 320,
                borderLeft: '1px solid #e5e7eb',
                backgroundColor: '#fafafa',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                animation: 'fadeIn 0.3s ease-out forwards'
            }}
        >
            {/* Header */}
            <Box
                style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #e5e7eb',
                    backgroundColor: 'white'
                }}
            >
                <Flex align="center" justify="between">
                    <Text size="2" weight="medium" style={{ color: '#1f2937' }}>
                        AI Assistant
                    </Text>
                    <Flex gap="2">
                        <Button
                            variant="ghost"
                            size="1"
                            style={{ color: '#6b7280', cursor: 'pointer', padding: 4 }}
                            className="hover:bg-gray-100"
                        >
                            <Plus size={14} />
                        </Button>
                        <Button
                            variant="ghost"
                            size="1"
                            style={{ color: '#6b7280', cursor: 'pointer', padding: 4 }}
                            className="hover:bg-gray-100"
                        >
                            <RefreshCw size={14} />
                        </Button>
                        <Button
                            variant="ghost"
                            size="1"
                            style={{ color: '#6b7280', cursor: 'pointer', padding: 4 }}
                            className="hover:bg-gray-100"
                        >
                            <MoreHorizontal size={14} />
                        </Button>
                    </Flex>
                </Flex>
            </Box>

            {/* Chat Messages Area */}
            <ScrollArea style={{ flex: 1 }}>
                <Box p="4">
                    {/* Message Card */}
                    <Box
                        style={{
                            backgroundColor: 'white',
                            borderRadius: 8,
                            padding: 16,
                            border: '1px solid #e5e7eb'
                        }}
                    >
                        <Text
                            size="2"
                            style={{
                                color: '#374151',
                                lineHeight: 1.6,
                                display: 'block'
                            }}
                        >
                            I've created the AI Panel for edit mode! Here's what was added:
                        </Text>

                        <Text size="2" weight="medium" style={{ color: '#1f2937', display: 'block', marginTop: 12 }}>
                            AI Panel Features:
                        </Text>

                        <ul style={{ margin: '8px 0', paddingLeft: 20 }}>
                            <li style={{ color: '#4b5563', fontSize: 13, lineHeight: 1.6 }}>
                                <strong style={{ color: '#1f2937' }}>Header</strong> with assistant title
                            </li>
                            <li style={{ color: '#4b5563', fontSize: 13, lineHeight: 1.6 }}>
                                <strong style={{ color: '#1f2937' }}>Chat messages area</strong> with formatted responses
                            </li>
                            <li style={{ color: '#4b5563', fontSize: 13, lineHeight: 1.6 }}>
                                <strong style={{ color: '#1f2937' }}>Good/Bad feedback buttons</strong> at the bottom
                            </li>
                            <li style={{ color: '#4b5563', fontSize: 13, lineHeight: 1.6 }}>
                                <strong style={{ color: '#1f2937' }}>Input area</strong> with text field and send button
                            </li>
                        </ul>

                        <Text size="2" weight="medium" style={{ color: '#1f2937', display: 'block', marginTop: 12 }}>
                            Layout Updates:
                        </Text>

                        <ul style={{ margin: '8px 0', paddingLeft: 20 }}>
                            <li style={{ color: '#4b5563', fontSize: 13, lineHeight: 1.6 }}>
                                Both RightSidebar and AIPanel are now <strong style={{ color: '#1f2937' }}>320px</strong> wide
                            </li>
                            <li style={{ color: '#4b5563', fontSize: 13, lineHeight: 1.6 }}>
                                This ensures <strong style={{ color: '#1f2937' }}>no content shift</strong> when transitioning
                            </li>
                            <li style={{ color: '#4b5563', fontSize: 13, lineHeight: 1.6 }}>
                                AI Panel has a subtle fade-in animation
                            </li>
                        </ul>
                    </Box>

                    {/* Feedback Buttons */}
                    <Flex justify="end" gap="3" mt="3">
                        <Flex
                            align="center"
                            gap="1"
                            style={{ cursor: 'pointer' }}
                            className="hover:opacity-70"
                        >
                            <Text size="1" style={{ color: '#6b7280' }}>Good</Text>
                            <ThumbsUp size={12} style={{ color: '#6b7280' }} />
                        </Flex>
                        <Flex
                            align="center"
                            gap="1"
                            style={{ cursor: 'pointer' }}
                            className="hover:opacity-70"
                        >
                            <Text size="1" style={{ color: '#6b7280' }}>Bad</Text>
                            <ThumbsDown size={12} style={{ color: '#6b7280' }} />
                        </Flex>
                    </Flex>
                </Box>
            </ScrollArea>

            {/* Input Area */}
            <Box
                style={{
                    padding: 12,
                    borderTop: '1px solid #e5e7eb',
                    backgroundColor: 'white'
                }}
            >
                <Flex
                    style={{
                        border: '1px solid #e5e7eb',
                        borderRadius: 8,
                        backgroundColor: '#fafafa',
                        padding: '10px 12px'
                    }}
                    align="center"
                    gap="2"
                >
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask AI something..."
                        style={{
                            flex: 1,
                            border: 'none',
                            background: 'transparent',
                            outline: 'none',
                            fontSize: 13,
                            color: '#374151'
                        }}
                    />
                    <Button
                        variant="ghost"
                        size="1"
                        style={{ color: '#6b7280', cursor: 'pointer', padding: 4 }}
                        className="hover:bg-gray-200"
                    >
                        <Mic size={14} />
                    </Button>
                    <Button
                        size="1"
                        style={{
                            backgroundColor: '#f97316',
                            color: 'white',
                            cursor: 'pointer',
                            padding: '6px 10px',
                            borderRadius: 6
                        }}
                        className="hover:bg-orange-600"
                    >
                        <Send size={14} />
                    </Button>
                </Flex>

                {/* Mode Selector - simplified */}
                <Flex align="center" gap="2" mt="2">
                    <Button
                        variant="ghost"
                        size="1"
                        style={{ color: '#6b7280', padding: 4 }}
                        className="hover:bg-gray-100"
                        title="Add images and media"
                    >
                        <Plus size={12} />
                    </Button>
                    <Flex
                        align="center"
                        gap="1"
                        style={{
                            backgroundColor: '#f3f4f6',
                            padding: '4px 8px',
                            borderRadius: 4,
                            cursor: 'pointer'
                        }}
                        className="hover:bg-gray-200"
                    >
                        <ChevronDown size={10} style={{ color: '#6b7280' }} />
                        <Text size="1" style={{ color: '#6b7280' }}>Planning</Text>
                    </Flex>
                </Flex>
            </Box>
        </Box>
    );
}
