/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** hooks */
import { useGetAllPoem } from '@module-poem/hooks/useGetAllPoem';

/** components */
import { Poem, PoemSkeleton } from '@module-poem/components/Poem';

export default function PoemScreen() {
    const { isPending, items } = useGetAllPoem();

    return (
        <div className={cn('flex flex-1 flex-col', 'w-full max-w-dvw space-y-6 py-4', 'px-2', 'tablet:px-4')}>
            {isPending
                ? [1, 2, 3].map((key) => <PoemSkeleton key={key} />)
                : items.map((item) => <Poem key={item.id} data={item} />)}
        </div>
    );
}
