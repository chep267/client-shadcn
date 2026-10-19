/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { cn } from 'cn';

/** stores */
import { useModalStore } from '@modules/base/stores/useModalStore';

/** components */
import { ImageBase } from '@modules/base/components/image-base';
import { Typography } from '@modules/base/components/typography';

interface FeedAttachmentsProps {
    className?: string;
    attachments?: App.Module.Base.Store.TypeAttachment[] | null;
}

export default function FeedAttachments(props: FeedAttachmentsProps) {
    const { className = '', attachments } = props;
    const modalAction = useModalStore(({ action }) => action);

    const count = attachments?.length ?? 0;
    if (!attachments || count === 0) return null;

    const renderImage = (file: App.Module.Base.Store.TypeAttachment, index = 0, className = '') => {
        return (
            <ImageBase
                key={file.url}
                src={file.url}
                alt={`Attachment ${index + 1}`}
                className={cn(
                    'size-full rounded-sm',
                    'aspect-square object-cover',
                    '[&>img]:hover:scale-110',
                    className
                )}
                onClick={() => modalAction.show(attachments, index)}
            />
        );
    };

    if (count === 1) {
        /* CASE 1: 1 Hình ảnh */
        return <div className={cn('aspect-5/3', className)}>{renderImage(attachments[0])}</div>;
    }

    if (count === 2 || count === 4) {
        /* CASE 2: 2 Hình ảnh (Chia đôi ngang) */
        /* CASE 4: 4 Hình ảnh (Lưới 2x2 cân bằng) */
        return (
            <div className={cn('grid grid-cols-2 gap-0.5', className)}>
                {attachments.map((src, index) => renderImage(src, index))}
            </div>
        );
    }

    if (count === 3) {
        /* CASE 3: 3 Hình ảnh (1 ảnh lớn bên trái, 2 ảnh nhỏ bên phải) */
        return (
            <div className={cn('grid grid-cols-3 gap-0.5', className)}>
                {renderImage(attachments[0], 0, 'col-span-2')}
                <div className="col-span-1 grid grid-rows-2 gap-0.5">
                    {attachments.slice(1).map((src, index) => renderImage(src, index + 1))}
                </div>
            </div>
        );
    }

    /* CASE 5+: Từ 5 hình ảnh trở lên (1 hàng trên 2 ảnh, hàng dưới 3 ảnh + overlay số còn lại) */
    return (
        <div className={cn('flex flex-col gap-0.5', className)}>
            {/* Hàng trên: 2 ảnh */}
            <div className="grid grid-cols-2 gap-0.5">
                {attachments.slice(0, 2).map((src, index) => renderImage(src, index))}
            </div>

            {/* Hàng dưới: 3 ảnh (Ảnh thứ 3 có overlay đếm +N) */}
            <div className="grid grid-cols-3 gap-0.5">
                {attachments.slice(2, 4).map((src, index) => renderImage(src, index + 2))}

                {/* Ô ảnh thứ 5 chứa Overlay +N */}
                <div className="group relative h-full cursor-pointer overflow-hidden rounded-sm border">
                    {renderImage(attachments[4], 4)}
                    {count > 5 && (
                        <div
                            className={cn(
                                'flex items-center justify-center',
                                'absolute inset-0 z-10 bg-black/60 backdrop-blur-[2px]',
                                'group-hover:-z-10'
                            )}
                            onClick={() => modalAction.show(attachments, 0)}
                        >
                            <Typography component="h2">+{count - 5}</Typography>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
