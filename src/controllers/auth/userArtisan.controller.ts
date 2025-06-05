import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Artisan from "../../models/UserModelArtisan";
import { createUserSchema, updateUserSchema  } from "../../validations/userValidation";

// GET ALL (ignora deletados)
export const getAllUsersArtisan = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await Artisan.find({ isDeleted: false }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuários", error });
  }
};

// GET BY ID (ignora deletados)
export const getUserByIdArtisan = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await Artisan.findOne({ _id: req.params.id, isDeleted: false }).select("-password");
    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuário", error });
  }
};

// CREATE
export const createUserArtisan = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, bio, phone } = req.body;

  const parse = createUserSchema.safeParse({ name, email, password });

  if (!parse.success) {
    const errors = parse.error.flatten().fieldErrors;
    res.status(400).json({ message: "Dados inválidos", errors });
    return;
  }

  try {
    const existingUser = await Artisan.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email já está em uso" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profileImage = req.file?.path || null;

    const newUser = new Artisan({
      name,
      email,
      password: hashedPassword,
      profileImage,
      bio,
      phone,
    });

    await newUser.save();
    const { password: _, ...userWithoutPassword } = newUser.toObject();
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar usuário", error });
  }
};

// UPDATE
export const updateUserArtisan = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, bio, phone } = req.body;

  const parse = updateUserSchema.safeParse({ name, email, password });

  if (!parse.success) {
    const errors = parse.error.flatten().fieldErrors;
    res.status(400).json({ message: "Dados inválidos", errors });
    return;
  }

  try {
    const updateData: any = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (bio) updateData.bio = bio;
    if (phone) updateData.phone = phone;
    if (req.file?.path) updateData.profileImage = req.file.path;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    const updatedUser = await Artisan.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      updateData,
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      res.status(404).json({ message: "Usuário não encontrado ou deletado" });
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar usuário", error });
  }
};

// SOFT DELETE
export const deleteUserArtisan = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedUser = await Artisan.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true, updatedAt: new Date() },
      { new: true }
    );

    if (!deletedUser) {
      res.status(404).json({ message: "Usuário não encontrado ou já deletado" });
    } else {
      res.status(200).json({ message: "Usuário marcado como deletado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar usuário", error });
  }
};

// RESTORE
export const restoreUserArtisan = async (req: Request, res: Response): Promise<void> => {
  try {
    const restoredUser = await Artisan.findOneAndUpdate(
      { _id: req.params.id, isDeleted: true },
      { isDeleted: false, updatedAt: new Date() },
      { new: true }
    ).select("-password");

    if (!restoredUser) {
      res.status(404).json({ message: "Usuário não encontrado ou não está deletado" });
    } else {
      res.status(200).json(restoredUser);
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao restaurar usuário", error });
  }
};
