/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

/** constants */
import { BaseLanguage } from '@module-base/constants/BaseLanguage';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
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
    title?: React.ReactNode;
    description?: React.ReactNode;
    cancelText?: React.ReactNode;
    confirmText?: React.ReactNode;
    cancelClassName?: string;
    confirmClassName?: string;
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
        cancelText,
        confirmText,
        cancelClassName,
        confirmClassName,
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
                    <AlertDialogCancel className={cn('cursor-pointer', cancelClassName)}>
                        {cancelText || (
                            <FormattedMessage id={BaseLanguage.component.button.cancel} defaultMessage="Cancel" />
                        )}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className={cn('cursor-pointer', confirmClassName)}
                        variant={variant}
                        onClick={onConfirm}
                    >
                        {confirmText || (
                            <FormattedMessage id={BaseLanguage.component.button.confirm} defaultMessage="Confirm" />
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
