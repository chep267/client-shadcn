/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { cn } from 'cn';
import { XIcon } from 'lucide-react';

/** stores */
import { useModalStore } from '@modules/base/stores/useModalStore';

/** components */
import { ImageBase } from '@modules/base/components/image-base';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
} from '@modules/base/components/alert-dialog';

export function ModalAttachments() {
    const open = useModalStore(({ data }) => data.open);
    const position = useModalStore(({ data }) => data.position);
    const attachments = useModalStore(({ data }) => data.attachments);
    const modalAction = useModalStore(({ action }) => action);
    const scrollYRef = React.useRef(0);

    const handleKeyDown = (event: KeyboardEvent) => {
        switch (true) {
            case event.key === 'ArrowLeft':
                event.preventDefault(); // Chặn cuộn trang
                modalAction.changePosition('prev');
                return;
            case event.key === 'ArrowRight':
                event.preventDefault(); // Chặn cuộn trang
                modalAction.changePosition('next');
                return;
            default: // nothing
        }
    };

    React.useEffect(() => {
        if (open) {
            scrollYRef.current = window.scrollY;
            window.addEventListener('keydown', handleKeyDown);
        } else {
            requestAnimationFrame(() => {
                window.scrollTo({
                    top: scrollYRef.current,
                    behavior: 'instant',
                });
            });
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [open]);

    if (!open) return null;

    return (
        <AlertDialog open={open} onOpenChange={modalAction.hide}>
            <AlertDialogContent
                className={cn('flex flex-col justify-between', 'size-full max-w-full! rounded-none select-none')}
            >
                <AlertDialogHeader className="relative h-10">
                    <AlertDialogTitle>Attachment name</AlertDialogTitle>
                    <AlertDialogDescription>Attachment time</AlertDialogDescription>
                    <AlertDialogCancel
                        className={cn('absolute right-0 cursor-pointer', 'hover:text-danger hover:border-danger')}
                    >
                        <XIcon className="mobile:size-5 size-4" />
                    </AlertDialogCancel>
                </AlertDialogHeader>

                <div className={cn('flex flex-1 items-center justify-center', 'mt-2 overflow-hidden')}>
                    <ImageBase
                        key={attachments[position].url}
                        src={attachments[position].url}
                        alt={`Attachment ${position + 1}`}
                        className={cn('rounded-sm', 'aspect-auto object-cover')}
                    />
                </div>

                <AlertDialogFooter className="flex flex-row justify-start! gap-1! overflow-x-auto overflow-y-hidden">
                    {attachments.map((attachment, index: number) => (
                        <ImageBase
                            key={attachment.url}
                            src={attachment.url}
                            alt={`Attachment ${index + 1}`}
                            className={cn(
                                'aspect-square rounded-sm object-cover',
                                'hover:border-primary hover:border-2 hover:opacity-80',
                                'mobile:size-16', // mobile
                                'mobile:size-25', // desktop
                                {
                                    'border-main! border-2': index === position,
                                }
                            )}
                            onClick={() => modalAction.setPosition(index)}
                        />
                    ))}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
