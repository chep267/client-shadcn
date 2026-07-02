/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import { cn } from '@module-base/utils/shadcn';
import { getNestedValue } from '@module-base/utils/virtual';

/** components */
import { TableBody as TableBodyUI } from '@module-base/components/table';
import { TableEmpty } from '@module-base/components/table-base/table-empty';
import { TableBodyRow } from '@module-base/components/table-base/table-body-row';

export function TableBody<Data extends App.ModuleBase.Component.Bigdata = App.ModuleBase.Component.Bigdata>(
    props: App.ModuleBase.Component.TableBodyProps<Data>
) {
    const { className, children, store, ...otherProps } = props;

    const currentItems = store((state) => state.data.currentItems);
    const dataKeyForCheckbox = store((state) => state.data.dataKeyForCheckbox);
    const isEmpty = currentItems.length === 0;

    return (
        <TableBodyUI {...otherProps} className={cn('relative', { 'h-24': isEmpty }, className)}>
            <TableEmpty store={store} />
            {children ||
                currentItems.map((item, indexRow) => {
                    const value = dataKeyForCheckbox ? getNestedValue(item, dataKeyForCheckbox) : undefined;
                    const id = typeof value === 'string' || typeof value === 'number' ? value : `row-${indexRow}`;
                    return <TableBodyRow key={id} indexRow={indexRow} item={item} store={store} />;
                })}
        </TableBodyUI>
    );
}
