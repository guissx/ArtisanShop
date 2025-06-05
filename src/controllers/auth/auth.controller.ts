import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/UserModel"
import Artisan from "../../models/UserModelArtisan";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
        // tenta buscar primeiro como usuário comum
    let user = await User.findOne({ email });
    let role = "user";

    if (!user) {
      // se não encontrar, tenta como artesão
      user = await Artisan.findOne({ email, isDeleted: false });
      role = "artisan";
    }

    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Senha incorreta" });
      return;
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role},
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(200).json({ token, user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ message: "Erro ao fazer login", error });
  }
};
