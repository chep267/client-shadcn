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
import { Spinner } from '@module-base/components/spinner';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@module-base/components/select';

const ITEM_CLEAR_VALUE = '__MODULE_BASE_SELECT_CLEAR_ITEM_DO_NOT_USE__';
const ITEM_EMPTY_VALUE = '__MODULE_BASE_SELECT_EMPTY_ITEM_DO_NOT_USE__';

export function SelectBase<Value extends string = string>(props: App.ModuleBase.Component.SelectBaseProps<Value>) {
    const {
        className,
        popperClassName,
        value: externalValue,
        hasClear,
        loading,
        disabled,
        placeholder: externalPlaceholder,
        clearContent: externalClearContent,
        emptyContent: externaEmptyContent,
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
                onChange?.();
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
    const clearContent = externalClearContent ?? (
        <FormattedMessage id={BaseLanguage.component.select.clear} defaultMessage="-- Clear --" />
    );
    const emptyContent = externaEmptyContent ?? (
        <FormattedMessage id={BaseLanguage.component.select.empty} defaultMessage="No data!" />
    );

    return (
        <Select value={localValue} onValueChange={handleChange} disabled={loading || disabled}>
            <SelectTrigger
                aria-label="select"
                className={cn('w-full cursor-pointer', className, {
                    'text-muted-foreground': localValue === ITEM_CLEAR_VALUE,
                })}
            >
                {loading ? (
                    <Spinner />
                ) : localValue === ITEM_CLEAR_VALUE ? (
                    placeholder
                ) : (
                    <SelectValue placeholder={placeholder} />
                )}
            </SelectTrigger>

            <SelectContent className={popperClassName} position="popper">
                <SelectGroup>
                    {/* item clear */}
                    <SelectItem
                        key={ITEM_CLEAR_VALUE}
                        value={ITEM_CLEAR_VALUE}
                        className={cn('text-muted-foreground cursor-pointer overflow-hidden', {
                            'h-0 opacity-0': !showClear,
                            hidden: !items?.length,
                        })}
                    >
                        {clearContent}
                    </SelectItem>

                    {/* item empty */}
                    {!items?.length && (
                        <SelectItem key={ITEM_EMPTY_VALUE} value={ITEM_EMPTY_VALUE} disabled>
                            {emptyContent}
                        </SelectItem>
                    )}

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
