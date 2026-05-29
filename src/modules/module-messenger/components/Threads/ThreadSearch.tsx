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
import { ThreadSearchList } from '@module-messenger/components/Threads/ThreadSearchList';

export function ThreadSearch() {
    const inputRef = React.useRef<App.ModuleBase.Component.InputSearchRef>(null);
    const openSearch = useMessengerStore((store) => store.data.openSearch);
    const action = useMessengerStore((store) => store.action);

    React.useEffect(() => {
        action.closeSearch();
    }, []);

    React.useEffect(() => {
        inputRef.current?.clear?.();
    }, [openSearch]);

    return (
        <div
            className={cn(
                'absolute inset-0 z-1',
                'bg-card flex flex-1 flex-col',
                'h-0 w-full overflow-hidden',
                'transition-all duration-200 ease-linear',
                {
                    'h-full': openSearch,
                    '[&>div]:invisible': !openSearch,
                }
            )}
        >
            <InputSearch
                className="border-b p-2"
                ref={inputRef}
                placeholder="Search"
                onSearch={action.changeSearchKey}
            />
            <ThreadSearchList />
        </div>
    );
}
