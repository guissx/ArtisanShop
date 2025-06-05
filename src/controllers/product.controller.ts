import { Request, Response } from "express";
import Product from "../models/Product";

// GET ALL (ignora deletados)
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({ deleted: false }).populate("artisan", "name");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produtos", error: error });
  }
};

// GET BY ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, deleted: false }).populate("artisan", "name");
    if (!product) {
      res.status(404).json({ message: "Produto não encontrado" });
      return 
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produto", error: error});
  }
};

// CREATE
export const createProduct = async (req: Request, res: Response) => {
  const { artisan, name, description, price, quantity, images, category } = req.body;

  // Validações manuais simples
  if (!artisan || !name || !description || typeof price !== 'number' || typeof quantity !== 'number') {
       res.status(400).json({
      message: "Campos obrigatórios: artisan, name, description, price (número), quantity (número)",
    });
    return; 
  }

  try {
    const newProduct = new Product({
      artisan,
      name,
      description,
      price,
      quantity,
      images: images || [],
      category,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar produto", error: error});
  }
};

// UPDATE
export const updateProduct = async (req: Request, res: Response) => {
  const { name, description, price, quantity, images, category } = req.body;

  const updateData: any = {};
  if (name) updateData.name = name;
  if (description) updateData.description = description;
  if (typeof price === 'number') updateData.price = price;
  if (typeof quantity === 'number') updateData.quantity = quantity;
  if (Array.isArray(images)) updateData.images = images;
  if (category) updateData.category = category;

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.id, deleted: false },
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      res.status(404).json({ message: "Produto não encontrado ou deletado" });
      return; 
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar produto", error: error});
  }
};

// SOFT DELETE
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await Product.findOneAndUpdate(
      { _id: req.params.id, deleted: false },
      { deleted: true },
      { new: true }
    );

    if (!deletedProduct) {
      res.status(404).json({ message: "Produto não encontrado ou já deletado" });
      return; 
    }

    res.status(200).json({ message: "Produto marcado como deletado" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar produto", error: error });
  }
};

// RESTORE
export const restoreProduct = async (req: Request, res: Response) => {
  try {
    const restoredProduct = await Product.findOneAndUpdate(
      { _id: req.params.id, deleted: true },
      { deleted: false },
      { new: true }
    );

    if (!restoredProduct) {
      res.status(404).json({ message: "Produto não encontrado ou não está deletado" });
      return 
    }

    res.status(200).json(restoredProduct);
  } catch (error) {
    res.status(500).json({ message: "Erro ao restaurar produto", error: error});
  }
};
