import { Request, Response } from "express";
import { ProductModel } from "../Models/ProductModel";
import { IProduct } from "../interface/Product";

class ProductController {
  async findAll(req: Request, res: Response) {
    const productsData = await ProductModel.find();

    try {
      res.status(200).send(productsData);
    } catch (err) {
      console.log(err);
      res.json({ message: "Internal server Error!" });
    }
  }

  async createProduct(req: Request, res: Response) {
    const body = req.body;

    const payload = {
      name: body.name,
      description: body.description,
      price: body.price,
      category: body.category,
      brand: body.brand,
      stockQuantity: body.stockQuantity,
      ratings: body.ratings,
    }

    try{

      if(productCreatedIsValid(payload)){
        res.status(201).send({message: "Producto registrado com sucesso!"})
        await ProductModel.create(payload)
        return;
      }

      if(!productCreatedIsValid(payload)) return res.status(400).send({message: "Houve um erro ao registrar o produto! Verifique os paramêtros informados!"})

    } catch(err) {
      console.log(err)
      res.send(500).json({message: "internal server error!"})
    }
  }
}

function productCreatedIsValid(product: IProduct) : boolean {
  if(product.name && product.brand && product.category && product.description && product.price){
    return true;
  } else {
    return false;
  }
}

export default new ProductController();
