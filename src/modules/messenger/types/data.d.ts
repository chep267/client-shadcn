/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */

export type MessageType = 'text' | 'image' | 'video' | 'file' | 'audio' | 'sticker' | 'system';

export type MessageStatus = 'sending' | 'sent' | 'received' | 'seen' | 'failed';

export interface Attachment {
    id: string;
    uid: string;
    url: string;
    fileType: string;
    fileName: string;
    fileSize: number;
    createdAt: string;
    updatedAt: string;
}

export interface Message {
    id: string;
    tid: string;
    uid: string;
    type: MessageType;
    content: string;
    attachments: Attachment[];
    status: MessageStatus;
    createdAt: string;
    updatedAt: string;
    metadata: {
        replyTo: mid;
        isRevoked: boolean;
        isDeleted: boolean;
        isPinned: boolean;
    } & Record<string, unknown>;
}

export interface Thread {
    id: string;
    name: string;
    avatar: string;
    uids: string[];
    unreads: {
        uid: string;
        count: number;
    }[];
    createdAt: string;
    updatedAt: string;
    metadata: {
        isGroup?: boolean;
        isMuted?: boolean;
        isPinned?: boolean;
        lastMessageId?: string;
    } & Record<string, unknown>;
}
