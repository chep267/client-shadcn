/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { XIcon } from 'lucide-react';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { Button } from '@module-base/components/button';

interface ImagePreviewProps {
    file?: File;
    handleRemove?: () => void;
    handleView?: (src?: string) => void;
}

export function Image(props: ImagePreviewProps) {
    const { file, handleRemove, handleView } = props;
    const [src, setSrc] = React.useState<string>();

    React.useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSrc(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, [file]);

    return (
        <div
            className={cn(
                'group relative aspect-video cursor-pointer overflow-hidden',
                'size-20 min-w-20 rounded-sm border'
            )}
        >
            <Button
                type="button"
                variant="destructive"
                size="icon"
                className={cn(
                    'absolute top-0 right-0 z-2 rounded-none rounded-bl-sm',
                    'size-6 cursor-pointer',
                    'invisible group-hover:visible'
                )}
                onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    handleRemove?.();
                }}
            >
                <XIcon className="h-4 w-4" />
            </Button>

            <img src={src} alt="preview" className="size-full object-cover" onClick={() => handleView?.(src)} />
        </div>
    );
}
