/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { InputSearch } from '@module-base/components/input-search';
import { SelectBase } from '@module-base/components/select-base';
import { TableBase } from '@module-base/components/table-base';
import { VirtualTable } from '@module-base/components/virtual-table';

interface TableItem {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
}

export default function FeedScreen() {
    const baseRef: App.ModuleBase.Component.TableProps<TableItem>['ref'] = React.useRef(null);
    const virtualRef: App.ModuleBase.Component.TableProps<TableItem>['ref'] = React.useRef(null);

    return (
        <div className={cn('flex h-full w-full', 'max-h-(--app-size-height-screen)', 'gap-10 px-2 py-4', 'tablet:p-5')}>
            <div
                className={cn(
                    'flex flex-1 flex-col overflow-hidden',
                    'tablet:pt-10 mobile:p-4 gap-4',
                    'mobile:border mobile:rounded-md'
                )}
            >
                <div className={cn('flex w-full flex-col gap-2', 'tablet:flex-row tablet:items-center')}>
                    <InputSearch
                        className="tablet:max-w-sm"
                        onSearch={(text) => {
                            baseRef.current?.action.search(text);
                            virtualRef.current?.action.search(text);
                        }}
                    />
                    <SelectBase
                        className="tablet:max-w-40 tablet:w-fit"
                        popperClassName="h-70"
                        placeholder="Filter by ID"
                        hasClear
                        items={Array.from({ length: 100 })
                            .map((_, index) => `${1 + index}`)
                            .map((value) => {
                                return {
                                    label: value,
                                    value,
                                };
                            })}
                        onChange={(value) => {
                            baseRef.current?.action.filter(value ? [{ value, dataKey: 'id' }] : undefined);
                            virtualRef.current?.action.filter(value ? [{ value, dataKey: 'id' }] : undefined);
                        }}
                    />
                </div>

                <TableBase
                    ref={baseRef}
                    className="max-h-1/2"
                    setup={{ hasCheckbox: true, dataKeyForCheckbox: 'id' }}
                    columns={[
                        { dataKey: 'id', label: 'ID', sortable: true },
                        { dataKey: 'name', label: 'Name', sortable: true },
                        { dataKey: 'email', label: 'Email', sortable: true },
                        { dataKey: 'phone', label: 'Phone' },
                        { dataKey: 'address', label: 'Address' },
                    ]}
                    items={Array.from({ length: 150 }, (_, i) => ({
                        id: i + 1,
                        name: `user${i + 1}`,
                        email: `user${i + 1}@gmail.com`,
                        phone: `0900000${String(i + 1).padStart(3, '0')}`,
                        address: `${i + 1} Hoang Quoc Viet, Ha Noi, Viet Nam`,
                    }))}
                />

                <VirtualTable
                    ref={virtualRef}
                    className="max-h-1/2"
                    setup={{ hasCheckbox: true, dataKeyForCheckbox: 'id' }}
                    columns={[
                        { dataKey: 'id', label: 'ID', sortable: true },
                        { dataKey: 'name', label: 'Name', sortable: true },
                        { dataKey: 'email', label: 'Email', sortable: true },
                        { dataKey: 'phone', label: 'Phone' },
                        { dataKey: 'address', label: 'Address' },
                    ]}
                    items={Array.from({ length: 9999 }, (_, i) => ({
                        id: i + 1,
                        name: `user${i + 1}`,
                        email: `user${i + 1}@gmail.com`,
                        phone: `0900000${String(i + 1).padStart(3, '0')}`,
                        address: `${i + 1} Hoang Quoc Viet, Ha Noi, Viet Nam`,
                    }))}
                />
            </div>
        </div>
    );
}
