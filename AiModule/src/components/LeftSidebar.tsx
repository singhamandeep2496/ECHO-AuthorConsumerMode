import { useState, useMemo } from 'react';
import { Box, Flex, Text, TextField, Button, Badge, ScrollArea } from '@radix-ui/themes';
import * as Tabs from '@radix-ui/react-tabs';
import { Search, ChevronDown, ChevronRight, Pencil, GitBranch } from 'lucide-react';

interface SidebarItem {
    id: string;
    label: string;
    type: 'category' | 'item';
    icon?: 'pencil';
    children?: SidebarItem[];
    category?: string;
}

const sidebarData: SidebarItem[] = [
    {
        id: 'case-study',
        label: 'Case Study',
        type: 'category',
        category: 'Case Study',
        children: [
            { id: 'hero-vida', label: 'Hero Vida EICMA 2025 ...', type: 'item', icon: 'pencil', category: 'Case Study' }
        ]
    },
    {
        id: 'fgh',
        label: 'fgh',
        type: 'category',
        category: 'Guidelines',
        children: [
            { id: 'ghfh', label: 'ghfh', type: 'item', category: 'Guidelines' }
        ]
    },
    {
        id: 'token-management',
        label: 'Token Management',
        type: 'category',
        category: 'Assets',
        children: [
            { id: 'token-theory', label: 'Token Transformation Theory', type: 'item', category: 'Assets' }
        ]
    },
    {
        id: 'uncategorized',
        label: 'Uncategorized',
        type: 'category',
        category: 'Opinions',
        children: [
            { id: 'dfgdg', label: 'dfgdg', type: 'item', category: 'Opinions' }
        ]
    }
];

export function LeftSidebar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
        new Set(['case-study'])
    );

    const toggleCategory = (categoryId: string) => {
        setExpandedCategories(prev => {
            const newSet = new Set(prev);
            if (newSet.has(categoryId)) {
                newSet.delete(categoryId);
            } else {
                newSet.add(categoryId);
            }
            return newSet;
        });
    };

    const filteredData = useMemo(() => {
        let data = sidebarData;

        if (activeTab !== 'all') {
            const tabCategory = activeTab.charAt(0).toUpperCase() + activeTab.slice(1);
            data = data.filter(item => item.category === tabCategory);
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            data = data.map(category => ({
                ...category,
                children: category.children?.filter(child =>
                    child.label.toLowerCase().includes(query)
                )
            })).filter(category =>
                category.label.toLowerCase().includes(query) ||
                (category.children && category.children.length > 0)
            );
        }

        return data;
    }, [activeTab, searchQuery]);

    return (
        <Box
            asChild
            style={{
                width: 280,
                backgroundColor: '#fafafa',
                borderRight: '1px solid #e5e7eb',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                overflow: 'hidden'
            }}
        >
            <aside>
                {/* Branch indicator and Submit */}
                <Flex direction="column" gap="3" p="4">
                    {/* Branch Indicator */}
                    <Flex
                        align="center"
                        justify="between"
                        style={{
                            padding: '8px 12px',
                            border: '1px solid #d1d5db',
                            borderRadius: 6,
                            backgroundColor: 'white'
                        }}
                    >
                        <Flex align="center" gap="2">
                            <GitBranch size={14} style={{ color: '#6b7280' }} />
                            <Text size="2" style={{ color: '#374151' }}>create branch bug</Text>
                        </Flex>
                        <Badge size="1" variant="soft" color="gray">Draft</Badge>
                    </Flex>

                    {/* Submit for Review Button */}
                    <Button
                        style={{
                            backgroundColor: '#f97316',
                            color: 'white',
                            cursor: 'pointer'
                        }}
                        className="hover:bg-orange-600 active:bg-orange-700 transition-colors"
                    >
                        <Text size="2" weight="medium">Submit for Review</Text>
                    </Button>
                </Flex>

                {/* Search */}
                <Box px="4" pb="4">
                    <TextField.Root
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        size="2"
                    >
                        <TextField.Slot>
                            <Search size={14} style={{ color: '#9ca3af' }} />
                        </TextField.Slot>
                    </TextField.Root>
                </Box>

                {/* Tabs */}
                <Tabs.Root value={activeTab} onValueChange={setActiveTab} style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <Box style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <Tabs.List style={{ display: 'flex', paddingLeft: 16, paddingRight: 16, gap: 0 }}>
                            {['all', 'guidelines', 'assets', 'opinions'].map((tab) => (
                                <Tabs.Trigger
                                    key={tab}
                                    value={tab}
                                    style={{
                                        padding: '8px 10px',
                                        fontSize: 12,
                                        fontWeight: 500,
                                        color: activeTab === tab ? '#f97316' : '#6b7280',
                                        background: 'none',
                                        border: 'none',
                                        borderBottom: activeTab === tab ? '2px solid #f97316' : '2px solid transparent',
                                        cursor: 'pointer',
                                        textTransform: 'capitalize',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {tab === 'all' ? 'All' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </Tabs.Trigger>
                            ))}
                        </Tabs.List>
                    </Box>

                    {/* Tree content */}
                    <ScrollArea style={{ flex: 1 }}>
                        <Box p="3">
                            {filteredData.map((category) => (
                                <Box key={category.id} mb="2">
                                    <Button
                                        variant="ghost"
                                        onClick={() => toggleCategory(category.id)}
                                        style={{
                                            width: '100%',
                                            justifyContent: 'flex-start',
                                            padding: '8px 10px',
                                            color: '#374151'
                                        }}
                                    >
                                        <Flex align="center" gap="2">
                                            {expandedCategories.has(category.id) ? (
                                                <ChevronDown size={14} style={{ color: '#9ca3af' }} />
                                            ) : (
                                                <ChevronRight size={14} style={{ color: '#9ca3af' }} />
                                            )}
                                            <Text size="2" weight="medium">{category.label}</Text>
                                        </Flex>
                                    </Button>

                                    {expandedCategories.has(category.id) && category.children && (
                                        <Box ml="5" mt="1">
                                            {category.children.map((item) => (
                                                <Button
                                                    key={item.id}
                                                    variant="ghost"
                                                    style={{
                                                        width: '100%',
                                                        justifyContent: 'flex-start',
                                                        padding: '8px 10px',
                                                        color: '#4b5563'
                                                    }}
                                                    className="hover:bg-orange-50 group"
                                                >
                                                    <Flex align="center" gap="2" style={{ width: '100%' }}>
                                                        {item.icon === 'pencil' && (
                                                            <Pencil size={12} style={{ color: '#f97316' }} />
                                                        )}
                                                        <Text size="2" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                            {item.label}
                                                        </Text>
                                                        <Box
                                                            style={{
                                                                width: 6,
                                                                height: 6,
                                                                backgroundColor: '#f97316',
                                                                borderRadius: '50%',
                                                                marginLeft: 'auto',
                                                                opacity: 0
                                                            }}
                                                            className="group-hover:opacity-100"
                                                        />
                                                    </Flex>
                                                </Button>
                                            ))}
                                        </Box>
                                    )}
                                </Box>
                            ))}
                        </Box>
                    </ScrollArea>
                </Tabs.Root>
            </aside>
        </Box>
    );
}
