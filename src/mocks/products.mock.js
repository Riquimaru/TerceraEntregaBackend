import { faker } from "@faker-js/faker";

export const generateProduct = () => {
    return{
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        status: faker.datatype.boolean(),
        stock: faker.number.int(50)
    }
}

export const generateProducts = () => {
    const products = []
    for (let i = 0; i <= 100; i++){
        products.push(generateProduct())
    }
    return products
}