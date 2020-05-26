function fieldsNotEmpty(fields, obj) {
    const bool = fields.every(elem => {
        return obj[elem].length > 0 ? true : false
    })
    return bool;
}
export default fieldsNotEmpty;
