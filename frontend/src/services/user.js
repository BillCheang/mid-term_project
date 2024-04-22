import api from "./axiosClient.js";

export const user = {
  async getAll() {//just for test
    const { data } = await api.get("/users");
    return data;
  },
  async createOne(formData) {
    const  data  = await api.post("/users/create", formData);
    return data.data;
  },
  async signIn({ username, password }) {
     const data = await api.post("/users/signIn", { username, password });
     return data.data;
  },
  async signOut() {
   const  data  = await api.post("/users/signOut",{"signOut":true});
    return data.data;
  },
  async checkSigned(){
    const  data  = await api.get(`/users/checkSigned`);
    return data.data;
  }
};


