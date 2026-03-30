/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type {
    FunctionComponent,
    PropsWithChildren,
    LazyExoticComponent,
    RefObject,
    SVGProps,
    ReactNode,
    MouseEvent,
} from 'react';
import type { TypeItemIds } from '@module-base/types/data';

export type TypeInputElem = HTMLInputElement | null;

/** ErrorBoundary */
export interface TypeNotifyProviderProps extends PropsWithChildren {
    fallback?: FunctionComponent;
    isAutoReload?: boolean;
}
export interface TypeNotifyProviderStates {
    hasError: boolean;
}
export interface TypeFallbackDefaultProps {
    isAutoReload?: boolean;
}

/** IconBase */
type TypeIconBase = 'app-logo' | 'error' | 'not-found';
export type TypeIconSVGProps = SVGProps<SVGSVGElement>;
export interface TypeIconBaseProps extends SVGProps<SVGSVGElement> {
    name: TypeIconBase;
    size?: number;
    ref?: ((instance: SVGSVGElement | null) => void) | RefObject<SVGSVGElement> | null;
}
export type TypeIconList = Readonly<Record<TypeIconBase, LazyExoticComponent<(props: IconBaseProps) => JSX.Element>>>;

/** TableBase */
export type TypeOrderType = 'asc' | 'desc';
export type TypeTableData<Data extends Record<string | 'id' | 'action', any>> = Data;
type TypeTableSetup = {
    hasCheckbox?: boolean;
    dataKeyForCheckbox?: string;
    delayLoading?: number;
};
type TypeTableState = {
    searchValue?: string;
    orderType?: TypeOrderType;
    orderBy?: string;
    selectedItems?: TypeItemIds;
    filters?: { dataKey: string; value: string }[];
};
type TypeTableColumn = {
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
export interface TypeTableProps<Data extends TypeTableData> {
    className?: string;
    initialSetup?: TypeTableSetup;
    initialValue?: TypeTableState;
    items?: Data[];
    emptyContent?: ReactNode | (() => ReactNode);
    columns?: TypeTableColumn[];
    onSelect?(ids: Set<string>): void;
    onSearch?(value: string): void;
}
export interface TableEmptyProps<Data extends TypeTableData> {
    hidden?: boolean;
    emptyContent?: TypeTableProps<Data>['emptyContent'];
}
export interface TableLoadingProps {
    loading?: TableSetup['loading'];
}
export interface TypeTableHeaderProps<Data extends TypeTableData> {
    asChild?: boolean;
    className?: string;
    columns?: TypeTableProps<Data>['columns'];
    hasCheckbox?: TypeTableSetup['hasCheckbox'];
    checked?: boolean | 'indeterminate';
    orderType?: TypeTableState['orderType'];
    orderBy?: TypeTableState['orderBy'];
    onSort?(dataKey?: string): void;
    onSelect?(checked: boolean | 'indeterminate'): void;
}
export interface TypeTableBodyProps<Data extends TypeTableData> extends Pick<
    TypeTableProps<Data>,
    'className' | 'columns' | 'emptyContent'
> {
    items: NonNullable<TypeTableProps<Data>['items']>;
    selectedIds: Set<string | number>;
    loading?: TypeTableSetup['loading'];
    hasCheckbox?: TypeTableSetup['hasCheckbox'];
    dataKeyForCheckbox?: TypeTableSetup['dataKeyForCheckbox'];
    onSelect?(item: Data): void;
}
