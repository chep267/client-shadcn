/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import {
    type FunctionComponent,
    type PropsWithChildren,
    type LazyExoticComponent,
    type RefObject,
    type SVGProps,
    type ReactNode,
    type MouseEvent,
    type ComponentProps,
    type Ref,
} from 'react';
import type { UseBoundStore, StoreApi } from 'zustand';
import type { VirtuosoProps, VirtuosoHandle, TableVirtuosoHandle, TableVirtuosoProps } from 'react-virtuoso';
import type { ItemId, OrderType } from '@module-base/types/data.d';

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/** ErrorBoundary */
export interface NotifyProviderProps extends PropsWithChildren {
    fallback?: FunctionComponent;
    isAutoReload?: boolean;
}
export interface NotifyProviderStates {
    hasError: boolean;
}
export interface FallbackDefaultProps {
    isAutoReload?: boolean;
}

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/** Icon base */
export type IconBase = 'app-logo' | 'error' | 'not-found';
export type IconSVGProps = SVGProps<SVGSVGElement>;
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
    name: IconBase;
    size?: number;
    ref?: ((instance: SVGSVGElement | null) => void) | RefObject<SVGSVGElement> | null;
}
export type IconBaseList = Readonly<Record<IconBase, LazyExoticComponent<(props: IconBaseProps) => JSX.Element>>>;

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/** Input */
export type InputElement = HTMLInputElement | null;
export interface InputSearchRef {
    clear: () => void;
}
export interface InputSearchProps extends ComponentProps<'input'> {
    onSearch?: (value: string) => void;
    debounceTime?: number;
    label?: string;
    ref?: Ref<InputSearchRef | null>;
}

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/** Select base */
export type SelectBaseItem<Value extends string = string> = {
    className?: string;
    label: ReactNode | (() => ReactNode);
    value: Value;
} & Record<string, unknown>;
export interface SelectBaseProps<Value extends string = string> {
    className?: string;
    value?: Value;
    placeholder?: ReactNode;
    loading?: boolean;
    disabled?: boolean;
    hasClear?: boolean;
    clearContent?: ReactNode;
    emptyContent?: ReactNode;
    items?: SelectBaseItem<Value>[];
    onChange?: (value: Value, item?: SelectBaseItem<Value>) => void;
}

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/** Big data store */
export type ElementContent = ReactNode | (() => ReactNode);
export type Column<Data extends Bigdata = Bigdata> = {
    className?: string;
    dataKey?: BigdataKey<Data>;
    label?: ElementContent;
    sortable?: boolean;
    onClick?(event: MouseEvent<HTMLTableCellElement>, data: { indexRow: number; indexCell: number; item: Data }): void;
    render?(data: { indexRow: number; indexCell: number; item: Data }): ReactNode;
};
export type Bigdata = unknown;

type DeepKeyOf<T> = T extends object
    ? {
          [K in keyof T & (string | number)]: T[K] extends any[]
              ? `${K}`
              : T[K] extends object
                ? `${K}` | `${K}.${DeepKeyOf<T[K]>}`
                : `${K}`;
      }[keyof T & (string | number)]
    : string;
export type BigdataKey<Data extends Bigdata = Bigdata> = DeepKeyOf<Data> | 'id' | 'action';
type BigdataStoreData<Data extends Bigdata = Bigdata> = {
    // state
    element: RefObject<TableVirtuosoHandle | VirtuosoHandle | HTMLTableElement | null> | null;
    loading: boolean;
    isCheckedAll: boolean;
    isIndeterminate: boolean;
    searchKey: string;
    orderBy?: BigdataKey<Data>;
    orderType?: OrderType;
    selectedIds: Set<ItemId>;

    // setup
    hasCheckbox: boolean;
    dataKeyForCheckbox: BigdataKey<Data>;
    searchableKeys: BigdataKey<Data>[];
    filters: { dataKey: BigdataKey<Data>; value: string; fnFilter?: (item: Data) => boolean }[];

    // data
    columns: Column<Data>[];
    emptyContent: ElementContent;
    items: Data[];
    currentItems: Data[];
};
type BigdataStoreAction<Data extends Bigdata = Bigdata> = {
    setup: (data: Partial<BigdataStoreData<Data>>) => void;
    toggleOne: (id: ItemId) => void;
    toggleAll: () => void;
    sort: (orderBy?: BigdataKey<Data>, orderType?: OrderType) => void;
    filter: (filters: BigdataStoreData<Data>['filters']) => void;
    search: (value?: BigdataStoreData<Data>['searchKey']) => void;
    calculateData: (isImmediate?: boolean) => void;
};
export interface BigdataStore<Data extends Bigdata = Bigdata> {
    data: BigdataStoreData<Data>;
    action: BigdataStoreAction<Data>;
}
export interface ComponentWithBigdataStoreProps<Data extends Bigdata = Bigdata> {
    store: UseBoundStore<StoreApi<BigdataStore<Data>>>;
}

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/** List base */
export interface ListProps<Data extends Bigdata = Bigdata> extends VirtuosoProps<Data, unknown> {
    ref?: Ref<{
        element: BigdataStoreData<Data>['element'];
        action: BigdataStoreAction<Data>;
    }>;
    className?: string;
    items?: Data[];
    setup?: Partial<
        Pick<
            BigdataStoreData<Data>,
            | 'loading'
            | 'hasCheckbox'
            | 'dataKeyForCheckbox'
            | 'searchKey'
            | 'orderBy'
            | 'orderType'
            | 'searchableKeys'
            | 'filters'
        >
    >;
    emptyContent?: ElementContent;
}

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/** Table base */
export interface TableProps<Data extends Bigdata = Bigdata> extends TableVirtuosoProps<Data, unknown> {
    ref?: Ref<{
        element: BigdataStoreData<Data>['element'];
        action: BigdataStoreAction<Data>;
    }>;
    className?: string;
    items?: Data[];
    setup?: Partial<
        Pick<
            BigdataStoreData<Data>,
            | 'loading'
            | 'hasCheckbox'
            | 'dataKeyForCheckbox'
            | 'searchKey'
            | 'orderBy'
            | 'orderType'
            | 'searchableKeys'
            | 'filters'
        >
    >;
    emptyContent?: ElementContent;
    columns?: Column<Data>[];
}
export interface TableHeaderProps<Data extends Bigdata = Bigdata> extends ComponentWithBigdataStoreProps<Data> {
    className?: string;
}
export interface TableHeaderCellProps<Data extends Bigdata = Bigdata> extends ComponentWithBigdataStoreProps<Data> {
    column: Column<Data>;
}
export interface TableBodyProps<Data extends Bigdata = Bigdata> extends ComponentWithBigdataStoreProps<Data> {
    className?: string;
    children?: ReactNode;
}
export interface TableBodyRowProps<Data extends Bigdata = Bigdata> extends ComponentWithBigdataStoreProps<Data> {
    asChild?: boolean;
    indexRow: number;
    item: Data;
}
interface TableCellCheckboxAllProps<Data extends Bigdata = Bigdata> extends ComponentWithBigdataStoreProps<Data> {
    className?: string;
}
interface TableCellCheckboxOneProps<Data extends Bigdata = Bigdata> extends ComponentWithBigdataStoreProps<Data> {
    className?: string;
    id: string | number;
}
