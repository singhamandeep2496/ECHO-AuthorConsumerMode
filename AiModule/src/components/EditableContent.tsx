import { Box, Text, Heading, ScrollArea } from '@radix-ui/themes';
import { useEdit } from '../context/EditContext';

export function EditableContent() {
    const { contentData, updateContent } = useEdit();

    // Combine all content into a single markdown string for editing
    const fullContent = `# INTRO

${contentData.intro}

# CHALLENGE

${contentData.challenge}

# OUR APPROACH

${contentData.approach}

# METHOD1

${contentData.method}`;

    const handleContentChange = (value: string) => {
        // For now, store the full markdown content
        // In a more complete implementation, you'd parse this back into sections
        updateContent({
            intro: value // Simplified - stores full content in intro field
        });
    };

    return (
        <ScrollArea style={{ flex: 1, height: '100%', backgroundColor: 'white' }}>
            <Box p="6" style={{ maxWidth: 720, margin: '0 auto' }}>
                {/* Category Label - Editable */}
                <input
                    type="text"
                    defaultValue="Case Study"
                    style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#f97316',
                        border: 'none',
                        background: 'transparent',
                        outline: 'none',
                        width: '100%',
                        marginBottom: 8
                    }}
                    className="focus:bg-orange-50 focus:px-2 rounded transition-all"
                />

                {/* Title - Editable */}
                <input
                    type="text"
                    value={contentData.title}
                    onChange={(e) => updateContent({ title: e.target.value })}
                    style={{
                        fontSize: 32,
                        fontWeight: 700,
                        color: '#1f2937',
                        border: 'none',
                        background: 'transparent',
                        outline: 'none',
                        width: '100%',
                        lineHeight: 1.2,
                        marginBottom: 12
                    }}
                    className="focus:bg-gray-50 focus:px-2 rounded transition-all"
                />

                {/* Subtitle - Editable */}
                <input
                    type="text"
                    value={contentData.subtitle}
                    onChange={(e) => updateContent({ subtitle: e.target.value })}
                    style={{
                        fontSize: 16,
                        color: '#6b7280',
                        border: 'none',
                        background: 'transparent',
                        outline: 'none',
                        width: '100%',
                        lineHeight: 1.6,
                        marginBottom: 24
                    }}
                    className="focus:bg-gray-50 focus:px-2 rounded transition-all"
                />

                {/* Main Content - Single large markdown textarea */}
                <textarea
                    defaultValue={fullContent}
                    onChange={(e) => handleContentChange(e.target.value)}
                    placeholder="Enter your content using Markdown..."
                    style={{
                        width: '100%',
                        minHeight: 500,
                        padding: 16,
                        border: '1px solid #e5e7eb',
                        borderRadius: 8,
                        fontSize: 14,
                        lineHeight: 1.8,
                        fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
                        resize: 'vertical',
                        outline: 'none',
                        backgroundColor: '#fafafa'
                    }}
                    className="focus:border-orange-500 focus:bg-white transition-all"
                />

                <Text size="1" style={{ color: '#9ca3af', marginTop: 8, display: 'block' }}>
                    Supports Markdown formatting. Use # for headings, ** for bold, * for italic.
                </Text>
            </Box>
        </ScrollArea>
    );
}
