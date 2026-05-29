/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { ImageIcon } from 'lucide-react';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** stores */
import { useMessengerStore } from '@module-messenger/stores/useMessengerStore';

/** components */
import { Button } from '@module-base/components/button';
import { Input } from '@module-base/components/input';

export function ButtonMedia() {
    const { tid = '' } = useParams();
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const action = useMessengerStore((store) => store.action);

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files?.length) return;
        action.addAttachments({ tid, attachments: Array.from(files) });
    };

    return (
        <Button
            variant="ghost"
            className={cn(
                'relative size-10',
                'cursor-pointer rounded-full text-inherit shadow-none',
                'hover:text-main'
            )}
            aria-label="choose-media"
            onClick={triggerFileInput}
        >
            <ImageIcon className="size-6" />
            <Input
                className="hidden"
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
            />
        </Button>
    );
}
