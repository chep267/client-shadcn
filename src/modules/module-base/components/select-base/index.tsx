/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { FormattedMessage } from 'react-intl';

/** constants */
import { BaseLanguage } from '@module-base/constants/BaseLanguage';

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

const placeholderDefault = (
    <FormattedMessage
        id={BaseLanguage.component.select.placeholder}
        defaultMessage={BaseLanguage.component.select.placeholder}
    />
);
const clearTextDefault = (
    <FormattedMessage id={BaseLanguage.component.select.clear} defaultMessage={BaseLanguage.component.select.clear} />
);

export function SelectBase(props: App.ModuleBase.Component.SelectBaseProps) {
    const {
        className,
        value,
        hasClear,
        placeholder = placeholderDefault,
        clearText = clearTextDefault,
        items,
        onChange,
    } = props;

    const handleChange = (value: string) => {
        const item = items?.find((item) => item.value === value);
        onChange?.(value, item);
    };

    const showClear = hasClear && value && value !== 'null' && value !== 'undefined';

    return (
        <Select value={value} onValueChange={handleChange}>
            <SelectTrigger aria-label="select" className={cn('w-full cursor-pointer', className)}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent position="popper">
                <SelectGroup>
                    {showClear && (
                        <SelectItem value="null" className="cursor-pointer">
                            {clearText}
                        </SelectItem>
                    )}
                    {items?.map((item) => {
                        return (
                            <SelectItem
                                key={item.value}
                                value={item.value}
                                disabled={value === item.value}
                                className={cn('cursor-pointer', item.className)}
                            >
                                {item.label}
                            </SelectItem>
                        );
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
