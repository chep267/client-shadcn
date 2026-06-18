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
    const { className, setup = {}, items, emptyContent, columns } = props;

    const virtuoso = React.useRef<HTMLDivElement | null>(null);
    const dataStore = React.useMemo(() => createBigdataStore<Data>(), []);

    const action = dataStore((state) => state.action);
    const isTableEmpty = dataStore((state) => state.data.currentItems.length === 0);

    React.useEffect(() => {
        action.init({
            ref: virtuoso.current?.querySelector('[data-slot="table-container"]'),
            items,
            emptyContent,
            columns,
            ...setup,
        });
    }, [items, emptyContent, columns, JSON.stringify(setup)]);

    React.useEffect(() => {
        action.search(setup.searchKey);
    }, [setup.searchKey]);

    React.useEffect(() => {
        action.sort(setup.orderBy, setup.orderType);
    }, [setup.orderBy, setup.orderType]);

    React.useEffect(() => {
        action.filter(setup.filters);
    }, [JSON.stringify(setup.filters)]);

    return (
        <div
            ref={virtuoso}
            className={cn(
                'relative flex-1 overflow-hidden rounded-md border',
                'min-h-40',
                { 'max-h-40': isTableEmpty },
                className
            )}
        >
            <TableLoading store={dataStore} />
            <Table className={className}>
                <TableHeader store={dataStore} />
                <TableBody store={dataStore} />
            </Table>
        </div>
    );
}
