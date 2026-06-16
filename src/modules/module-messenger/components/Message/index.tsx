import { FileIcon, PinIcon, ReplyIcon, Check, CheckCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@module-base/components/avatar';
import { cn } from '@module-base/utils/shadcn';

interface MessageItemProps {
    isMe?: boolean;
    message: App.ModuleMessenger.Data.Message;
    currentUid?: string; // ID của user hiện tại đang đăng nhập để phân biệt Trái/Phải
    authorName?: string; // Tên người gửi (pass từ thread hoặc danh sách user)
    authorAvatar?: string; // Link avatar người gửi
}

export function Message({ isMe, message, currentUid, authorName = 'User', authorAvatar }: MessageItemProps) {
    const { metadata } = message;

    // Hàm format thời gian nhanh dạng HH:MM
    const formatTime = (timestamp?: string) => {
        return new Date(timestamp || '').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Hàm render Icon cho các trạng thái tin nhắn
    const renderStatus = () => {
        if (!isMe) return null;
        switch (message.status) {
            case 'sending':
                return (
                    <span className="border-muted-foreground/40 inline-block h-3 w-3 animate-spin rounded-full border-2 border-t-transparent" />
                );
            case 'sent':
                return <Check className="text-muted-foreground h-3 w-3" />;
            case 'received':
                return <CheckCheck className="text-muted-foreground h-3 w-3" />;
            case 'seen':
                return <CheckCheck className="text-primary h-3 w-3" />;
            default:
                return null;
        }
    };

    return (
        <div className={cn('group/msg my-2 flex w-full items-end gap-2 px-4', isMe ? 'justify-end' : 'justify-start')}>
            {/* 1. Avatar của đối phương (Chỉ hiện nếu không phải là "Tôi") */}
            {!isMe && (
                <Avatar className="h-8 w-8 border">
                    <AvatarImage src={authorAvatar} alt={authorName} />
                    <AvatarFallback>{authorName.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
            )}

            {/* 2. Khung nội dung chính */}
            <div className={cn('flex max-w-[70%] flex-col gap-1', isMe ? 'items-end' : 'items-start')}>
                {/* Tên người gửi (Hiện ở trên tin nhắn của đối phương nếu cần, ví dụ trong Group chat) */}
                {!isMe && <span className="text-muted-foreground px-1 text-xs">{authorName}</span>}

                {/* Trạng thái được ghim (Pinned) */}
                {metadata.isPinned && (
                    <div className="text-muted-foreground flex items-center gap-1 px-1 text-[10px]">
                        <PinIcon className="text-primary fill-primary/20 h-3 w-3 rotate-45" />
                        <span>Đã ghim</span>
                    </div>
                )}

                {/* Bong bóng tin nhắn */}
                <div
                    className={cn(
                        'relative flex flex-col gap-1.5 rounded-2xl px-4 py-2.5 text-sm shadow-sm',
                        isMe
                            ? 'bg-primary text-primary-foreground rounded-br-none'
                            : 'bg-muted text-foreground rounded-bl-none'
                    )}
                >
                    {/* 2.a Khung Reply (Nếu có) */}
                    {metadata.replyTo && (
                        <div
                            className={cn(
                                'flex flex-col gap-0.5 rounded-lg border-l-4 bg-black/5 p-2 text-xs dark:bg-white/5',
                                isMe ? 'border-primary-foreground/50' : 'border-primary/50'
                            )}
                        >
                            <span className="flex items-center gap-1 text-[11px] font-semibold">
                                <ReplyIcon className="h-3 w-3" />
                                {metadata.replyTo === currentUid ? 'Chính mình' : 'Đối phương'}
                            </span>
                            <span className="max-w-xs truncate opacity-80">{metadata.replyTo}</span>
                        </div>
                    )}

                    {/* 2.b Nội dung Text / Thu hồi */}
                    {metadata.isDeleted ? (
                        <span className="text-xs italic opacity-60">Tin nhắn đã bị thu hồi</span>
                    ) : (
                        message.type === 'text' && (
                            <p className="break-word leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        )
                    )}

                    {/* 2.c Hiển thị Ảnh đính kèm (Attachments dạng image) */}
                    {!metadata.isDeleted && message.type === 'image' && message.attachments?.length && (
                        <div className="my-1 grid grid-cols-1 gap-1 overflow-hidden rounded-lg">
                            {message.attachments?.map((img, i) => (
                                <img
                                    key={i}
                                    src={img.url}
                                    alt={img.fileName}
                                    className="max-h-60 w-full cursor-pointer rounded-md object-cover transition-opacity hover:opacity-95"
                                />
                            ))}
                            {message.content && <p className="mt-1 break-all">{message.content}</p>}
                        </div>
                    )}

                    {/* 2.d Hiển thị File đính kèm (Attachments dạng document/pdf) */}
                    {!metadata.isDeleted && message.type === 'file' && message.attachments?.length && (
                        <div className="my-1 flex flex-col gap-1">
                            {message.attachments?.map((file, i) => (
                                <a
                                    key={i}
                                    href={file.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={cn(
                                        'flex items-center gap-3 rounded-xl border p-2.5 text-xs font-medium transition-colors',
                                        isMe
                                            ? 'border-white/10 bg-black/10 text-white hover:bg-black/20'
                                            : 'bg-background hover:bg-accent border-border text-foreground'
                                    )}
                                >
                                    <div
                                        className={cn(
                                            'rounded-lg p-2',
                                            isMe ? 'bg-white/20' : 'bg-primary/10 text-primary'
                                        )}
                                    >
                                        <FileIcon className="h-4 w-4" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate font-semibold">{file.fileName}</p>
                                        <p className="text-[10px] opacity-60">
                                            {(file.fileSize / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    )}

                    {/* 2.e Hiển thị Emoji Reactions từ metadata nếu có */}
                    {message.metadata?.reactions && (
                        <div
                            className={cn(
                                'bg-background absolute -bottom-2.5 flex gap-0.5 rounded-full border px-1.5 py-0.5 text-[10px] shadow-sm',
                                isMe ? 'right-2' : 'left-2'
                            )}
                        >
                            {Object.keys(message.metadata.reactions).map((emoji) => (
                                <span key={emoji} title={(message.metadata?.reactions as any)[emoji].join(', ')}>
                                    {emoji}{' '}
                                    <span className="text-muted-foreground font-mono">
                                        {(message.metadata?.reactions as any)[emoji].length}
                                    </span>
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* 3. Thời gian + Trạng thái dưới bong bóng */}
                <div className="mt-0.5 flex items-center gap-1 px-1">
                    <span className="text-muted-foreground text-[10px] select-none">
                        {formatTime(message.createdAt)}
                    </span>
                    {renderStatus()}
                </div>
            </div>
        </div>
    );
}
