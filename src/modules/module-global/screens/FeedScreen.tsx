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
import { TableBase } from '@module-base/components/table-base';
import { VirtualTable } from '@module-base/components/virtual-table';

type TableItem = { id: number; name: string; email: string; phone: string; address: string };

export default function FeedScreen() {
    const baseRef: App.ModuleBase.Component.TableProps<TableItem>['ref'] = React.useRef(null);
    const virtualRef: App.ModuleBase.Component.TableProps<TableItem>['ref'] = React.useRef(null);

    return (
        <div className="tablet:p-5 flex h-full max-h-(--app-size-height-screen) w-full flex-col gap-10 px-2 py-4">
            <div className={cn('flex flex-1 flex-col', 'tablet:pt-10 gap-4 p-4', 'rounded-md border')}>
                <InputSearch
                    className="tablet:max-w-sm col-span-4"
                    onSearch={(text) => {
                        baseRef.current?.action.search(text);
                        virtualRef.current?.action.search(text);
                    }}
                />
                <div className="relative flex-1 overflow-hidden">
                    <TableBase
                        ref={baseRef}
                        className="scrollbar-custom absolute inset-0 z-10 max-h-full scrollbar-thin"
                        setup={{ hasCheckbox: true, dataKeyForCheckbox: 'id' }}
                        items={Array.from({ length: 99 }, (_, i) => ({
                            id: i + 1,
                            name: `user${i + 1}`,
                            email: `user${i + 1}@gmail.com`,
                            phone: `0900000${String(i + 1).padStart(3, '0')}`,
                            address: `${i + 1} Hoang Quoc Viet, Ha Noi, Viet Nam`,
                        }))}
                        columns={[
                            { dataKey: 'id', label: 'ID', sortable: true },
                            { dataKey: 'name', label: 'Name', sortable: true },
                            { dataKey: 'email', label: 'Email', sortable: true },
                            { dataKey: 'phone', label: 'Phone' },
                            { dataKey: 'address', label: 'Address' },
                        ]}
                    />
                </div>

                <div className="relative flex-1 overflow-hidden">
                    <VirtualTable
                        ref={virtualRef}
                        className="scrollbar-custom scrollbar-thin"
                        setup={{ hasCheckbox: true, dataKeyForCheckbox: 'id' }}
                        items={Array.from({ length: 9999 }, (_, i) => ({
                            id: i + 1,
                            name: `user${i + 1}`,
                            email: `user${i + 1}@gmail.com`,
                            phone: `0900000${String(i + 1).padStart(3, '0')}`,
                            address: `${i + 1} Hoang Quoc Viet, Ha Noi, Viet Nam`,
                        }))}
                        columns={[
                            { dataKey: 'id', label: 'ID', sortable: true },
                            { dataKey: 'name', label: 'Name', sortable: true },
                            { dataKey: 'email', label: 'Email', sortable: true },
                            { dataKey: 'phone', label: 'Phone' },
                            { dataKey: 'address', label: 'Address' },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}
