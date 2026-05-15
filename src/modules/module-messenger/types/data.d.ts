/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */

export type TypeThread = {
    /** ID duy nhất của cuộc hội thoại */
    tid: string;

    /** Tên nhóm (nếu là chat 1-1, trường này có thể null và lấy name của đối phương) */
    name: string;

    /** Ảnh đại diện nhóm (nếu null, dùng avatar của đối phương) */
    avatar: string;

    /** Danh sách ID thành viên trong thread (để query/filter nhanh) */
    uids: string[];

    /** Tin nhắn cuối cùng để hiển thị ở danh sách bên ngoài */
    lastMessage: {
        mid: string; // ID tin nhắn
        uid: string; // ID người gửi
        content: string; // Nội dung text hoặc mô tả (ví dụ: "Đã gửi một ảnh")
        createdAt: number; // Thời gian gửi (timestamp)
        status: 'sending' | 'sent' | 'received' | 'seen';
    };

    /** Số tin nhắn chưa đọc của user hiện tại trong thread này */
    unreadCount: number;

    /** Metadata bổ sung (ví dụ: thread có bị mute không, có phải là group không) */
    isGroup: boolean;
    updatedAt: number;
};
