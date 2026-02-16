import { useState } from 'react'
import { Box, Flex, Text, Table, Badge, IconButton } from '@radix-ui/themes'
import { MagnifyingGlassIcon, TrashIcon } from '@radix-ui/react-icons'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { TabsWithCount } from './TabsWithCount'
import type { Branch, BranchStatus, TabId } from '../../types/branch'

interface DashboardProps { }

const MOCK_BRANCHES: Branch[] = [
    {
        id: '1',
        name: 'Module-1-test-ACPD',
        description: 'Testing ACPD module integration',
        author: { name: 'John Doe' },
        status: 'draft',
        lastUpdate: '2 weeks ago'
    },
    {
        id: '2',
        name: 'Feature-Auth-Update',
        description: 'Updating authentication flow',
        author: { name: 'John Doe' },
        status: 'in-review',
        lastUpdate: '1 day ago'
    },
    {
        id: '3',
        name: 'Bugfix-Login-Issue',
        description: 'Fixing login timeout issue',
        author: { name: 'John Doe' },
        status: 'changes-requested',
        lastUpdate: '2 days ago'
    },
    {
        id: '4',
        name: 'UI-Dashboard-Redesign',
        description: 'Complete dashboard UI overhaul',
        author: { name: 'Jane Smith' },
        status: 'approved',
        lastUpdate: '1 day ago'
    },
    {
        id: '5',
        name: 'API-V2-Migration',
        description: 'Migrating to API version 2',
        author: { name: 'Jane Smith' },
        status: 'published',
        lastUpdate: '4 days ago'
    },
    {
        id: '6',
        name: 'Hotfix-Crash',
        description: 'Critical crash fix on startup',
        author: { name: 'John Doe' },
        status: 'published',
        lastUpdate: '1 hour ago'
    },
    {
        id: '7',
        name: 'Experiment-New-Search',
        description: 'Trying out Algolia search',
        author: { name: 'Mike Ross' },
        status: 'in-review',
        lastUpdate: '3 days ago'
    },
    {
        id: '8',
        name: 'Docs-Update',
        description: 'Updating contributor guidelines',
        author: { name: 'John Doe' },
        status: 'draft',
        lastUpdate: '5 hours ago'
    }
]

const getStatusColor = (status: BranchStatus) => {
    switch (status) {
        case 'draft': return 'gray'
        case 'in-review': return 'orange'
        case 'changes-requested': return 'red'
        case 'approved': return 'green'
        case 'published': return 'blue'
        default: return 'gray'
    }
}

const getStatusLabel = (status: BranchStatus) => {
    switch (status) {
        case 'draft': return 'Draft'
        case 'in-review': return 'In Review'
        case 'changes-requested': return 'Changes Requested'
        case 'approved': return 'Approved'
        case 'published': return 'Published'
        default: return status
    }
}


