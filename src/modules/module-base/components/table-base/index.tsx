/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** stores */
import { createBigdataStore } from '@module-base/stores/useBigdataStore';

/** components */
import { Table } from '@module-base/components/table';
import { TableHeader } from '@module-base/components/table-base/table-header';
import { TableBody } from '@module-base/components/table-base/table-body';
import { TableLoading } from '@module-base/components/table-base/table-loading';

export function TableBase<Data extends App.ModuleBase.Component.Bigdata = App.ModuleBase.Component.Bigdata>(
    props: App.ModuleBase.Component.TableProps<Data>
) {
    const { ref, className, setup, items, emptyContent, columns } = props;

    const virtuoso = React.useRef<HTMLTableElement | null>(null);
    const dataStore = React.useMemo(() => createBigdataStore<Data>(), []);

    const action = dataStore((state) => state.action);
    const isEmpty = dataStore((state) => state.data.currentItems.length === 0);

    React.useEffect(() => {
        action.setup({
            element: virtuoso,
            items,
            emptyContent,
            columns,
            ...setup,
        });
    }, [items, emptyContent, columns, setup]);

    React.useImperativeHandle(ref, () => {
        return {
            element: virtuoso,
            action,
        };
    }, []);

    return (
        <div
            className={cn(
                'relative h-full w-full overflow-hidden rounded-sm border',
                'min-h-40',
                { 'max-h-40!': isEmpty },
                className
            )}
        >
            <TableLoading store={dataStore} />
            <Table ref={virtuoso} className={className}>
                <TableHeader store={dataStore} />
                <TableBody store={dataStore} />
            </Table>
        </div>
    );
}
