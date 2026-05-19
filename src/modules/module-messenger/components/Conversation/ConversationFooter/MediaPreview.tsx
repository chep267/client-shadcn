/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { useParams } from 'react-router-dom';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** stores */
import { useMessengerStore } from '@module-messenger/stores/useMessengerStore';

/** components */
import { ImagePreview } from '@module-messenger/components/Conversation/ConversationFooter/ImagePreview';

export function MediaPreview() {
    const { tid = '' } = useParams();

    const assets = useMessengerStore((store) => store.data.assets.get(tid));
    const action = useMessengerStore((store) => store.action);

    if (!assets?.length) return null;

    return (
        <div className={cn('flex w-full gap-1 border-b p-1', 'scrollbar-custom scrollbar-thin overflow-auto')}>
            {assets.map((file, index) => (
                <ImagePreview key={index} file={file} handleRemove={() => action.removeAsset({ tid, pos: index })} />
            ))}
        </div>
    );
}
