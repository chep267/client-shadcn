/**
 *
 * @author dongntd267@gmail.com
 *
 */

export const mapFileToAttachment = (
    file: File
): Omit<App.ModuleMessenger.Data.Attachment, 'id' | 'createdAt' | 'updatedAt'> => ({
    uid: '',
    fileName: file.name,
    fileType: file.type,
    fileSize: file.size,
    url: URL.createObjectURL(file),
});

export const genCacheData = <Data = unknown>(data: Data): App.ModuleBase.Api.ApiResponse<Data> => {
    return {
        message: 'OK',
        data,
        metadata: {
            currentPage: 1,
            totalPages: 1,
            currentItems: 1,
            totalItems: 1,
        },
    };
};
