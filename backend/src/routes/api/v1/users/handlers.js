import { prisma } from "../../../../adapters.js";
import generatePassword from "./gen.js";
export async function getAllUsers(req, res) {
  const allUsers = await prisma.user.findMany();
  return res.json(allUsers);
}

/**
   @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function createOneUser(req, res) {
  const Password=generatePassword();
  const user = await prisma.user.create({ data: { name:req.body.username ,password:Password, avatar: req.file.path} });
  user.state=true;
  return res.status(201).json(user);
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function getOneUser(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  const user = await prisma.user.findUnique({ where: { id } });
  if (user === null) return res.status(404).json({ error: "Not Found" });
  return res.json(user);
}

export async function signIn(req, res) {
  const password= req.body.password;

  if (isIllegalString(password) || isIllegalString(req.body.username)) return res.status(400).json({ state:false });

  const user = await prisma.user.findFirst({ where: { name:req.body.username ,password:password },select: {
    id: true,
    name: true,
    avatar: true,
  },});


  if (user === null) return res.status(404).json({ state: false });
  user.state=true;

  return res.status(201).json(user);
}

export async function signOut(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  const user = await prisma.user.findUnique({ where: { id } });
  if (user === null) return res.status(404).json({ error: "Not Found" });
  return res.json(user);
}

function isIllegalString(value) {
  return (typeof value === 'string' && value.trim().length === 0) || typeof value !== 'string';
}


