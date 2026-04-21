/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import DOMPurify from 'dompurify';
import dayjs from 'dayjs';

/** utils */
import { Skeleton } from '@module-base/components/skeleton';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@module-base/components/card';

/** components */

interface PoemProps {
    data: App.ModulePoem.Data.TypePoem;
}

export function PoemSkeleton() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Skeleton className="h-6 w-1/5" />
                </CardTitle>
                <CardDescription>
                    <Skeleton className="h-4 w-1/3" />
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Skeleton className="h-20" />
            </CardContent>
            <CardFooter>
                <Skeleton className="h-6 w-1/5" />
            </CardFooter>
        </Card>
    );
}

export function Poem(props: PoemProps) {
    const { data: poem } = props;

    const safeContent = React.useMemo(() => {
        if (!poem.content) return '';
        return DOMPurify.sanitize(poem.content);
    }, [poem.content]);

    return (
        <Card>
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
