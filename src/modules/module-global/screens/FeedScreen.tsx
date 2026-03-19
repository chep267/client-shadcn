/** components */
import { TableBase } from '@module-base/components/table-base';
// import { DataTable } from '@module-base/components/table-vituaso/data-table';

export default function FeedScreen() {
    return (
        <div className="flex h-full w-full flex-col p-10">
            <TableBase
                className="scrollbar-thin scrollbar-custom max-h-[60dvh]"
                hasCheckbox
                dataKeyForCheckbox="name"
                items={Array.from({ length: 10 }, (_, i) => ({
                    id: i + 1,
                    name: `user${i + 1}`,
                    email: `user${i + 1}@gmail.com`,
                    phone: `0900000${String(i + 1).padStart(3, '0')}`,
                    address: `${i + 1} Hoang Quoc Viet, Ha Noi, Viet Nam`,
                    haha: 1,
                }))}
                columns={[
                    { dataKey: 'id', label: 'ID' },
                    { dataKey: 'name', label: 'Name' },
                    { dataKey: 'email', label: 'Email' },
                    { dataKey: 'phone', label: 'Phone' },
                    { dataKey: 'address', label: 'Address' },
                ]}
            />

            {/*<DataTable*/}
            {/*    className="scrollbar-thin scrollbar-custom h-auto max-h-[60dvh]"*/}
            {/*    data={Array.from({ length: 100 }, (_, i) => ({*/}
            {/*        id: i + 1,*/}
            {/*        name: `user${i + 1}`,*/}
            {/*        email: `user${i + 1}@gmail.com`,*/}
            {/*        phone: `0900000${String(i + 1).padStart(3, '0')}`,*/}
            {/*        address: `${i + 1} Hoang Quoc Viet, Ha Noi, Viet Nam`,*/}
            {/*        haha: 1,*/}
            {/*    }))}*/}
            {/*    columns={[*/}
            {/*        {*/}
            {/*            accessorKey: 'name',*/}
            {/*            header: 'Name',*/}
            {/*        },*/}
            {/*        {*/}
            {/*            accessorKey: 'email',*/}
            {/*            header: 'Email',*/}
            {/*        },*/}
            {/*        {*/}
            {/*            accessorKey: 'phone',*/}
            {/*            header: 'Phone',*/}
            {/*        },*/}
            {/*        {*/}
            {/*            accessorKey: 'address',*/}
            {/*            header: 'Address',*/}
            {/*        },*/}
            {/*    ]}*/}
            {/*/>*/}
        </div>
    );
}
