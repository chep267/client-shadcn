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

export function TableBody<Data extends App.ModuleBase.Component.TableData>(
    props: App.ModuleBase.Component.TableBodyProps<Data>
) {
    const {
        loading,
        hasCheckbox,
        dataKeyForCheckbox = 'id',
        emptyContent,
        selectedIds,
        columns,
        items,
        onSelect,
    } = props;

    return (
        <TableBodyUI className={cn('relative', { 'h-24': !items.length })}>
            <TableEmpty hidden={loading || !!items.length} emptyContent={emptyContent} />

            {items.map((item, indexRow) => {
                const id = deepGet(item, dataKeyForCheckbox);
                const checked = hasCheckbox && dataKeyForCheckbox ? selectedIds.has(id) : false;
                return (
                    <TableBodyRow
                        key={id ?? indexRow}
                        indexRow={indexRow}
                        hasCheckbox={hasCheckbox}
                        checked={checked}
                        columns={columns}
                        item={item}
                        onSelect={onSelect}
                    />
                );
            })}
        </TableBodyUI>
    );
}
