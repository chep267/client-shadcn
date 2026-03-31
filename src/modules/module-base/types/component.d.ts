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
} from 'react';
import type { TypeItemIds } from '@module-base/types/data';
import * as React from 'react';

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
interface InputSearchProps extends React.ComponentProps<'input'> {
    onSearch?: (value: string) => void;
    debounceTime?: number;
    label?: string;
}

/** Select base */
export type TypeSelectItem<D extends Record<string, unknown>> = {
    className?: string;
    label: React.ReactNode | (() => React.ReactNode);
    value: string;
} & D;
export interface SelectBaseProps {
    className?: string;
    value?: string;
    placeholder?: string;
    hasClear?: boolean;
    clearText?: string;
    items?: TypeSelectItem[];
    onChange?: (value: string, item?: TypeSelectItem) => void;
}

/** Table base */
export type TypeOrderType = 'asc' | 'desc';
export type TypeTableData = Record<string | 'id' | 'action', any>;
export type TypeTableSetup = {
    hasCheckbox?: boolean;
    dataKeyForCheckbox?: string;
    delayLoading?: number;
};
export type TypeTableState = {
    searchValue?: string;
    orderType?: TypeOrderType;
    orderBy?: string;
    selectedItems?: TypeItemIds;
    filters?: { dataKey: string; value: string; fnFilter?: (item: TypeTableData) => boolean }[];
};
export type TypeTableColumn = {
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
export interface TableProps<Data extends TypeTableData = TypeTableData> {
    className?: string;
    initialSetup?: TypeTableSetup;
    initialValue?: TypeTableState;
    items?: Data[];
    emptyContent?: ReactNode | (() => ReactNode);
    columns?: TypeTableColumn[];
    onSelect?(ids: Set<string>): void;
    onSearch?(value: string): void;
}
export interface TableEmptyProps<Data extends TypeTableData = TypeTableData> {
    hidden?: boolean;
    emptyContent?: TableProps<Data>['emptyContent'];
}
export interface TableLoadingProps {
    loading?: TableSetup['loading'];
}
export interface TableHeaderProps<Data extends TypeTableData = TypeTableData> {
    asChild?: boolean;
    className?: string;
    columns?: TableProps<Data>['columns'];
    hasCheckbox?: TypeTableSetup['hasCheckbox'];
    checked?: boolean | 'indeterminate';
    orderType?: TypeTableState['orderType'];
    orderBy?: TypeTableState['orderBy'];
    onSort?(dataKey?: TypeTableState['orderBy']): void;
    onSelect?(checked: boolean | 'indeterminate'): void;
}
export interface TableBodyProps<Data extends TypeTableData = TypeTableData> extends Pick<
    TableProps<Data>,
    'className' | 'columns' | 'emptyContent'
> {
    items: NonNullable<TableProps<Data>['items']>;
    selectedIds: Set<string | number>;
    loading?: TypeTableSetup['loading'];
    hasCheckbox?: TypeTableSetup['hasCheckbox'];
    dataKeyForCheckbox?: TypeTableSetup['dataKeyForCheckbox'];
    onSelect?(item: Data): void;
}
export interface TableBodyRowProps<Data extends TypeTableData = TypeTableData> extends Pick<
    App.ModuleBase.Component.TableBodyProps<Data>,
    'hasCheckbox' | 'columns' | 'onSelect'
> {
    asChild?: boolean;
    checked: boolean;
    indexRow: number;
    item: Data;
}
