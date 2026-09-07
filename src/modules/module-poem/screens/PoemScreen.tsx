/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { cn } from 'cn';

/** components */
import { ListPoem } from '@module-poem/components/ListPoem';

export default function PoemScreen() {
    return (
        <div className={cn('flex flex-1 flex-col', 'px-2 py-4', 'tablet:px-5')}>
            <ListPoem />
        </div>
    );
}
