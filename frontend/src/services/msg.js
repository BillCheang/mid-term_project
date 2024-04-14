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
    formData.append("username",MessageObj.username);
    formData.append("msg",MessageObj.msg);
    const { data } = await api.post("/msgs/create", formData);
    return data;
  },
  async deleteOne(msg_id) {
    const { data } = await api.delete("/msgs/delete", {msg_id});
    return data;
  }
}; 
function getParameterType(param) {
  return typeof param;
}
