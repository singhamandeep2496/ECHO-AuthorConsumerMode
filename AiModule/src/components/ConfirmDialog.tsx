import { type ReactNode } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Flex, Text, Button } from '@radix-ui/themes';

interface ConfirmDialogProps {
    children: ReactNode;
    title: string;
    description: string;
    confirmText: string;
    variant?: 'default' | 'destructive';
    onConfirm: () => void;
}

export function ConfirmDialog({
    children,
    title,
    description,
    confirmText,
    variant = 'default',
    onConfirm
}: ConfirmDialogProps) {
    const isDestructive = variant === 'destructive';

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                {children}
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        position: 'fixed',
                        inset: 0,
                        zIndex: 100
                    }}
                />
                <AlertDialog.Content
                    style={{
                        backgroundColor: 'white',
                        borderRadius: 8,
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '90vw',
                        maxWidth: 420,
                        padding: 24,
                        zIndex: 101
                    }}
                >
                    <AlertDialog.Title asChild>
                        <Text size="5" weight="bold" style={{ color: '#1f2937' }}>
                            {title}
                        </Text>
                    </AlertDialog.Title>
                    <AlertDialog.Description asChild>
                        <Text
                            size="2"
                            style={{
                                color: '#6b7280',
                                display: 'block',
                                marginTop: 8,
                                lineHeight: 1.5
                            }}
                        >
                            {description}
                        </Text>
                    </AlertDialog.Description>
                    <Flex gap="3" mt="5" justify="end">
                        <AlertDialog.Cancel asChild>
                            <Button
                                variant="outline"
                                style={{
                                    cursor: 'pointer',
                                    color: '#374151',
                                    borderColor: '#d1d5db'
                                }}
                            >
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                            <Button
                                onClick={onConfirm}
                                style={{
                                    cursor: 'pointer',
                                    backgroundColor: isDestructive ? '#ef4444' : '#f97316',
                                    color: 'white'
                                }}
                                className={isDestructive ? 'hover:bg-red-600' : 'hover:bg-orange-600'}
                            >
                                {confirmText}
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
}
