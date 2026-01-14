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
    ChangeEvent,
    MouseEvent,
} from 'react';

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
type TypeIconBase = 'appLogo' | 'error' | 'notFound';
export type TypeIconSVGProps = SVGProps<SVGSVGElement>;
export interface TypeIconBaseProps extends SVGProps<SVGSVGElement> {
    name: TypeIconBase;
    size?: number;
    ref?: ((instance: SVGSVGElement | null) => void) | RefObject<SVGSVGElement> | null;
}
export type TypeIconList = Readonly<Record<TypeIconBase, LazyExoticComponent<(props: IconBaseProps) => JSX.Element>>>;

/** TableBase */
export type TypeOrderType = 'asc' | 'desc';
export type TypeTableData = Record<string | number, any> | any[];
export type TypeDataKey<Data extends TypeTableData> = Data extends any[]
    ? number
    : Extract<keyof Data, string | number>;
export interface TypeTableBaseProps<Data extends TypeTableData = TypeTableData> extends TableProps {
    data?: readonly Data[];
    loading?: boolean;
    emptyContent?: ReactNode;
    hasCheckbox?: boolean;
    dataKeyForCheckbox?: TypeDataKey<Data>;
    columns?: (Omit<TableCellProps, 'children'> & {
        dataKey: TypeDataKey<Data>;
        label: ReactNode;
        hasSort?: boolean;
        onClickItem?(
            event: MouseEvent<HTMLTableCellElement>,
            data: { indexRow: number; indexCell: number; item: Data }
        ): void;
        itemContent?(data: { indexRow: number; indexCell: number; item: Data }): ReactNode;
    })[];
    onChangeSelected?(arr: Array<Data[TypeDataKey<Data>]>): void;
}
export interface TypeTableHeaderProps<Data extends TypeTableData = TypeTableData> {
    columns?: TypeTableBaseProps<Data>['columns'];
    hasCheckbox?: boolean;
    checked?: boolean;
    indeterminate?: boolean;
    orderType?: TypeOrderType;
    orderBy?: TypeDataKey<Data>;
    onSort?(newKey: TypeDataKey<Data>, prevKey: TypeDataKey<Data>): void;
    onSelectAll?(event: ChangeEvent<HTMLInputElement>): void;
}
export interface TypeTableContentProps<Data extends TypeTableData = TypeTableData> {
    columns?: TypeTableBaseProps<Data>['columns'];
    hasCheckbox?: boolean;
    indexRow: number;
    item: Data;
    checked?: boolean;
    onSelect?(item: Data): void;
}
export interface TypeCheckboxColumnProps extends CheckboxProps {
    hasCheckbox?: boolean;
}

/** Virtual Table */
export interface TypeVirtualTableProps<Data extends TypeTableData, Context = any> extends TableVirtuosoProps<
    Data,
    Context
> {
    loading?: boolean;
    emptyContent?: ReactNode;
    hasCheckbox?: boolean;
    dataKeyForCheckbox?: TypeDataKey<Data>;
    columns?: TypeTableBaseProps<Data>['columns'];
    onChangeSelected?(arr: Array<Data[TypeDataKey<Data>]>): void;
}
