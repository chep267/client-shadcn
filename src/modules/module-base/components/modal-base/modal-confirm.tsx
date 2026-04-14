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
    className?: string;
    open?: boolean;
    title?: React.ReactNode;
    description?: React.ReactNode;
    cancelText?: React.ReactNode;
    confirmText?: React.ReactNode;
    media?: React.ReactNode;
    variant?: React.ComponentProps<typeof Button>['variant'];
    onConfirm?(): void;
    onCancel?(): void;
}

export function ModalConfirm(props: ModalConfirmProps) {
    const { className, open, title, description, variant, media, cancelText, confirmText, onCancel, onConfirm } = props;

    if (!open) return null;

    return (
        <AlertDialog open={open} onOpenChange={onCancel}>
            <AlertDialogContent className={className}>
                <AlertDialogHeader>
                    {media ? <AlertDialogMedia>{media}</AlertDialogMedia> : null}
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">
                        {cancelText || (
                            <FormattedMessage id={BaseLanguage.component.button.cancel} defaultMessage="Cancel" />
                        )}
                    </AlertDialogCancel>
                    <AlertDialogAction className="cursor-pointer" variant={variant} onClick={onConfirm}>
                        {confirmText || (
                            <FormattedMessage id={BaseLanguage.component.button.confirm} defaultMessage="Confirm" />
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
