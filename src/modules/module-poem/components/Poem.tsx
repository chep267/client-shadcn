/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import DOMPurify from 'dompurify';
import dayjs from 'dayjs';

/** components */
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@module-base/components/card';

interface PoemProps {
    data: App.ModulePoem.Data.TypePoem;
}

export function Poem(props: PoemProps) {
    const { data: poem } = props;

    const safeContent = React.useMemo(() => {
        if (!poem.content) return '';
        return DOMPurify.sanitize(poem.content);
    }, [poem.content]);

    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle>{poem.title}</CardTitle>
                <CardDescription>Ngày đăng: {dayjs(poem.createdAt).format('DD/MM/YYYY - HH:mm:ss')}</CardDescription>
            </CardHeader>
            <CardContent>
                <p dangerouslySetInnerHTML={{ __html: safeContent }} />
            </CardContent>
            <CardFooter>
                <p>Tác giả: {poem.author?.name}</p>
            </CardFooter>
        </Card>
    );
}
