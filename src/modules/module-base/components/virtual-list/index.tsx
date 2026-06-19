/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { type VirtuosoHandle, Virtuoso } from 'react-virtuoso';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** stores */
import { createBigdataStore } from '@module-base/stores/useBigdataStore';

/** components */
import { ListLoading } from '@module-base/components/virtual-list/list-loading';
import { ListEmpty } from '@module-base/components/virtual-list/list-empty';

export function VirtualList<Data extends App.ModuleBase.Component.Bigdata = App.ModuleBase.Component.Bigdata>(
    props: App.ModuleBase.Component.ListProps<Data>
) {
    const { className, setup, items, emptyContent, ...otherProps } = props;

    const virtuoso = React.useRef<VirtuosoHandle>(null);
    const dataStore = React.useMemo(() => createBigdataStore<Data>(), []);

    const action = dataStore((state) => state.action);
    const currentItems = dataStore((state) => state.data.currentItems);
    const isTableEmpty = currentItems.length === 0;

    React.useEffect(() => {
        action.init({
            ref: virtuoso.current,
            items,
            emptyContent,
            ...setup,
        });
    }, [items, emptyContent, JSON.stringify(setup)]);

    return (
        <div className={cn('relative flex-1 overflow-hidden', 'min-h-40', { 'max-h-40': isTableEmpty }, className)}>
            <ListLoading store={dataStore} />
            <ListEmpty store={dataStore} />
            {React.useMemo(() => {
                return (
                    <Virtuoso
                        ref={virtuoso}
                        className={cn('h-full w-full', className)}
                        data={currentItems}
                        {...otherProps}
                    />
                );
            }, [className, currentItems, otherProps])}
        </div>
    );
}
