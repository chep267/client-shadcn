/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { cn } from 'cn';
import { useIntl } from 'react-intl';
import { SearchIcon, XIcon } from 'lucide-react';

/** constants */
import { BaseLanguage } from '@modules/base/constants/language';

/** hooks */
import { useLatest } from '@modules/base/hooks/useLatest';

/** components */
import { Input } from '@modules/base/components/input';
import { Button } from '@modules/base/components/button';

export function InputSearch(props: App.Module.Base.Component.InputSearchProps) {
    const {
        ref,
        className,
        value: externalValue = '',
        label = 'Search',
        placeholder: externalPlaceholder,
        onSearch,
        ...otherProps
    } = props;

    const { formatMessage } = useIntl();
    const [localValue, setLocalValue] = React.useState(externalValue);
    const internalRef = React.useRef<HTMLInputElement>(null);
    const eventSearch = useLatest(onSearch);

    React.useEffect(() => {
        if (externalValue !== localValue) {
            setLocalValue(externalValue);
        }
    }, [externalValue]);

    const handleClear = React.useCallback(() => {
        internalRef.current?.focus();
        setLocalValue('');
        React.startTransition(() => {
            eventSearch.current?.('');
        });
    }, []);

    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const nextValue = e.target.value;
        setLocalValue(nextValue);
        React.startTransition(() => {
            eventSearch.current?.(nextValue);
        });
    }, []);

    React.useImperativeHandle(
        ref,
        () => ({
            clear: handleClear,
        }),
        []
    );

    const placeholder =
        externalPlaceholder ||
        formatMessage({ id: BaseLanguage.component.input.placeholder, defaultMessage: 'Search...' });

    return (
        <div
            data-slot="search-container"
            className={cn('relative w-full', 'data-[empty=true]:[&>button]:data-[slot=search-close]:hidden', className)}
            data-empty={!localValue}
        >
            <SearchIcon
                data-slot="search-icon"
                className={cn('absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2', 'text-muted-foreground')}
                aria-hidden="true"
            />

            <Input
                {...otherProps}
                data-slot="search-input"
                type="text"
                role="searchbox"
                ref={internalRef}
                className={cn('px-10')}
                aria-label={label}
                placeholder={placeholder}
                value={localValue}
                onChange={handleChange}
            />

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
                aria-label="Clear search input"
                title="Clear"
                onClick={handleClear}
            >
                <XIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
        </div>
    );
}
