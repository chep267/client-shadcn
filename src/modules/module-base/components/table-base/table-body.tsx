/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { TableBody } from '@module-base/components/table';
import { TableEmpty } from '@module-base/components/table-base/table-empty';
import { TableBaseRow } from '@module-base/components/table-base/table-row';

export function TableBaseBody<Data extends App.ModuleBase.Component.TableData>(
    props: App.ModuleBase.Component.TableBaseBodyProps<Data>
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
        <TableBody className={cn('relative', { 'h-24': !items.length })}>
            <TableEmpty loading={loading || !!items.length} emptyContent={emptyContent} />

            {items.map((item, indexRow) => {
                const checked = hasCheckbox && dataKeyForCheckbox ? selectedIds.has(item[dataKeyForCheckbox]) : false;
                return (
                    <TableBaseRow
                        key={item[dataKeyForCheckbox]}
                        indexRow={indexRow}
                        hasCheckbox={hasCheckbox}
                        checked={checked}
                        columns={columns}
                        item={item}
                        onSelect={onSelect}
                    />
                );
            })}
        </TableBody>
    );
}
