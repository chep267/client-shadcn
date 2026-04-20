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
import { Spinner } from '@module-base/components/spinner';

export function SelectBase(props: App.ModuleBase.Component.SelectBaseProps) {
    const {
        className,
        value,
        hasClear,
        loading,
        disabled,
        placeholder: placeholderProps,
        clearContent: clearContentProps,
        emptyContent: emptyContentProps,
        items,
        onChange,
    } = props;

    const handleChange = (value: string) => {
        const item = items?.find((item) => item.value === value)?.item;
        onChange?.(value, item);
    };

    const showClear = hasClear && value && value !== 'null' && value !== 'undefined';
    const placeholder = placeholderProps ?? (
        <FormattedMessage id={BaseLanguage.component.select.placeholder} defaultMessage="Select..." />
    );
    const clearContent = clearContentProps ?? (
        <FormattedMessage id={BaseLanguage.component.select.clear} defaultMessage="-- Clear --" />
    );
    const emptyContent = emptyContentProps ?? (
        <FormattedMessage id={BaseLanguage.component.select.empty} defaultMessage="No data!" />
    );

    return (
        <Select value={value} onValueChange={handleChange} disabled={disabled}>
            <SelectTrigger aria-label="select" className={cn('w-full cursor-pointer', className)}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent position="popper">
                <SelectGroup>
                    {showClear && (
                        <SelectItem value="null" className="cursor-pointer">
                            {clearContent}
                        </SelectItem>
                    )}

                    {loading ? (
                        <SelectItem value="null" className="cursor-pointer items-center justify-center px-0" disabled>
                            <Spinner />
                        </SelectItem>
                    ) : null}

                    {!loading && !items?.length ? (
                        <SelectItem value="null" className="cursor-pointer" disabled>
                            {emptyContent}
                        </SelectItem>
                    ) : null}

                    {!loading
                        ? items?.map((item) => {
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
                          })
                        : null}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
