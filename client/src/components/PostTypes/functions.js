export const encodeImageFileAsURL = (element, setter, drag=false) => {
    try {
        let file = element;
        if (!drag) {
            file = element.files[0];
        }
        let reader = new FileReader();
        reader.onloadend = () => {
            setter(reader.result)
        }
        reader.readAsDataURL(file);
    } catch (err) {
        alert('file reader error')
}}

export const checkFileType = (e, type, drag=false) => {
    if (drag) {
        if (e.type.split('/')[0] !== type) {
            alert('Неверный тип файла');
            return false;
        }
        return true;
    }
    if (e.target.files[0].type.split('/')[0] !== type) {
        alert('Неверный тип файла');
        return false;
    }
    return true;
}