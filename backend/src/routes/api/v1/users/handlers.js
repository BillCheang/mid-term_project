import { prisma } from "../../../../adapters.js";
import generatePassword from "./gen.js";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from "url";

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
  const username=req.body.username;
  const path=`${req.protocol}://${req.get('host')}`+'/api/v1/users/img/'+req.file.filename;
  const user = await prisma.user.create({ data: { name:username ,password:Password, avatar: path} });
  user.state=true;
  return res.status(201).json(user);
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

export async function signIn(req, res) {
  const password= req.body.password;
  const username=req.body.username;
  if (isIllegalString(password) || isIllegalString(username)) return res.status(400).json({ state:false });

  const user = await prisma.user.findFirst({ where: { name:username ,password:password },select: {
    id: true,
    name: true,
    avatar: true,
  },});


  if (user === null) return res.status(404).json({ state: false });
  user.state=true;

  return res.status(201).json(user);
}

export async function signOut(req, res) {
  return res.json({state:true});

}

export async function getAvatar(req, res) {
  const avatar_name = req.params.img;

  // Get the directory path of the current module file
  const currentDir = path.dirname(fileURLToPath(import.meta.url));

  // Construct the image path
  const imagePath = path.join(currentDir, '../../../../i/',avatar_name);
  //const imagePathnew = path.normalize(imagePath);

 if (fs.existsSync(imagePath)) {
     //File exists, send the image file to the client
     return res.sendFile(imagePath);
  } else {
    // File doesn't exist, return a 404 error
    return res.status(504).json({ error: 'File not found' });
  }
}




function isIllegalString(value) {
  return (typeof value === 'string' && value.trim().length === 0) || typeof value !== 'string';
}


