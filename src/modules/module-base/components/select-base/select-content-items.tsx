/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { SelectItem } from '@module-base/components/select';

export function SelectContentItems(props: Pick<App.ModuleBase.Component.SelectBaseProps, 'value' | 'items'>) {
    const { value, items } = props;

    return items?.map((item) => {
        return (
            <SelectItem
                key={item.value}
                value={item.value}
                disabled={value === item.value}
                className={cn('cursor-pointer', item.className)}
            >
                {typeof item.label === 'function' ? item.label() : item.label}
            </SelectItem>
        );
    });
}
