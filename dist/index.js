"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
//dotenv.config()
const app = (0, express_1.default)();
let products = [
    {
        id: '1',
        title: 'Sample Product',
        image: 'https://example.com/image.jpg',
        price: 99.99,
        link: 'https://example.com/product'
    }
];
// Root route
app.get('/', (req, res) => {
    res.send('Hello from Express with typescript!');
});
// READ all products
app.get('/products', (req, res) => {
    res.json(products);
});
// CREATE a new product
app.post('/product', (req, res) => {
    const newProduct = Object.assign({ id: (0, uuid_1.v4)() }, req.body);
    products.push(newProduct);
    res.status(201).json(newProduct);
});
// UPDATE a product by ID
app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    const index = products.findIndex(p => p.id === id);
    console.log("the index is ", index);
    console.log("the old data is ", products[index]);
    console.log("the new data is ", updateData);
    if (index === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }
    products[index] = Object.assign(Object.assign({}, products[index]), updateData);
    res.json(products[index]);
});
app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }
    // Remove product
    const deletedProduct = products.splice(index, 1)[0];
    console.log("the id is", id);
    console.log("the index is", index);
    console.log("the deleted product is", deletedProduct);
    res.json({ message: 'Product deleted', product: deletedProduct });
});
//app.use(cors())
app.listen(5000, () => console.log('Server on port 5000'));
