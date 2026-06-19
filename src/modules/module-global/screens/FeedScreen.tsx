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
import { VirtualTable } from '@module-base/components/virtual-table';
import { InputSearch } from '@module-base/components/input-search';

export default function FeedScreen() {
    const [searchValue, setSearchValue] = React.useState('');

    return (
        <div className="tablet:p-5 flex h-full w-full flex-col gap-10 px-2 py-4">
            <div className={cn('flex flex-1 flex-col', 'tablet:pt-10 gap-4 p-4', 'rounded-md border')}>
                <InputSearch value={searchValue} className="tablet:max-w-sm col-span-4" onSearch={setSearchValue} />
                <VirtualTable
                    className="scrollbar-custom scrollbar-thin"
                    setup={{ hasCheckbox: true, dataKeyForCheckbox: 'id', searchKey: searchValue }}
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
    );
}
