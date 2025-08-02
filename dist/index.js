"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const db_1 = __importDefault(require("./db"));
const Products_1 = __importDefault(require("./models/Products"));
//dotenv.config()
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, db_1.default)();
/*
let products: Product[] = [
    {
        id_: uuidv4(),
        id: '1',
        title: 'Sample Product',
        image: 'https://example.com/image.jpg',
        price: 99.99,
        link: 'https://example.com/product'
    }
];
*/
// Root route
app.get('/', (req, res) => {
    res.send('Hello from Express with typescript!');
});
// READ all products
app.get('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Products_1.default.find();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
}));
// CREATE a new product
app.post('/product', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = new Products_1.default(Object.assign({ id_: (0, uuid_1.v4)() }, req.body));
        const savedProduct = yield newProduct.save();
        res.status(201).json(savedProduct);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create product' });
    }
}));
// UPDATE a product by ID
app.put('/products/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedProduct = yield Products_1.default.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        if (!updatedProduct)
            return res.status(404).json({ error: 'Product not found' });
        res.json(updatedProduct);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
    }
}));
app.delete('/products/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedProduct = yield Products_1.default.findOneAndDelete({ id: req.params.id });
        if (!deletedProduct)
            return res.status(404).json({ error: 'Product not found' });
        res.json({ message: 'Product deleted', product: deletedProduct });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
}));
//app.use(cors())
app.listen(5000, () => console.log('Server on port 5000'));
