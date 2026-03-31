/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { useIntl } from 'react-intl';
import { SearchIcon, XIcon } from 'lucide-react';

/** constants */
import { BaseLanguage } from '@module-base/constants/BaseLanguage';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { Input } from '@module-base/components/input';
import { Button } from '@module-base/components/button';

export function InputSearch(props: App.ModuleBase.Component.InputSearchProps) {
    const {
        ref,
        id,
        className,
        value: externalValue,
        label = 'Search',
        placeholder: externalPlaceholder,
        onSearch,
        ...otherProps
    } = props;

    const { formatMessage } = useIntl();
    const [localValue, setLocalValue] = React.useState<string>((externalValue as string) ?? '');
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const internalRef = React.useRef<HTMLInputElement>(null);

    const placeholder =
        externalPlaceholder ||
        formatMessage({ id: BaseLanguage.component.input.placeholder, defaultMessage: 'Search...' });

    React.useImperativeHandle(ref, () => internalRef.current!);

    const handleClear = () => {
        setLocalValue('');
        onSearch?.('');
        internalRef.current?.focus();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setLocalValue(newValue);
        onSearch?.(newValue);
    };

    return (
        <div className={cn('relative w-full', className)}>
            <label htmlFor={inputId} className="sr-only">
                {label}
            </label>

            <div className="relative">
                <SearchIcon
                    className={cn('absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2', 'text-muted-foreground')}
                    aria-hidden="true"
                />

                <Input
                    {...otherProps}
                    id={inputId}
                    ref={internalRef}
                    type="text"
                    role="searchbox"
                    placeholder={placeholder}
                    value={localValue}
                    onChange={handleChange}
                    className={cn('pr-9 pl-9 focus-visible:ring-2')}
                    aria-label={label}
                />

                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className={cn(
                        'absolute top-1/2 right-1 h-7 w-7 -translate-y-1/2',
                        'cursor-pointer rounded-full',
                        'text-muted-foreground hover:text-foreground hover:bg-transparent',
                        { hidden: !localValue }
                    )}
                    onClick={handleClear}
                    aria-label="Clear search input"
                    title="Clear"
                >
                    <XIcon className="h-4 w-4" aria-hidden="true" />
                </Button>
            </div>

            <span className="sr-only" aria-live="polite">
                {localValue ? `Searching for ${localValue}` : 'Search input cleared'}
            </span>
        </div>
    );
}
