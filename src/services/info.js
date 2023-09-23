export const generateProductErrorInfo = (product) =>{
    return `Una o más propuedades están incompletas o son inválidas.
    Lista de propiedades requeridas:
    *title : Tipo String, recibido ${product.title}
    *description : Tipo String, recibido ${product.description}
    *price : Tipo Number, recibido ${product.price}
    *stick : Tipo Number, recibido ${product.stock}`
}