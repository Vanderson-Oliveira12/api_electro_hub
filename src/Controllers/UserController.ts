import { Request, Response } from "express";
import { UserModel } from "../Models/UserModel";
import jwt from "jsonwebtoken";

class UserController {
  async findAll(req: Request, res: Response) {
    const listData = await UserModel.find();

    try {
      res.status(200).json(listData);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "internal server error" });
    }
  }

  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;

    const userExists = await UserModel.findOne({
      email: email,
      password: password,
    });

    try {
      if (!email || !password)
        return res
          .status(400)
          .json({ message: "Preencha com um email e senha!" });
      if (!userExists)
        return res.status(404).json({ message: "Email ou senha incorreto!" });

      const payload = {
        id: userExists.id,
        email: userExists.name,
        role: userExists.role,
      };

      const accessToken = jwt.sign(payload, process.env.SECRET as string, {
        expiresIn: 3600,
      });

      res.header("Authorization", accessToken);
      res.json({ "access-token": accessToken });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error!" });
    }
  }

  async signUp(req: Request, res: Response) {
    const { name, email, password, age, sex } = req.body;

    const emailIsAlready = await UserModel.findOne({ email: email });

    try {
      if (!name || !email || !password || !age || !sex)
        return res.status(400).json({ message: "Parametros inválidos!" });
      if (name.length < 4)
        return res
          .status(400)
          .json({ message: "O nome precisa ter mais de 4 caracteres!" });
      if (password.length < 4)
        return res
          .status(400)
          .json({ message: "A senha precisa ter mais de 4 caracteres!" });
      if (emailIsAlready)
        return res
          .status(400)
          .json({ message: "Usuário com este e-mail já cadastro" });

      const userData = {
        name,
        email,
        password,
        age,
        sex,
      };

      /* 1 - male | 2 - female */
      let userPathSex =
        userData.sex == 1
          ? "https://raw.githubusercontent.com/Vanderson-Oliveira12/api_electro_hub/master/src/upload/user_male.jpg"
          : "https://raw.githubusercontent.com/Vanderson-Oliveira12/api_electro_hub/master/src/upload/user_female.jpg";

      await UserModel.create({ ...userData, user_image_path: userPathSex });
      res.status(201).json({ message: "Usuário criado com sucesso!" });
      return;
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "internal server error!" });
    }
  }
}

export default new UserController();
