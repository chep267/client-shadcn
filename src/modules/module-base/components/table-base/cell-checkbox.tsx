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
import { Checkbox } from '@module-base/components/checkbox';
import { TableCell, TableHead } from '@module-base/components/table';
import { Checkbox as CheckboxPrimitive } from 'radix-ui';

interface CheckboxCellProps<Data> extends Pick<
    App.ModuleBase.Component.TableBodyProps<Data>,
    'className' | 'hasCheckbox'
> {
    component?: 'th' | 'tr';
    checked?: boolean;
    indeterminate?: boolean;
    onSelect: React.ComponentProps<typeof CheckboxPrimitive.Root>['onCheckedChange'];
}

const CellCheckbox = React.memo(function CellCheckbox<Data extends App.ModuleBase.Component.TableData>(
    props: CheckboxCellProps<Data>
) {
    const { className, component, hasCheckbox, checked, indeterminate, onSelect } = props;

    if (!hasCheckbox) return null;

    const Component = component === 'th' ? TableHead : TableCell;

    return (
        <Component className={cn('w-10', className)}>
            <Checkbox
                className="cursor-pointer"
                checked={indeterminate ? 'indeterminate' : checked}
                onCheckedChange={onSelect}
            />
        </Component>
    );
});

export { CellCheckbox };
