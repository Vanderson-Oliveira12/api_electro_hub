import { Request, Response } from "express";
import { UserModel } from "../Models/UserModel";
import jwt from "jsonwebtoken";

class UserController {
  async findAll(req: Request, res: Response) {
    const listData = await UserModel.find();

    res.status(200).json(listData);
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
          .send({ message: "Preencha com um email e senha!" });
      if (!userExists)
        return res.status(404).send({ message: "Email ou senha incorreto!" });

      const payload = {
        id: userExists.id,
        email: userExists.name,
        role: userExists.role,
      };

      const accessToken = jwt.sign(payload, process.env.SECRET as string, {
        expiresIn: 3600,
      });

      res.header("Authorization", accessToken);
      res.send({ "access-token": accessToken });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal server error!" });
    }
  }

  async signUp(req: Request, res: Response) {
    const { name, email, password, age, sex } = req.body;

    const emailIsAlready = await UserModel.findOne({ email: email });

    try {
      if (!name || !email || !password || !age || !sex)
        return res.status(400).send({ message: "Parametros inválidos!" });
      if (name.length < 4)
        return res
          .status(400)
          .send({ message: "O nome precisa ter mais de 4 caracteres!" });
      if (password.length < 4)
        return res
          .status(400)
          .send({ message: "A senha precisa ter mais de 4 caracteres!" });
      if (emailIsAlready)
        return res
          .status(400)
          .send({ message: "Usuário com este e-mail já cadastro" });

      const userData = {
        name,
        email,
        password,
        age,
        sex,
      };

      console.log(userData)

      await UserModel.create(userData);
      res.status(201).send({ message: "Usuário criado com sucesso!" });
      return;
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "internal server error!" });
    }
  }
}

export default new UserController();
