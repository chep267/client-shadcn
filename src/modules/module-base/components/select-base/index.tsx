/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** components */
import { Select, SelectContent, SelectGroup } from '@module-base/components/select';
import { SelectTrigger } from '@module-base/components/select-base/select-trigger';
import { SelectContentLoading } from '@module-base/components/select-base/select-content-loading';
import { SelectContentEmpty } from '@module-base/components/select-base/select-content-empty';
import { SelectContentClear } from '@module-base/components/select-base/select-content-clear';
import { SelectContentItems } from '@module-base/components/select-base/select-content-items';

export function SelectBase<Value extends string = string>(props: App.ModuleBase.Component.SelectBaseProps<Value>) {
    const { className, value, hasClear, loading, disabled, placeholder, clearContent, emptyContent, items, onChange } =
        props;
    const showClear = !!(hasClear && !!value && value !== 'null' && value !== 'undefined');

    const handleChange = (value: Value) => {
        const item = items?.find((item) => item.value === value);
        onChange?.(value, item);
    };

    return (
        <Select value={value} onValueChange={handleChange} disabled={disabled}>
            <SelectTrigger className={className} placeholder={placeholder} />

            <SelectContent position="popper">
                <SelectGroup>
                    <SelectContentClear clear={showClear} clearContent={clearContent} />
                    <SelectContentLoading loading={loading} />
                    <SelectContentEmpty empty={!loading && !items?.length} emptyContent={emptyContent} />
                    <SelectContentItems value={value} items={items} />
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
