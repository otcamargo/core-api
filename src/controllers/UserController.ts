import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entity/User";
import { checkRole } from "../middlewares/checkRole";

class UserController{

  static listAll = async (request: Request, response: Response) => {
  //Get users from database
  const userRepository = getRepository(User);
  const users = await userRepository.find({
    select: ["id", "username", "role"] //We dont want to send the passwords on response
  });

  //Send the users object
  response.send(users);
  };

  static getOneById = async (req: Request, res: Response) => {
  //Get the ID from the url
  const id = Number(req.params.id);

  //Get the user from database
  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOneOrFail(id, {
      select: ["id", "username", "role"] //We dont want to send the password on response
    });
  } catch (error) {
    res.status(404).send("User not found");
  }
  };

  static newUser = async (request: Request, response: Response) => {
  //Get parameters from the body
  let { username, password, role } = request.body;
  let user = new User();
  user.username = username;
  user.password = password;
  user.role = role;

  //Validade if the parameters are ok
  const errors = await validate(user);
  if (errors.length > 0) {
    response.status(400).send(errors);
    return;
  }

  //Hash the password, to securely store on DB
  user.hashPassword();

  //Try to save. If fails, the username is already in use
  const userRepository = getRepository(User);
  try {
    await userRepository.save(user);
  } catch (e) {
    response.status(409).send("username already in use");
    return;
  }

  //If all ok, send 201 response
  response.status(201).send("User created");
  };

  static editUser = async (request: Request, response: Response) => {
  //Get the ID from the url
  const id = request.params.id;

  //Get values from the body
  const { username, role } = request.body;

  //Try to find user on database
  const userRepository = getRepository(User);
  let user;
  try {
    user = await userRepository.findOneOrFail(id);
  } catch (error) {
    //If not found, send a 404 response
    response.status(404).send("User not found");
    return;
  }

  //Validate the new values on model
  user.username = username;
  user.role = role;
  const errors = await validate(user);
  if (errors.length > 0) {
    response.status(400).send(errors);
    return;
  }

  //Try to safe, if fails, that means username already in use
  try {
    await userRepository.save(user);
  } catch (e) {
    response.status(409).send("username already in use");
    return;
  }
  //After all send a 204 (no content, but accepted) response
  response.status(204).send();
  };

  static deleteUser = async (request: Request, response: Response) => {
  //Get the ID from the url
  const id = request.params.id;

  const userRepository = getRepository(User);
  let user: User;
  try {
    user = await userRepository.findOneOrFail(id);
  } catch (error) {
    response.status(404).send("User not found");
    return;
  }
  userRepository.delete(id);

  //After all send a 204 (no content, but accepted) response
  response.status(204).send();
  };
};

export default UserController;