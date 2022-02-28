export const encodeImageFileAsURL = (element, setter) => {
    try {
        let file = element.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
            setter(reader.result)
        }
        reader.readAsDataURL(file);
    } catch (err) {
        alert('file reader error')
}}

export const checkFileType = (e, type) => {
    if (e.target.files[0].type.split('/')[0] !== type) {
        alert('Неверный тип файла');
        return false;
    }
    return true;
}