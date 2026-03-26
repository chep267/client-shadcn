import * as React from 'react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogMedia,
} from '@module-base/components/alert-dialog';
import { Button } from '@module-base/components/button';

interface ModalConfirmProps {
    open?: boolean;
    title?: string;
    description?: string;
    cancelText?: string;
    confirmText?: string;
    media?: React.ReactNode;
    variant?: React.ComponentProps<typeof Button>['variant'];
    onConfirm?(): void;
    onCancel?(): void;
}

export function ModalConfirm(props: ModalConfirmProps) {
    const {
        open,
        title,
        description,
        variant,
        media,
        cancelText = 'Cancel',
        confirmText = 'Confirm',
        onCancel,
        onConfirm,
    } = props;

    if (!open) return null;

    return (
        <AlertDialog open={open} onOpenChange={onCancel}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    {media ? <AlertDialogMedia>{media}</AlertDialogMedia> : null}
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">{cancelText}</AlertDialogCancel>
                    <AlertDialogAction className="cursor-pointer" variant={variant} onClick={onConfirm}>
                        {confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
