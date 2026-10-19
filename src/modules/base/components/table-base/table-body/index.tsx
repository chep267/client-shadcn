/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { cn } from 'cn';

/** utils */
import { getNestedValue } from '@modules/base/utils/virtual';

/** components */
import { TableBody as TableBodyComp } from '@modules/base/components/table';
import { TableEmpty } from '@modules/base/components/table-base/table-empty';
import { TableBodyRow } from '@modules/base/components/table-base/table-body/table-body-row';

export function TableBody<Data>(props: App.Module.Base.Component.TableBodyProps<Data>) {
    const { className, children, store, ...otherProps } = props;

    const currentItems = store((state) => state.data.currentItems);
    const dataKeyForCheckbox = store((state) => state.data.dataKeyForCheckbox);
    const isEmpty = currentItems.length === 0;

    return (
        <TableBodyComp {...otherProps} className={cn('relative', { 'h-24': isEmpty }, className)}>
            <TableEmpty store={store} />
            {children ||
                currentItems.map((item, indexRow) => {
                    const value = dataKeyForCheckbox ? getNestedValue(item, dataKeyForCheckbox) : undefined;
                    const id = typeof value === 'string' || typeof value === 'number' ? value : `row-${indexRow}`;
                    return <TableBodyRow key={id} indexRow={indexRow} item={item} store={store} />;
                })}
        </TableBodyComp>
    );
}
