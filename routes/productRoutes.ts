//not being used yet

import express from 'express'
import { ProductModel } from '../models/Products'

const router = express.Router()

// Create
router.post('/', async (req, res) => {
  console.log(req.body)
  const product = new ProductModel(req.body)
  await product.save()
  res.status(201).send(product)
})