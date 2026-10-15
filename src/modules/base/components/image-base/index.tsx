/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { cn } from 'cn';
import { FormattedMessage } from 'react-intl';

/** constants */
import { BaseLanguage } from '@modules/base/constants/language';

interface ImageBaseProps extends Omit<React.ComponentProps<'img'>, 'src'> {
    src?: string | null;
}

export function ImageBase(props: ImageBaseProps) {
    const { src, alt, className, ...rest } = props;
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [isInView, setIsInView] = React.useState(false);
    const imgRef = React.useRef(null);

    // Quan sát khi element cuộn vào màn hình (Lazy Load bằng IntersectionObserver)
    React.useEffect(() => {
        if (!imgRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect(); // Ngừng quan sát khi ảnh đã vào viewport
                }
            },
            {
                rootMargin: '0px 0px', // Tải trước ảnh khi còn cách màn hình 0px
                threshold: 0.1,
            }
        );

        observer.observe(imgRef.current);

        return () => {
            if (observer) observer.disconnect();
        };
    }, [src]);

    // Reset trạng thái khi src thay đổi
    React.useEffect(() => {
        setIsLoaded(false);
        setIsError(false);
    }, [src]);

    return (
        <div
            ref={imgRef}
            className={cn(
                'relative cursor-pointer overflow-hidden border select-none',
                'bg-slate-200', // light
                'dark:bg-slate-800', // dark
                className
            )}
        >
            {/* 1. SKELETON LOADING ANIMATION (Hiển thị khi đang chờ load ảnh) */}
            {!isLoaded && !isError && (
                <div
                    className={cn(
                        'absolute inset-0 z-10 animate-pulse bg-linear-to-r',
                        'from-slate-300 via-slate-400 to-slate-300', // light
                        'dark:from-slate-800 dark:via-slate-700 dark:to-slate-800' // dark
                    )}
                />
            )}

            {/* 2. HOẶC FALLBACK KHI LỖI ẢNH (404 / Invalid URL) */}
            {isError ? (
                <div
                    className={cn(
                        'flex flex-col items-center justify-center',
                        'absolute inset-0 gap-1 p-2',
                        'bg-slate-100 text-slate-400', // light
                        'dark:bg-slate-900 dark:text-slate-500', // dark
                        'hover:opacity-80'
                    )}
                >
                    <svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>

                    <span className="line-clamp-1 text-center text-xs font-medium">
                        <FormattedMessage id={BaseLanguage.component.image.error} defaultMessage="Loading error" />
                    </span>
                </div>
            ) : (
                /* 3. THẺ IMG CHÍNH (Chỉ nạp src khi đã cuộn tới gần màn hình) */
                isInView && (
                    <img
                        src={src || ''}
                        alt={alt}
                        loading="lazy"
                        decoding="async"
                        onLoad={() => setIsLoaded(true)}
                        onError={() => setIsError(true)}
                        className={cn('size-full transition-all duration-500 ease-out', {
                            'blur-0 scale-100 opacity-100': isLoaded,
                            'scale-105 opacity-0 blur-sm': !isLoaded,
                        })}
                        {...rest}
                    />
                )
            )}
        </div>
    );
}
