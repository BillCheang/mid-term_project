import api from "./axiosClient";

export const user = {
  async getAll() {//just for test
    const { data } = await api.get("/users");
    return data;
  },
  async createOne({ formData}) {
    //const { data } = await api.post("/users", { formData });
    //"formData: user id/ user name/user avatar/"
    const data=true;
    return data;
  },
  signIn({ username, password }) {
     // const { data } = api.post("/users/signin", { username, password });
      //"data: user id/ user name/user avatar/"
      const data=true;
      return data;
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


