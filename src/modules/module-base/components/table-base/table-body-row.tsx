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
import { CellCheckbox } from '@module-base/components/table-base/cell-checkbox';

interface TableBodyRowProps<Data> extends Pick<
    App.ModuleBase.Component.TableBaseBodyProps<Data>,
    'hasCheckbox' | 'columns' | 'onSelect'
> {
    asChild?: boolean;
    checked: boolean;
    indexRow: number;
    item: Data;
}

function TableBodyRow<Data extends App.ModuleBase.Component.TableData>(props: TableBodyRowProps<Data>) {
    const { asChild, hasCheckbox, indexRow, checked, columns, item, onSelect } = props;

    const renderRow = React.useMemo(() => {
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
    }, [indexRow, columns, item]);

    if (asChild) {
        return (
            <React.Fragment>
                <CellCheckbox hasCheckbox={hasCheckbox} checked={checked} onSelect={() => onSelect?.(item)} />
                {renderRow}
            </React.Fragment>
        );
    }

    return (
        <TableRow className={cn('h-10')}>
            <CellCheckbox hasCheckbox={hasCheckbox} checked={checked} onSelect={() => onSelect?.(item)} />
            {renderRow}
        </TableRow>
    );
}

export { TableBodyRow };
