//import mongoose from 'mongoose'
//import cors from 'cors'
//import dotenv from 'dotenv'
import { Product } from './Products';
import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Update } from './Update';

//dotenv.config()
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Root route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello from Express with typescript!');
});

// READ all products
app.get('/products', (req: Request, res: Response<Product[]>) => {
    res.json(products);
});

// CREATE a new product
app.post('/product', (req: Request, res: Response<Product>) => {
    console.log(req.body);
    const newProduct: Product = { id: uuidv4(), ...req.body };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// UPDATE a product by ID
app.put('/products/:id', (req: Request<{ id: string }, {}, Update>, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;

    const index = products.findIndex(p => p.id === id);
    console.log("the index is ",index);
    console.log("the old data is ",products[index]);
    console.log("the new data is ",updateData);
    if (index === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }

    products[index] = { ...products[index], ...updateData };
    res.json(products[index]);
});

app.delete('/products/:id', (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  // Remove product
  const deletedProduct = products.splice(index, 1)[0];
  console.log("the id is", id)
  console.log("the index is", index)
  console.log("the deleted product is", deletedProduct)
  res.json({ message: 'Product deleted', product: deletedProduct });
  
});
//app.use(cors())

app.listen(5000, () => console.log('Server on port 5000'))

