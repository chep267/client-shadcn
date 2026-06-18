/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** components */
import { TableBase } from '@module-base/components/table-base';
import { VirtualTable } from '@module-base/components/virtual-table';

export default function FeedScreen() {
    return (
        <div className="tablet:p-5 flex h-full w-full flex-col gap-10 px-2 py-4">
            <TableBase
                className="scrollbar-custom max-h-[40dvh] scrollbar-thin"
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

            <VirtualTable
                className="scrollbar-custom max-h-[40dvh] scrollbar-thin"
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
    );
}
