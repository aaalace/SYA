export const encodeImageFileAsURL = (element, setter) => {
    try {
        let file = element.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
            setter(reader.result)
        }
        reader.readAsDataURL(file);
    } catch (err) {
        console.log(err)
}}