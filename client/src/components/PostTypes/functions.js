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

export const checkFileTypeAndSize = (e, type, drag=false) => {
    if (drag) {
        if (e.size > 10000000) {
            alert('Вес файла больше 10мб');
            return false;
        }
        if (e.type.split('/')[0] !== type) {
            alert('Неверный тип файла');
            return false;
        }
        return true;
    }
    let file = e.target.files[0];
    if (file.size > 10000000) {
        alert('Вес файла больше 10мб');
        return false;
    }
    if (file.type.split('/')[0] !== type) {
        alert('Неверный тип файла');
        return false;
    }
    return true;
}