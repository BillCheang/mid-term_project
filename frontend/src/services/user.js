import api from "./axiosClient.js";

export const user = {
  async getAll() {//just for test
    const { data } = await api.get("/users");
    return data;
  },
  async createOne(formData) {
    console.log("create");
    const  data  = await api.post("/users/create", formData);

    console.log(data.data);
    return data.data;
  },
  async signIn({ username, password }) {


     const data = await api.post("/users/signIn", { username, password });
     return data.data;
  },
  signOut(token) {
   // const { data } = api.post("/users/signOut", { token});
    const data=true;
    return data;
  },
  signedCheck(token) {
    //const { data } = api.post("/users/signedCheck", {token});
    const data=token!==""&& token!==null && token!==undefined  ?true:false;
    return data;
  },
  userName(token) {
    //const { data } = api.post("/users/userName", {token});
    data="name";
    return data;
  },
  deleteUser(username) {
    const { data } = api.post("/users/deleteUser", {username});
    return data;
  }
};


