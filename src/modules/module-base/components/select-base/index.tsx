/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import delay from 'lodash-es/delay';
import { FormattedMessage } from 'react-intl';

/** constants */
import { BaseLanguage } from '@module-base/constants/language';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@module-base/components/select';
import { SelectContentLoading } from '@module-base/components/select-base/select-content-loading';
import { SelectContentEmpty } from '@module-base/components/select-base/select-content-empty';

const ITEM_CLEAR_VALUE = 'null';

export function SelectBase<Value extends string = string>(props: App.ModuleBase.Component.SelectBaseProps<Value>) {
    const {
        className,
        value: externalValue,
        hasClear,
        loading,
        disabled,
        placeholder: externalPlaceholder,
        emptyContent,
        items,
        onChange,
    } = props;

    const [localValue, setLocalValue] = React.useState<Value | undefined>(externalValue);

    React.useEffect(() => {
        if (externalValue !== localValue) {
            setLocalValue(externalValue);
        }
    }, [externalValue]);

    const handleChange = (value: Value) => {
        setLocalValue(value);
        delay(() => {
            if (value === ITEM_CLEAR_VALUE) {
                onChange?.(undefined);
                return;
            }

            const item = items?.find((item) => item.value === value);
            onChange?.(value, item);
        }, 1);
    };

    const showClear = !!(hasClear && !!localValue && localValue !== ITEM_CLEAR_VALUE);
    const placeholder = externalPlaceholder ?? (
        <FormattedMessage id={BaseLanguage.component.select.placeholder} defaultMessage="Select..." />
    );

    return (
        <Select value={localValue} onValueChange={handleChange} disabled={disabled}>
            <SelectTrigger
                aria-label="select"
                className={cn('w-full cursor-pointer', className, {
                    'text-muted-foreground': localValue === ITEM_CLEAR_VALUE,
                })}
            >
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent position="popper">
                <SelectGroup>
                    {/* item loading */}
                    <SelectContentLoading loading={loading} />

                    {/* item empty */}
                    <SelectContentEmpty empty={!loading && !items?.length} emptyContent={emptyContent} />

                    {/* item clear */}
                    <SelectItem
                        key={ITEM_CLEAR_VALUE}
                        value={ITEM_CLEAR_VALUE}
                        className={cn('text-muted-foreground cursor-pointer', { hidden: !showClear })}
                    >
                        {placeholder}
                    </SelectItem>

                    {/* list item */}
                    {items?.map((item) => {
                        return (
                            <SelectItem
                                key={item.value}
                                value={item.value}
                                className={cn('cursor-pointer', item.className)}
                            >
                                {typeof item.label === 'function' ? item.label() : item.label}
                            </SelectItem>
                        );
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
