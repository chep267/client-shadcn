/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { FormattedMessage } from 'react-intl';

/** constants */
import { BaseLanguage } from '@module-base/constants/language';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { TableRow, TableCell } from '@module-base/components/table';

export function TableEmpty<Data>(props: App.ModuleBase.Component.ComponentWithBigdataStoreProps<Data>) {
    const { store } = props;

    const isEmpty = store((state) => state.data.currentItems.length === 0);
    const loading = store((state) => state.data.loading);
    const emptyContent = store((state) => state.data.emptyContent);

    if (loading || !isEmpty) return null;

    return (
        <TableRow className={cn('absolute inset-0', 'flex items-center justify-center', 'hover:bg-transparent')}>
            <TableCell className="flex items-center justify-center">
                {typeof emptyContent === 'function' ? (
                    emptyContent()
                ) : (
                    <span className="opacity-50">
                        {emptyContent || (
                            <FormattedMessage id={BaseLanguage.component.table.empty} defaultMessage="No data!" />
                        )}
                    </span>
                )}
            </TableCell>
        </TableRow>
    );
}
