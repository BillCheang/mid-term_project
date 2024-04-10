import api from "./axiosClient";

export const user = {
  async getAll() {
    const { data } = await api.get("/users");
    return data;
  },
  async createOne({ name }) {
    const { data } = await api.post("/users", { name });
    return data;
  },
  signIn({ username, password }) {
      const { data } = api.post("/signin", { username, password });
      return data;
  }
};

//"data: state/user id/ user name/" 
