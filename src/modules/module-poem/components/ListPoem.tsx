/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** hooks */
import { useGetAllPoem } from '@module-poem/hooks/useGetAllPoem';

/** components */
import { Poem } from '@module-poem/components/Poem';
import { PoemSkeleton } from '@module-poem/components/PoemSkeleton';

export function ListPoem() {
    const { isPending, data } = useGetAllPoem();

    return (
        <div className="flex flex-1 flex-col items-center space-y-6">
            {isPending ? <PoemSkeleton length={3} /> : data?.map((item) => <Poem key={item.id} data={item} />)}
        </div>
    );
}
