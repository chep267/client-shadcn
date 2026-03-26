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
import type { TableVirtuosoProps } from 'react-virtuoso';
import type { ColumnDef } from '@tanstack/react-table';
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
export type TypeDataKey<Data extends TypeTableData> = Extract<keyof Data, string> | 'id' | 'action';
export interface TypeTableBaseProps<Data extends TypeTableData> {
    className?: string;
    loading?: boolean;
    emptyContent?: ReactNode;
    hasCheckbox?: boolean;
    selectedItems?: TypeItemIds;
    items?: Data[];
    dataKeyForCheckbox?: string;
    columns?: {
        dataKey?: string;
        className?: string;
        label?: ReactNode;
        sortable?: boolean;
        onClickItem?(
            event: MouseEvent<HTMLTableCellElement>,
            data: { indexRow: number; indexCell: number; item: Data }
        ): void;
        render?(data: { indexRow: number; indexCell: number; item: Data }): ReactNode;
    }[];
    onChangeSelected?(arr: Array<Data[string]>): void;
}
export interface TypeTableBaseHeaderProps<Data extends TypeTableData> {
    asChild?: boolean;
    className?: string;
    columns?: TypeTableBaseProps<Data>['columns'];
    hasCheckbox?: boolean;
    checked?: boolean | 'indeterminate';
    orderType?: TypeOrderType;
    orderBy?: string;
    onSort?(dataKey: string): void;
    onSelect?(checked: boolean | 'indeterminate'): void;
}
export interface TypeTableBaseBodyProps<Data extends TypeTableData> extends Pick<
    TypeTableBaseProps<Data>,
    'className' | 'columns' | 'dataKeyForCheckbox' | 'hasCheckbox' | 'loading' | 'emptyContent'
> {
    items: NonNullable<TypeTableBaseProps<Data>['items']>;
    selectedIds: Set<Data[string]>;
    onSelect?(item: Data): void;
}

/** Virtual Table */
export interface TypeVirtualTableProps<Data extends TypeTableData, Context = any> extends TableVirtuosoProps<
    Data,
    Context
> {
    loading?: boolean;
    emptyContent?: ReactNode;
    hasCheckbox?: boolean;
    dataKeyForCheckbox?: string;
    columns?: ColumnDef<{ id: string | number; name: string; test: string }>[];
    onChangeSelected?(arr: Array<Data[string]>): void;
}
