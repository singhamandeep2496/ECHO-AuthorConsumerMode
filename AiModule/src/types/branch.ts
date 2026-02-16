export type TabId = 'my-branches' | 'to-review' | 'to-publish' | 'all'

export type BranchStatus = 'draft' | 'in-review' | 'changes-requested' | 'approved' | 'published'

export interface Branch {
    id: string
    name: string
    description: string
    author: {
        name: string
        avatar?: string
    }
    status: BranchStatus
    lastUpdate: string
}
