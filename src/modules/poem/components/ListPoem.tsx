/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** hooks */
import { useGetPoems } from '@modules/poem/hooks/useGetPoems';

/** components */
import { Poem } from '@modules/poem/components/Poem';
import { PoemSkeleton } from '@modules/poem/components/PoemSkeleton';

export function ListPoem() {
    const { isPending, data } = useGetPoems();

    return (
        <div className="flex flex-1 flex-col items-center space-y-6">
            {isPending ? <PoemSkeleton length={3} /> : data?.map((item) => <Poem key={item.id} data={item} />)}
        </div>
    );
}
