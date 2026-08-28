/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { useIntl } from 'react-intl';
import { SearchIcon, XIcon } from 'lucide-react';
import delay from 'lodash-es/delay';

/** constants */
import { BaseLanguage } from '@module-base/constants/language';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { Input } from '@module-base/components/input';
import { Button } from '@module-base/components/button';

export function InputSearch(props: App.ModuleBase.Component.InputSearchProps) {
    const {
        ref,
        className,
        value: externalValue,
        label = 'Search',
        placeholder: externalPlaceholder,
        onSearch,
        ...otherProps
    } = props;

    const { formatMessage } = useIntl();
    const [localValue, setLocalValue] = React.useState(externalValue);
    const internalRef = React.useRef<HTMLInputElement>(null);

    const placeholder =
        externalPlaceholder ||
        formatMessage({ id: BaseLanguage.component.input.placeholder, defaultMessage: 'Search...' });

    const handleClear = React.useCallback(() => {
        setLocalValue('');
        internalRef.current?.focus();
        delay(() => onSearch?.(''), 1);
    }, [onSearch]);

    const handleChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const nextValue = e.target.value;
            setLocalValue(nextValue);
            delay(() => onSearch?.(nextValue), 1);
        },
        [onSearch]
    );

    const SearchIconElement = React.useMemo(() => {
        return (
            <SearchIcon
                data-slot="search-icon"
                className={cn('absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2', 'text-muted-foreground')}
                aria-hidden="true"
            />
        );
    }, []);

    const SearchClearButton = React.useMemo(() => {
        return (
            <Button
                data-slot="search-close"
                type="button"
                variant="ghost"
                size="icon"
                className={cn(
                    'absolute top-1/2 right-1 h-7 w-7 -translate-y-1/2',
                    'cursor-pointer rounded-full',
                    'text-muted-foreground hover:text-foreground hover:bg-transparent'
                )}
                onClick={handleClear}
                aria-label="Clear search input"
                title="Clear"
            >
                <XIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
        );
    }, []);

    React.useImperativeHandle(
        ref,
        () => ({
            clear: handleClear,
        }),
        [handleClear]
    );

    return (
        <div
            data-slot="search-container"
            className={cn('relative w-full', 'data-[empty=true]:[&>button]:data-[slot=search-close]:hidden', className)}
            data-empty={!localValue}
        >
            {SearchIconElement}

            <Input
                data-slot="search-input"
                {...otherProps}
                ref={internalRef}
                type="text"
                role="searchbox"
                placeholder={placeholder}
                value={localValue}
                onChange={handleChange}
                className={cn('pr-9 pl-9 focus-visible:ring-2')}
                aria-label={label}
            />

            {SearchClearButton}
        </div>
    );
}
