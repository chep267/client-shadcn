/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** components */
import { Skeleton } from '@modules/base/components/skeleton';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@modules/base/components/card';

interface FeedSkeletonProps {
    length?: number;
}

export function FeedSkeleton(props: FeedSkeletonProps) {
    const { length = 3 } = props;

    return Array.from({ length }).map((_, index) => (
        <Card key={index} className="w-full max-w-2xl">
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
    ));
}
