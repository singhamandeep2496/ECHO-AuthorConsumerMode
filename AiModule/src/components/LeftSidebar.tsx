import { useState } from 'react';
import { Box, Flex, Text, ScrollArea } from '@radix-ui/themes';
import {
    ChevronDown,
    ChevronRight,
} from 'lucide-react';

interface MenuItem {
    id: string;
    label: string;
    count?: number;
    isExpandable?: boolean;
    isDisabled?: boolean;
    children?: MenuItem[];
}

const menuData: MenuItem[] = [
    {
        id: 'vehicles',
        label: 'Vehicles',
        count: 4,
        isExpandable: true,
        children: [
            {
                id: 'v1',
                label: 'V1',
                isExpandable: true,
                children: [
                    { id: 'v1-design', label: 'Design System' },
                    { id: 'v1-components', label: 'Components' },
                    { id: 'v1-guidelines', label: 'Guidelines' },
                ]
            },
            {
                id: 'v2',
                label: 'V2',
                isExpandable: true,
                children: [
                    { id: 'v2-design', label: 'Design System' },
                    { id: 'v2-components', label: 'Components' },
                ]
            },
            {
                id: 'vx2',
                label: 'VX2',
                isExpandable: true,
                children: [
                    { id: 'vx2-case-study', label: 'Case Study' },
                    { id: 'vx2-branding', label: 'Branding' },
                    { id: 'vx2-ui', label: 'UI Kit' },
                ]
            },
            {
                id: 'dirt-e-k3',
                label: 'DIRT.E K3',
                isExpandable: true,
                children: [
                    { id: 'dirt-colors', label: 'Color Palette' },
                    { id: 'dirt-icons', label: 'Iconography' },
                ]
            },
        ]
    },
    {
        id: 'digital-products',
        label: 'Digital Products',
        count: 3,
        isExpandable: true,
        children: [
            {
                id: 'capp',
                label: 'CApp',
                isExpandable: true,
                children: [
                    { id: 'capp-screens', label: 'Screens' },
                    { id: 'capp-flows', label: 'User Flows' },
                    { id: 'capp-assets', label: 'Assets' },
                ]
            },
            {
                id: 'website',
                label: 'Website',
                isExpandable: true,
                children: [
                    { id: 'web-pages', label: 'Pages' },
                    { id: 'web-components', label: 'Components' },
                ]
            },
            {
                id: 'hmi',
                label: 'HMI',
                isExpandable: true,
                children: [
                    { id: 'hmi-dashboard', label: 'Dashboard' },
                    { id: 'hmi-controls', label: 'Controls' },
                    { id: 'hmi-navigation', label: 'Navigation' },
                ]
            },
        ]
    },
];

// Current active page - simulating Vehicle > VX2 > Case Study
const ACTIVE_PAGE_ID = 'vx2-case-study';

// Helper to find parent IDs of the active page
const findParentIds = (items: MenuItem[], targetId: string, parents: string[] = []): string[] | null => {
    for (const item of items) {
        if (item.id === targetId) {
            return parents;
        }
        if (item.children) {
            const found = findParentIds(item.children, targetId, [...parents, item.id]);
            if (found) return found;
        }
    }
    return null;
};

export function LeftSidebar() {
    // Get parent IDs to auto-expand them
    const parentIds = findParentIds(menuData, ACTIVE_PAGE_ID) || [];

    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set([...parentIds]));
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    const toggleExpand = (id: string, isDisabled?: boolean) => {
        if (isDisabled) return;
        setExpandedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const getBackgroundColor = (id: string, isDisabled: boolean, isActive: boolean) => {
        if (isDisabled) return 'transparent';
        if (isActive) return '#f3f4f6';
        if (hoveredItem === id) return '#f3f4f6';
        return 'transparent';
    };

    // Recursive component for rendering menu items at any level
    const renderMenuItem = (item: MenuItem, level: number = 0) => {
        const isDisabled = item.isDisabled || false;
        const isExpanded = expandedItems.has(item.id);
        const hasChildren = item.children && item.children.length > 0;
        const isExpandable = item.isExpandable && hasChildren;
        const isActive = item.id === ACTIVE_PAGE_ID;

        const marginLeft = level === 0 ? 0 : 24;
        const paddingLeft = level === 0 ? 12 : 16;

        return (
            <Box key={item.id}>
                {/* Menu Item */}
                <Flex
                    align="center"
                    justify="between"
                    onClick={() => isExpandable ? toggleExpand(item.id, isDisabled) : null}
                    onMouseEnter={() => !isDisabled && setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    style={{
                        padding: level === 0 ? '10px 12px' : '8px 12px',
                        borderRadius: level === 0 ? 8 : 6,
                        cursor: isDisabled ? 'not-allowed' : (isExpandable ? 'pointer' : 'default'),
                        backgroundColor: getBackgroundColor(item.id, isDisabled, isActive),
                        opacity: isDisabled ? 0.4 : 1,
                        transition: 'background-color 0.15s ease',
                        userSelect: 'none'
                    }}
                >
                    <Flex align="center" gap="3">
                        <Text
                            size="2"
                            weight={isActive ? 'medium' : 'regular'}
                            style={{
                                color: isDisabled ? '#d1d5db' : (isActive ? '#1f2937' : '#4b5563')
                            }}
                        >
                            {item.label}
                        </Text>
                    </Flex>

                    {isExpandable && (
                        <Box
                            style={{
                                color: isDisabled ? '#d1d5db' : (level === 0 ? '#6b7280' : '#9ca3af'),
                                backgroundColor: level === 0 && isExpanded ? '#e5e7eb' : 'transparent',
                                borderRadius: 4,
                                padding: level === 0 ? 4 : 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {isExpanded ? (
                                <ChevronDown size={level === 0 ? 16 : 12} />
                            ) : (
                                <ChevronRight size={level === 0 ? 16 : 12} />
                            )}
                        </Box>
                    )}
                </Flex>

                {/* Children */}
                {isExpandable && isExpanded && !isDisabled && (
                    <Box
                        style={{
                            marginLeft: marginLeft,
                            marginTop: 4,
                            paddingLeft: paddingLeft,
                            borderLeft: '1px solid #e5e7eb'
                        }}
                    >
                        {item.children!.map((child) => renderMenuItem(child, level + 1))}
                    </Box>
                )}
            </Box>
        );
    };

    return (
        <Box
            asChild
            style={{
                width: 240,
                backgroundColor: 'white',
                borderRight: '1px solid rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                overflow: 'hidden'
            }}
        >
            <aside>
                <ScrollArea style={{ flex: 1 }}>
                    <Box py="3" px="2">
                        {menuData.map((item) => renderMenuItem(item, 0))}
                    </Box>
                </ScrollArea>
            </aside>
        </Box>
    );
}
