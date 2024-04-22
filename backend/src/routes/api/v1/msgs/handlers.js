import { prisma } from "../../../../adapters.js";
import xss from 'xss'

export async function getAllMsg(req, res) {
  const allmsgs = await prisma.msg.findMany({orderBy: {
    id: 'desc', 
  }});
  return res.json(allmsgs);
  }

 export async function createOneMsg(req, res) {
  const user_id =req.session.user_id;

  const msgcontent=xss(req.body.msgcontent);
  if(msgcontent.length>500)return res.status(404).json({ error: "user Not  Found" });
  const user=await prisma.user.findUnique({ where: { id:user_id},select: {
    id: true,
    name: true,
    avatar: true,
  },});
  if (user === null) return res.status(404).json({ error: "user Not  Found" });
  const msg = await prisma.msg.create({ data: { user_id:user.id, avatar:user.avatar,msg:msgcontent , username:user.name} });
  if (msg === null) return res.status(404).json({ error: "msg create failed" });
  return res.status(201).json({"state":true});
  }

export async function deleteOneMsg(req, res) {
  const user_id =req.session.user_id;
  const msg_id=parseInt(xss(req.body.msg_id), 10);
  const msg= await prisma.msg.findFirst({where:{id:msg_id,user_id:user_id},select:{id:true}});
  if (msg === null) return res.status(404).json({ error: "msg cannot delete" });
  const result=await prisma.msg.delete({where:{id:msg_id}});
  if (result === null) return res.status(404).json({ error: "msg cannot delete" });
    return res.status(201).json({"state":true});
  }

