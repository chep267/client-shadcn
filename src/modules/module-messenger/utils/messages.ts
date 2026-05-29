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
