/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { FormattedMessage } from 'react-intl';

/** constants */
import { BaseLanguage } from '@module-base/constants/language';

/** components */
import { Spinner } from '@module-base/components/spinner';
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

/** types */
import type { ModalConfirmProps } from '@module-base/types/component';

export function ModalConfirm(props: ModalConfirmProps) {
    const {
        className,
        open,
        loading,
        title,
        description,
        variant,
        media,
        cancelText,
        confirmText,
        onCancel,
        onConfirm,
        children,
    } = props;

    if (!open) return null;

    return (
        <AlertDialog open={open} onOpenChange={onCancel}>
            <AlertDialogContent className={className}>
                <AlertDialogHeader>
                    {media ? <AlertDialogMedia>{media}</AlertDialogMedia> : null}
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>

                {children}

                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer" disabled={loading}>
                        {cancelText || (
                            <FormattedMessage id={BaseLanguage.component.button.cancel} defaultMessage="Cancel" />
                        )}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="cursor-pointer"
                        disabled={loading}
                        variant={variant}
                        onClick={onConfirm}
                    >
                        {loading ? (
                            <Spinner className="mx-2 size-4" />
                        ) : (
                            confirmText || (
                                <FormattedMessage id={BaseLanguage.component.button.confirm} defaultMessage="Confirm" />
                            )
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
