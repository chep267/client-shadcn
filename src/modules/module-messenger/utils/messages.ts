/**
 *
 * @author dongntd267@gmail.com
 *
 */

export const mapFileToAttachment = (file: File): App.ModuleMessenger.Data.TypeMessageAttachment => ({
    name: file.name,
    mimeType: file.type,
    size: file.size,
    url: URL.createObjectURL(file),
});

export const genCacheData = <Data = unknown>(
    data: App.ModuleBase.Data.TypeItems<Data>
): App.ModuleBase.Api.Response<App.ModuleBase.Data.TypeItems<Data>> => {
    return {
        message: 'OK',
        data: data,
        metadata: {
            timestamp: Date.now(),
            currentPage: 1,
            totalPages: 1,
            currentItems: 1,
            totalItems: 1,
        },
    };
};
