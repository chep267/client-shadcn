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
} from 'react';
import type { UseBoundStore, StoreApi } from 'zustand';

export type TypeInputElement = HTMLInputElement | null;

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

/** Icon base */
export type TypeIconBase = 'app-logo' | 'error' | 'not-found';
export type TypeIconSVGProps = SVGProps<SVGSVGElement>;
export interface TypeIconBaseProps extends SVGProps<SVGSVGElement> {
    name: TypeIconBase;
    size?: number;
    ref?: ((instance: SVGSVGElement | null) => void) | RefObject<SVGSVGElement> | null;
}
export type TypeIconList = Readonly<
    Record<TypeIconBase, LazyExoticComponent<(props: TypeIconBaseProps) => JSX.Element>>
>;

/** input search */
interface InputSearchProps extends ComponentProps<'input'> {
    onSearch?: (value: string) => void;
    debounceTime?: number;
    label?: string;
}

/** Select base */
export type TypeSelectItem<D extends Record<string, unknown>> = {
    className?: string;
    label: ReactNode | (() => ReactNode);
    value: string;
} & D;
export interface SelectBaseProps {
    className?: string;
    value?: string;
    placeholder?: ReactNode;
    hasClear?: boolean;
    clearText?: string;
    items?: TypeSelectItem[];
    onChange?: (value: string, item?: TypeSelectItem) => void;
}

/** Table base */
export type TypeOrderType = 'asc' | 'desc';
export type TypeTableData = Record<string | 'id' | 'action', any>;
export type TypeTableSetup<Data extends TypeTableData = TypeTableData> = {
    hasCheckbox?: boolean;
    dataKeyForCheckbox?: string;
    delayLoading?: number;
    searchKey?: string;
    orderType?: TypeOrderType;
    orderBy?: string;
    filters?: { dataKey: string; value: string; fnFilter?: (item: Data) => boolean }[];
    searchableKeys?: string[];
};
export type TypeTableColumn<Data extends TypeTableData = TypeTableData> = {
    dataKey?: string;
    className?: string;
    label?: ReactNode;
    sortable?: boolean;
    onClickItem?(
        event: MouseEvent<HTMLTableCellElement>,
        data: { indexRow: number; indexCell: number; item: Data }
    ): void;
    render?(data: { indexRow: number; indexCell: number; item: Data }): ReactNode;
};
export type TypeTableStoreData<Data extends TypeTableData = TypeTableData> = {
    loading: boolean;
    hasCheckbox: boolean;
    dataKeyForCheckbox: string;
    delayLoading: number;
    isCheckedAll: boolean;
    isIndeterminate: boolean;
    searchKey: string;
    orderBy: string;
    orderType: TypeOrderType;
    selectedIds: Set<string | number>;
    emptyContent: TableProps['emptyContent'];
    filters: TypeTableSetup<Data>['filters'];
    searchableKeys: TypeTableSetup<Data>['searchableKeys'];
    columns: TypeTableColumn<Data>[];
    items: Data[];
    currentItems: Data[];
};
export type TypeTableStoreAction<Data extends TypeTableData = TypeTableData> = {
    initState: (state: Partial<TypeTableStoreData<Data>>) => void;
    setParam: (key: keyof TypeTableStoreData<Data>, value: any) => void;
    toggleRow: (id: string | number) => void;
    toggleAll: () => void;
    sort: (dataKey?: string, type?: TypeOrderType) => void;
    filter: (filters: TypeTableSetup<Data>['filters']) => void;
    search: (value?: string) => void;
    calculateData: (isImmediate?: boolean) => void;
};
export interface TableStoreProps<Data extends TypeTableData = TypeTableData> {
    data: TypeTableStoreData<Data>;
    action: TypeTableStoreAction<Data>;
}
export type TypeTableStore<Data extends TypeTableData = TypeTableData> = UseBoundStore<StoreApi<TableStoreProps<Data>>>;
export interface TableProps<Data extends TypeTableData = TypeTableData> {
    className?: string;
    initialSetup?: TypeTableSetup;
    items?: Data[];
    emptyContent?: ReactNode | (() => ReactNode);
    columns?: TypeTableColumn[];
    onSelect?(ids: Set<string>): void;
    onSearch?(value: string): void;
}
export interface TableEmptyProps<Data extends TypeTableData = TypeTableData> {
    store: TypeTableStore<Data>;
    emptyContent?: TableProps<Data>['emptyContent'];
}
export interface TableLoadingProps<Data extends TypeTableData = TypeTableData> {
    store: TypeTableStore<Data>;
}
export interface TableHeaderProps<Data extends TypeTableData = TypeTableData> {
    asChild?: boolean;
    className?: string;
    store: TypeTableStore<Data>;
}
export interface TableHeaderCellProps<Data extends TypeTableData = TypeTableData> {
    column: TypeTableColumn<Data>;
    isOrderBy?: boolean;
    orderType?: TypeOrderType;
    sort?: (dataKey?: string) => void;
}
export interface TableBodyProps<Data extends TypeTableData = TypeTableData> {
    className?: string;
    children?: ReactNode;
    store: TypeTableStore<Data>;
}
export interface TableBodyRowProps<Data extends TypeTableData = TypeTableData> {
    asChild?: boolean;
    id: string | number;
    indexRow: number;
    item: Data;
    store: TypeTableStore<Data>;
}
interface TableCellCheckboxAllProps<Data extends TypeTableData = TypeTableData> {
    className?: string;
    store: TypeTableStore<Data>;
}
interface TableCellCheckboxOneProps<Data extends TypeTableData = TypeTableData> {
    className?: string;
    id: string | number;
    store: TypeTableStore<Data>;
}
