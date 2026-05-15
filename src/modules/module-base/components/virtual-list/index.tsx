/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { Virtuoso, type VirtuosoProps } from 'react-virtuoso';

/** utils */
import { cn } from '@module-base/utils/shadcn';
import { ListLoading } from '@module-base/components/virtual-list/list-loading';
import { ListEmpty } from '@module-base/components/virtual-list/list-empty';

interface VirtualListProps extends VirtuosoProps<App.ModuleMessenger.Data.TypeThread, unknown> {
    loading?: boolean;
}

export function VirtualList(props: VirtualListProps) {
    const { className, loading, data, ...listProps } = props;

    return (
        <div className={cn('relative h-full w-full', className)}>
            <ListLoading loading={loading} />
            <ListEmpty loading={loading} isEmpty={!data?.length} />
            <Virtuoso className={cn('h-full w-full', 'scrollbar-custom scrollbar-thin')} data={data} {...listProps} />
        </div>
    );
}