export function Dashboard({ }: DashboardProps) {
    const [activeTab, setActiveTab] = useState<TabId>('my-branches')
    const [searchQuery, setSearchQuery] = useState('')

    // Mock filtering logic
    // 'my-branches' -> author is 'John Doe' (mock current user)
    // 'to-review' -> status is 'in-review'
    // 'to-publish' -> status is 'approved'
    // 'all' -> all branches
    const filteredBranches = MOCK_BRANCHES.filter(branch => {
        const matchesSearch = branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            branch.description.toLowerCase().includes(searchQuery.toLowerCase());

        if (!matchesSearch) return false;

        switch (activeTab) {
            case 'my-branches':
                return branch.author.name === 'John Doe';
            case 'to-review':
                return branch.status === 'in-review';
            case 'to-publish':
                return branch.status === 'approved';
            case 'all':
            default:
                return true;
        }
    })

    const tabs = [
        { id: 'my-branches' as TabId, label: 'My Branches', count: MOCK_BRANCHES.filter(b => b.author.name === 'John Doe').length },
        { id: 'to-review' as TabId, label: 'To Review', count: MOCK_BRANCHES.filter(b => b.status === 'in-review').length },
        { id: 'to-publish' as TabId, label: 'To Publish', count: MOCK_BRANCHES.filter(b => b.status === 'approved').length },
        { id: 'all' as TabId, label: 'All', count: MOCK_BRANCHES.length }
    ]

    return (
        <Flex direction="column" style={{ height: '100%', overflow: 'hidden' }}>
            {/* Top Filter Bar Area (Matching NotificationFilterBar) */}
            <Flex
                align="center"
                justify="between"
                style={{
                    padding: '12px 24px',
                    borderBottom: '1px solid transparent', // Kept for spacing consistency
                    gap: 16
                }}
            >
                {/* Left: Tabs as Filter */}
                <TabsWithCount
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />

                {/* Right: Search */}
                <Flex
                    align="center"
                    style={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: 6,
                        padding: '6px 12px',
                        gap: 8,
                        width: 300,
                        transition: 'border-color 0.15s ease',
                    }}
                    className="focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"
                >
                    <MagnifyingGlassIcon height="16" width="16" style={{ color: '#9ca3af' }} />
                    <input
                        type="text"
                        placeholder="Search branches..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            border: 'none',
                            outline: 'none',
                            fontSize: '0.8rem',
                            color: '#1f2937',
                            backgroundColor: 'transparent',
                            width: '100%'
                        }}
                    />
                </Flex>
            </Flex>

            {/* Main Content Area (Matching NotificationList) */}
            <Flex
                direction="column"
                style={{
                    flex: 1,
                    padding: '0 16px 24px', // Reduced top padding to 0 as filter bar is above
                    overflow: 'hidden'
                }}
            >
                <Flex
                    direction="column"
                    style={{
                        maxHeight: '100%',
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: 6,
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    {/* Table Container */}
                    <Box style={{ flex: 1, overflow: 'auto' }}>
                        <Table.Root>
                            <Table.Header>
                                <Table.Row style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                                    <Table.ColumnHeaderCell style={{ padding: '10px 24px', fontSize: '0.75rem', fontWeight: 600, color: '#1f2937' }}>
                                        BRANCH
                                    </Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell style={{ padding: '10px 24px', fontSize: '0.75rem', fontWeight: 600, color: '#1f2937' }}>
                                        AUTHOR
                                    </Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell style={{ padding: '10px 24px', fontSize: '0.75rem', fontWeight: 600, color: '#1f2937' }}>
                                        STATUS
                                    </Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell style={{ padding: '10px 24px', fontSize: '0.75rem', fontWeight: 600, color: '#1f2937' }}>
                                        LAST UPDATE
                                    </Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell style={{ padding: '10px 24px', fontSize: '0.75rem', fontWeight: 600, color: '#1f2937' }}>
                                        ACTIONS
                                    </Table.ColumnHeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {filteredBranches.map(branch => (
                                    <Table.Row key={branch.id} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background-color 0.15s' }} className="hover:bg-gray-50">
                                        <Table.Cell style={{ padding: '12px 24px', verticalAlign: 'middle' }}>
                                            <Flex direction="column" gap="1">
                                                <Text size="2" weight="medium" style={{ color: '#1f2937' }}>{branch.name}</Text>
                                                <Text size="1" style={{ color: '#6b7280' }}>
                                                    {branch.description}
                                                </Text>
                                            </Flex>
                                        </Table.Cell>
                                        <Table.Cell style={{ padding: '12px 24px', verticalAlign: 'middle' }}>
                                            <Flex align="center" gap="2">
                                                <Box style={{
                                                    width: 24,
                                                    height: 24,
                                                    borderRadius: '50%',
                                                    backgroundColor: '#f3f4f6',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '0.7rem',
                                                    color: '#6b7280'
                                                }}>
                                                    {branch.author.name.split(' ').map(n => n[0]).join('')}
                                                </Box>
                                                <Text size="2" style={{ color: '#374151' }}>{branch.author.name}</Text>
                                            </Flex>
                                        </Table.Cell>
                                        <Table.Cell style={{ padding: '12px 24px', verticalAlign: 'middle' }}>
                                            <Badge
                                                color={getStatusColor(branch.status)}
                                                variant="soft"
                                                radius="medium"
                                                style={{ padding: '2px 8px', fontSize: '0.75rem', fontWeight: 500 }}
                                            >
                                                {getStatusLabel(branch.status)}
                                            </Badge>
                                        </Table.Cell>
                                        <Table.Cell style={{ padding: '12px 24px', verticalAlign: 'middle' }}>
                                            <Text size="2" style={{ color: '#6b7280' }}>{branch.lastUpdate}</Text>
                                        </Table.Cell>
                                        <Table.Cell style={{ padding: '12px 24px', verticalAlign: 'middle' }}>
                                            <IconButton variant="ghost" color="gray" style={{ cursor: 'pointer' }}>
                                                <TrashIcon width="16" height="16" />
                                            </IconButton>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Root>
                    </Box>

                    {/* Pagination Footer (Matching NotificationList) */}
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
                            1-5 of {filteredBranches.length}
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
        </Flex>
    )
}
