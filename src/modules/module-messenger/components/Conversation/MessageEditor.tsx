/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { Textarea } from '@module-base/components/textarea';

export function MessageEditor() {
    return (
        <Textarea
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            rows={10}
            cols={1}
            className={cn('h-auto max-h-65 min-h-10', 'scrollbar-custom scrollbar-thin')}
            placeholder="Aa..."
        />
    );
}
