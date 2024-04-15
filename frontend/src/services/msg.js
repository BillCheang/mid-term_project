import { Form } from "react-router-dom";
import api from "./axiosClient.js";

export const msg = {
  async getAll() {
    const  data  = await api.get("/msgs");  
    return data.data;
  },

  async createOne(MessageObj) {
    const formData=new FormData();
    formData.append("user_id",MessageObj.user_id);
    formData.append("msg",MessageObj.msg);
    const user_id=MessageObj.user_id;
    const msgcontent=MessageObj.msg
    const { data } = await api.post("/msgs/create", {user_id,msgcontent});
    return data;
  },
  async deleteOne(user_id,msg_id) {
    console.log(msg_id);
    const { data } = await api.post("/msgs/delete", {user_id,msg_id});
    return data;
  }
}; 
function getParameterType(param) {
  return typeof param;
}
