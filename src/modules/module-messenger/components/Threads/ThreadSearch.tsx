/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import * as React from 'react';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** stores */
import { useMessengerStore } from '@module-messenger/stores/useMessengerStore';

/** components */
import { InputSearch } from '@module-base/components/input-search';

export function ThreadSearch() {
    const inputRef = React.useRef<App.ModuleBase.Component.InputSearchRef>(null);
    const openSearch = useMessengerStore((store) => store.data.openSearch);
    const action = useMessengerStore((store) => store.action);

    React.useEffect(() => {
        inputRef.current?.clear?.();
    }, [openSearch]);

    return (
        <div
            className={cn('h-0 w-full overflow-hidden', 'transition-all duration-200 ease-linear', {
                'h-auto border-b p-2': openSearch,
                '[&>div]:invisible': !openSearch,
            })}
        >
            <InputSearch ref={inputRef} placeholder="Search" onSearch={action.changeSearchKey} />
        </div>
    );
}
