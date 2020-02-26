const compose = (...func) => (component) => {
    return func.reduceRight((wrapped, curValue) => curValue(wrapped), component);
}
export default compose;
