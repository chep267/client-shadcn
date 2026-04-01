/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** utils */
import { cn } from '@module-base/utils/shadcn';
import { getValueByDataKey } from '@module-base/utils/virtual';

/** components */
import { TableCell, TableRow } from '@module-base/components/table';
import { TableCellCheckboxOne } from '@module-base/components/table-base/table-cell-checkbox-one';

function TableBodyRow<Data extends App.ModuleBase.Component.TypeTableData = App.ModuleBase.Component.TypeTableData>(
    props: App.ModuleBase.Component.TableBodyRowProps<Data>
) {
    const { asChild, indexRow, item, id, store } = props;

    const columns = store((state) => state.data.columns);

    const renderRow = () => {
        return columns?.map(({ dataKey, sortable: _sortable, render, ...cellProps }, indexCell) => {
            return (
                <TableCell key={dataKey} {...cellProps}>
                    {typeof render === 'function' ? (
                        render({ indexRow, indexCell, item })
                    ) : (
                        <span>{getValueByDataKey(item, dataKey)}</span>
                    )}
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
