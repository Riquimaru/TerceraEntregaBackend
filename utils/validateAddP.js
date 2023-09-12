export const validateP = product => {
    let res = true;
if (!product.title || !product.description || !product.price || !product.status || !product.category || !product.stock) {
     res = false;
}
return res;
}