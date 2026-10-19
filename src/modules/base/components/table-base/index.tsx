/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { cn } from 'cn';

/** hooks */
import { useConst } from '@modules/base/hooks/useConst';

/** stores */
import { createBigdataStore } from '@modules/base/stores/useBigdataStore';

/** components */
import { Table } from '@modules/base/components/table';
import { TableHeader } from '@modules/base/components/table-base/table-header';
import { TableBody } from '@modules/base/components/table-base/table-body';
import { TableLoading } from '@modules/base/components/table-base/table-loading';

export function TableBase<Data = unknown>(props: App.Module.Base.Component.TableProps<Data>) {
    const { ref, className, setup, items, emptyContent, columns } = props;

    const virtuoso = React.useRef<HTMLTableElement | null>(null);
    const dataStore = useConst(() => createBigdataStore<Data>());

    const action = dataStore((state) => state.action);
    const isEmpty = dataStore((state) => state.data.currentItems.length === 0);

    React.useEffect(() => {
        action.setup({
            element: virtuoso.current,
            items,
            emptyContent,
            columns,
            ...setup,
        });
    }, [items, emptyContent, columns, setup]);

    React.useImperativeHandle(ref, () => {
        return {
            element: virtuoso.current,
            action,
        };
    }, [action]);

    return (
        <div
            className={cn(
                'relative h-auto w-full overflow-hidden rounded-sm border',
                { 'max-h-40!': isEmpty },
                className
            )}
        >
            <TableLoading store={dataStore} />
            <Table
                ref={virtuoso}
                className={cn('h-full *:data-[slot=table]:h-auto', 'scrollbar-custom scrollbar-thin')}
            >
                <TableHeader store={dataStore} />
                <TableBody store={dataStore} />
            </Table>
        </div>
    );
}
