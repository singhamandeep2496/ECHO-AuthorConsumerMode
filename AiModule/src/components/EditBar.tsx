import { Box, Flex, Text, Button } from '@radix-ui/themes';
import { GitBranch, Trash2, Save, X, Check } from 'lucide-react';
import { ConfirmDialog } from './ConfirmDialog';
import { useEdit } from '../context/EditContext';

interface EditBarProps {
    title: string;
    onDelete: () => void;
}

export function EditBar({ title, onDelete }: EditBarProps) {
    const { saveChanges, discardChanges } = useEdit();

    return (
        <Box
            style={{
                backgroundColor: 'white',
                borderBottom: '1px solid #e5e7eb',
                padding: '8px 20px',
                animation: 'slideDown 0.3s ease-out forwards'
            }}
            className="edit-bar-animate"
        >
            <Flex align="center" justify="between">
                {/* Left section - Branch info and editing title */}
                <Flex align="center" gap="3">
                    <Flex align="center" gap="2" style={{ color: '#6b7280' }}>
                        <GitBranch size={14} />
                        <Text size="2">create branch bug</Text>
                    </Flex>
                    <Text size="2" style={{ color: '#9ca3af' }}>|</Text>
                    <Text size="2" style={{ color: '#374151' }}>
                        Editing: {title}
                    </Text>
                </Flex>

                {/* Right section - Action buttons with equal spacing */}
                <Flex align="center" gap="3">
                    {/* Delete button - secondary/outline */}
                    <ConfirmDialog
                        title="Delete Case Study"
                        description="Are you sure you want to delete this case study? This action cannot be undone."
                        confirmText="Delete"
                        variant="destructive"
                        onConfirm={onDelete}
                    >
                        <Button
                            variant="outline"
                            style={{
                                color: '#ef4444',
                                borderColor: '#fecaca',
                                cursor: 'pointer'
                            }}
                            className="hover:bg-red-50"
                        >
                            <Trash2 size={14} />
                            <Text size="2">Delete</Text>
                        </Button>
                    </ConfirmDialog>

                    {/* Save Draft button - secondary/outline */}
                    <ConfirmDialog
                        title="Save Draft"
                        description="Your changes will be saved as a draft. You can continue editing later."
                        confirmText="Save Draft"
                        variant="default"
                        onConfirm={saveChanges}
                    >
                        <Button
                            variant="outline"
                            style={{
                                color: '#374151',
                                borderColor: '#d1d5db',
                                cursor: 'pointer'
                            }}
                            className="hover:bg-gray-100"
                        >
                            <Save size={14} />
                            <Text size="2">Save Draft</Text>
                        </Button>
                    </ConfirmDialog>

                    {/* Cancel button - secondary/outline */}
                    <Button
                        variant="outline"
                        onClick={discardChanges}
                        style={{
                            color: '#ef4444',
                            borderColor: '#fecaca',
                            cursor: 'pointer'
                        }}
                        className="hover:bg-red-50"
                    >
                        <X size={14} />
                        <Text size="2">Cancel</Text>
                    </Button>

                    {/* Done button - primary */}
                    <Button
                        onClick={saveChanges}
                        style={{
                            backgroundColor: '#f97316',
                            color: 'white',
                            cursor: 'pointer'
                        }}
                        className="hover:bg-orange-600"
                    >
                        <Check size={14} />
                        <Text size="2" weight="medium">Done</Text>
                    </Button>
                </Flex>
            </Flex>
        </Box>
    );
}
