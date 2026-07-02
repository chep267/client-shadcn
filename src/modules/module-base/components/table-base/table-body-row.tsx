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

/** components */
import { TableCell, TableRow } from '@module-base/components/table';
import { TableCellCheckboxOne } from '@module-base/components/table-base/table-cell-checkbox-one';

function TableBodyRow<Data extends App.ModuleBase.Component.Bigdata = App.ModuleBase.Component.Bigdata>(
    props: App.ModuleBase.Component.TableBodyRowProps<Data>
) {
    const { asChild, indexRow, item, store } = props;

    const columns = store((state) => state.data.columns);
    const dataKeyForCheckbox = store((state) => state.data.dataKeyForCheckbox);

    const id = React.useMemo(() => {
        const value = dataKeyForCheckbox ? getNestedValue(item, dataKeyForCheckbox) : undefined;
        return typeof value === 'string' || typeof value === 'number' ? value : `row-${indexRow}`;
    }, [item, dataKeyForCheckbox]);

    const renderRow = React.useMemo(() => {
        return columns?.map(({ dataKey, className, render, onClick }, indexCell) => {
            const value = getNestedValue(item, dataKey);
            return (
                <TableCell
                    key={dataKey}
                    className={className}
                    onClick={(event) => onClick?.(event, { item, indexRow, indexCell })}
                >
                    {typeof render === 'function' ? render({ indexRow, indexCell, item }) : <span>{`${value}`}</span>}
                </TableCell>
            );
        });
    }, [columns, item, indexRow]);

    if (asChild) {
        return (
            <React.Fragment>
                <TableCellCheckboxOne id={id} store={store} />
                {renderRow}
            </React.Fragment>
        );
    }

    return (
        <TableRow className={cn('h-10')}>
            <TableCellCheckboxOne id={id} store={store} />
            {renderRow}
        </TableRow>
    );
}

export { TableBodyRow };
