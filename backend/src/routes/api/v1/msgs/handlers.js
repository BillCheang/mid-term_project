import { msg } from "../../../../../../frontend/src/services/msg.js";
import { prisma } from "../../../../adapters.js";

export async function getAllUsers(req, res) {
  const allUsers = await prisma.user.findMany();
  return res.json(allUsers);
}


export async function getAllMsg(req, res) {
  const allmsgs = await prisma.msg.findMany();
  console.log(allmsgs)
  return res.json(allmsgs);
  }

 export async function createOneMsg(req, res) {
  const user_id =req.body.user_id;
  const msgcontent=req.body.msg;
  const user=await prisma.user.findUnique({ data: { id:user_id},select: {
    id: true,
    name: true,
    avatar: true,
  },});
  console.log(user);
  const msg = await prisma.msg.create({ data: { user_id:user.id, avatar:user.avatar,msg:msgcontent , username:user.name} });
  console.log(msg);
  return res.json(msg);
  }
export async function deleteOneMsg(req, res) {
    
  }

