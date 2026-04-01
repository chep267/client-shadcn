/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import { cn } from '@module-base/utils/shadcn';
import { deepGet } from '@module-base/utils/data';

/** components */
import { TableBody as TableBodyUI } from '@module-base/components/table';
import { TableEmpty } from '@module-base/components/table-base/table-empty';
import { TableBodyRow } from '@module-base/components/table-base/table-body-row';

export function TableBody<Data extends App.ModuleBase.Component.TypeTableData>(
    props: App.ModuleBase.Component.TableBodyProps<Data>
) {
    const { className, children, store, ...otherProps } = props;

    const currentItems = store((state) => state.data.currentItems);
    const dataKeyForCheckbox = store((state) => state.data.dataKeyForCheckbox);
    const isTableEmpty = currentItems.length === 0;

    return (
        <TableBodyUI {...otherProps} className={cn('relative', { 'h-24': isTableEmpty }, className)}>
            <TableEmpty store={store} />
            {children ||
                currentItems.map((item, indexRow) => {
                    const id = deepGet(item, dataKeyForCheckbox) ?? `row-${indexRow}`;
                    return <TableBodyRow key={id} id={id} indexRow={indexRow} item={item} store={store} />;
                })}
        </TableBodyUI>
    );
}
