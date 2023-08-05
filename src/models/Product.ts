export default class Product {
    id: string;
    name: string;
    description: string;
    image: string;
    price: string;
    categoryId: string;
    constructor(productInfo: {
        id: string;
        name: string;
        description: string;
        image: string;
        price: string;
        categoryId?: string;
    }) {
        this.id = productInfo.id;
        this.name = productInfo.name;
        this.description = productInfo.description;
        this.image = productInfo.image;
        this.price = productInfo.price;
        this.categoryId = productInfo.categoryId ?? "-1"
    }


    toString(): string {
        return `Product { id: ${this.id}, name: ${this.name}, description: ${this.description}, image: ${this.image}, price: ${this.price} }`;
    }
}