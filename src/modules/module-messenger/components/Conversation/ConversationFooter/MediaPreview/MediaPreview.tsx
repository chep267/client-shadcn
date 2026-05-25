/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { XIcon } from 'lucide-react';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** stores */
import { useMessengerStore } from '@module-messenger/stores/useMessengerStore';

/** components */
import { Button } from '@module-base/components/button';
import { Dialog, DialogClose, DialogContent } from '@module-base/components/dialog';
import { Image } from '@module-messenger/components/Conversation/ConversationFooter/MediaPreview/Image';

export function MediaPreview() {
    const { tid = '' } = useParams();
    const [src, setSrc] = React.useState<string>();

    const assets = useMessengerStore((store) => store.data.assets.get(tid));
    const action = useMessengerStore((store) => store.action);

    if (!assets?.length) return null;

    return (
        <>
            <div className={cn('flex w-full gap-1 border-b p-1', 'scrollbar-custom scrollbar-thin overflow-auto')}>
                {assets.map((file, index) => (
                    <Image
                        key={index}
                        file={file}
                        handleRemove={() => action.removeAsset({ tid, pos: index })}
                        handleView={setSrc}
                    />
                ))}
            </div>

            <Dialog open={!!src} onOpenChange={() => setSrc(undefined)}>
                <DialogContent
                    className={cn(
                        'group',
                        'flex items-center justify-center',
                        'size-full max-h-dvh! min-h-0! max-w-dvw! min-w-0! rounded-none py-0'
                    )}
                    showCloseButton={false}
                >
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className={cn(
                                'absolute top-5 z-2 rounded-sm',
                                'size-10 cursor-pointer',
                                '-right-20 group-hover:right-5',
                                'opacity-50 hover:opacity-100'
                            )}
                        >
                            <XIcon className="size-7" />
                        </Button>
                    </DialogClose>
                    <div
                        className={cn(
                            'flex items-center justify-center overflow-hidden',
                            'size-full max-h-dvh max-w-2xl border-r border-l'
                        )}
                    >
                        <img src={src} alt="preview" className="size-auto max-h-dvh object-cover" />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
