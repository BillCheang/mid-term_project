import api from "./axiosClient";
export const msg = {
  async getAll() {//just for test
    const { data } = await api.get("/msgs");  
    return data;
  },
  async createOne({ msg,token }) {
    const { data } = await api.post("/msgs", { msg , token });
    return data;
  },
  async deleteOne({ msg_id,token }) {
    const { data } = await api.delete("/users/deleteUser", {msg_id, token});
    return data;
  }
}; 