import { faker } from '@faker-js/faker';

export function generateMockChat(): App.ModuleMessenger.Data.TypeMessage[] {
    const threadId = 'thread_123';
    const userIds = ['user_01', 'user_02'];
    const messages: App.ModuleMessenger.Data.TypeMessage[] = [];

    // Khởi tạo mốc thời gian bắt đầu (ví dụ: cách đây 1 tiếng)
    let currentTimestamp = Date.toString();

    const chatScenarios = [
        { type: 'text', content: 'Alo ông ơi, có đó không?' },
        { type: 'text', content: 'Tôi đây, có chuyện gì thế ông?' },
        {
            type: 'text',
            content: 'Cái file thiết kế UI phòng họp hôm nọ ông làm xong chưa nhỉ, sếp đang hỏi tôi để duyệt á.',
        },
        { type: 'text', content: 'À xong rồi, đợi tí tôi xuất file rồi gửi qua cho nhé.' },
        { type: 'text', content: 'Ok ông, gửi sớm giúp tôi nhé, tầm 10 phút nữa sếp vào họp rồi.' },
        { type: 'image', content: 'Gửi ông bản demo trước này, xem ổn chưa' },
        { type: 'text', content: 'Nhìn đẹp đấy! Mà cái màu nền chỉnh sang tone tối hơn một chút được không?' },
        { type: 'file', content: 'Ok để tôi sửa lại chút rồi gửi file gốc đính kèm bản final ở đây nhé.' },
        { type: 'text', content: 'Tuyệt vời ông ơi, cứu cánh của đời tôi haha! 👍' },
        { type: 'text', content: 'Không có gì đâu, việc nhỏ mà.' },
    ];

    chatScenarios.forEach((scenario, index) => {
        // Luân phiên người gửi giữa user_01 và user_02
        const uid = userIds[index % 2];
        const mid = `msg_${faker.string.nanoid(10)}`;

        // Thời gian tin nhắn sau cách tin nhắn trước từ 30s đến 3 phút
        currentTimestamp += faker.number.int({ min: 30000, max: 180000 });

        // Xử lý attachments nếu tin nhắn là image hoặc file
        const attachments: App.ModuleMessenger.Data.TypeMessage['attachments'] = [];
        if (scenario.type === 'image') {
            attachments.push({
                url: faker.image.urlLoremFlickr({ category: 'abstract' }),
                name: `preview_${faker.system.commonFileName('png')}`,
                size: faker.number.int({ min: 500000, max: 2000000 }), // 500kb - 2mb
                mimeType: 'image/png',
            });
        } else if (scenario.type === 'file') {
            attachments.push({
                url: `https://storage.example.com/files/${faker.string.uuid()}.pdf`,
                name: `UI_Design_Final.pdf`,
                size: faker.number.int({ min: 2000000, max: 15000000 }), // 2mb - 15mb
                mimeType: 'application/pdf',
            });
        }

        // Giả lập tính năng Reply: Tin nhắn thứ 7 reply tin nhắn thứ 6 (index 5)
        let replyTo;
        if (index === 6 && messages[5]) {
            replyTo = {
                mid: messages[5].mid,
                uid: messages[5].uid,
                content: messages[5].content,
                type: messages[5].type,
            };
        }

        // Giả lập trạng thái tin nhắn (Mấy tin đầu chắc chắn đã 'seen', tin cuối có thể vừa gửi 'sent')
        const status = index === chatScenarios.length - 1 ? 'sent' : 'seen';

        const messageItem: App.ModuleMessenger.Data.TypeMessage = {
            mid,
            tid: threadId,
            uid,
            content: scenario.content,
            type: scenario.type as App.ModuleMessenger.Data.TypeMessage['type'],
            attachments,
            status,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
            replyTo,
            isDeleted: false,
            isRevoke: false,
            isPinned: index === 7, // Ghim thử cái file bản final (index 7)
            metadata: index === 8 ? { reactions: { '👍': ['user_02'] } } : undefined, // Thả nhẹ quả emoji ở tin nhắn số 9
        };

        messages.push(messageItem);
    });

    return messages;
}
