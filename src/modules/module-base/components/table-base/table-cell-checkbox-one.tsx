/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { Checkbox } from '@module-base/components/checkbox';
import { TableCell } from '@module-base/components/table';

function TableCellCheckboxOne<
    Data extends App.ModuleBase.Component.TypeTableData = App.ModuleBase.Component.TypeTableData,
>(props: App.ModuleBase.Component.TableCellCheckboxOneProps<Data>) {
    const { className, id, store } = props;

    const isChecked = store((state) => state.data.selectedIds.has(id));
    const hasCheckbox = store((state) => state.data.hasCheckbox);
    const toggleRow = store((state) => state.action.toggleRow);

    if (!hasCheckbox) return null;

    return (
        <TableCell className={cn('w-10', className)}>
            <Checkbox
                aria-label="Select one"
                className="cursor-pointer"
                checked={isChecked}
                onClick={() => toggleRow(id)}
            />
        </TableCell>
    );
}

export { TableCellCheckboxOne };
