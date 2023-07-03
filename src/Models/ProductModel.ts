import { model, Schema } from "mongoose";

export const ProductModel = model(
  "products",
  new Schema(
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      category: { type: String, required: true },
      brand: { type: String } /* Marca */,
      stockQuantity: { type: Number, default: 0 },
      ratings: [{ type: Number, min: 1, max: 5 }] /* Avaliações */,
      imageUrl: {
        type: String,
        default:
          "https://www.malhariapradense.com.br/wp-content/webp-express/webp-images/uploads/2017/08/produto-sem-imagem.png.webp",
      },
    },
    {
      timestamps: true,
    }
  )
);
