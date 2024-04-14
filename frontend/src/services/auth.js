import api from "./axiosClient.js";

export const auth = {
  async getCsrf() {
    const {
      data: { csrfToken },
    } = await api.get("/csrf-token");
    return { csrfToken };
  },
};
