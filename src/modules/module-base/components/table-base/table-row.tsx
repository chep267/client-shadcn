/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { TableCell, TableRow } from '@module-base/components/table';
import { CellCheckbox } from '@module-base/components/table-base/cell-checkbox';

interface TableBaseRowProps<Data> extends Pick<
    App.ModuleBase.Component.TableBaseBodyProps<Data>,
    'hasCheckbox' | 'columns' | 'onSelect'
> {
    checked: boolean;
    indexRow: number;
    item: Data;
}

const TableBaseRow = React.memo(function TableBaseRow<Data extends App.ModuleBase.Component.TableData>(
    props: TableBaseRowProps<Data>
) {
    const { hasCheckbox, indexRow, checked, columns, item, onSelect } = props;

    const renderRow = React.useMemo(() => {
        return columns?.map(({ dataKey, render, ...cellProps }, indexCell) => {
            const value = item[dataKey] as string | number;
            return (
                <TableCell key={dataKey} {...cellProps}>
                    {typeof render === 'function' ? render({ indexRow, indexCell, item }) : value}
                </TableCell>
            );
        });
    }, [indexRow, columns, item]);

    return (
        <TableRow className={cn('h-10')}>
            <CellCheckbox hasCheckbox={hasCheckbox} checked={checked} onSelect={() => onSelect?.(item)} />
            {renderRow}
        </TableRow>
    );
});

export { TableBaseRow };
