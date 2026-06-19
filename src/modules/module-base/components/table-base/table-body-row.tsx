/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** utils */
import { cn } from '@module-base/utils/shadcn';
import { getNestedValue } from '@module-base/utils/virtual';
import { deepGet } from '@module-base/utils/data';

/** components */
import { TableCell, TableRow } from '@module-base/components/table';
import { TableCellCheckboxOne } from '@module-base/components/table-base/table-cell-checkbox-one';

function TableBodyRow<Data extends App.ModuleBase.Component.Bigdata = App.ModuleBase.Component.Bigdata>(
    props: App.ModuleBase.Component.TableBodyRowProps<Data>
) {
    const { asChild, indexRow, item, store } = props;

    const columns = store((state) => state.data.columns);
    const dataKeyForCheckbox = store((state) => state.data.dataKeyForCheckbox);
    const id = deepGet(item, dataKeyForCheckbox, `row-${indexRow}`);

    const renderRow = () => {
        return columns?.map(({ dataKey, sortable: _sortable, render, ...cellProps }, indexCell) => {
            const value = getNestedValue(item, dataKey);
            return (
                <TableCell key={dataKey} {...cellProps}>
                    {typeof render === 'function' ? render({ indexRow, indexCell, item }) : <span>{`${value}`}</span>}
                </TableCell>
            );
        });
    };

    if (asChild) {
        return (
            <React.Fragment>
                <TableCellCheckboxOne id={id} store={store} />
                {renderRow()}
            </React.Fragment>
        );
    }

    return (
        <TableRow className={cn('h-10')}>
            <TableCellCheckboxOne id={id} store={store} />
            {renderRow()}
        </TableRow>
    );
}

export { TableBodyRow };
