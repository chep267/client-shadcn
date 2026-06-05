/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { useParams } from 'react-router-dom';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** stores */
import { useMessengerStore } from '@module-messenger/stores/useMessengerStore';

/** components */
import { Textarea } from '@module-base/components/textarea';

export function MessageEditor() {
    const editorRef = React.useRef<HTMLTextAreaElement>(null);
    const { tid = '' } = useParams();
    const action = useMessengerStore((store) => store.action);
    const hasDraft = useMessengerStore((store) => store.data.drafts.has(tid));
    const [text, setText] = React.useState('');

    React.useEffect(() => {
        // set up the next conversation
        const nextDraft = useMessengerStore.getState().data.drafts.get(tid) ?? '';
        setText(nextDraft);
        editorRef.current?.focus();
    }, [tid]);

    React.useEffect(() => {
        if (!hasDraft) {
            setText('');
            editorRef.current?.focus();
        }
    }, [hasDraft]);

    React.useEffect(() => {
        action.addTyping({ tid, typing: text.length > 0 });
        action.addDraft({ tid, draft: text });
    }, [text]);

    return (
        <Textarea
            ref={editorRef}
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            rows={10}
            className={cn('h-auto max-h-65 min-h-10', 'scrollbar-custom scrollbar-thin')}
            placeholder="Aa..."
            value={text}
            onChange={(event) => setText(event.target.value)}
        />
    );
}
