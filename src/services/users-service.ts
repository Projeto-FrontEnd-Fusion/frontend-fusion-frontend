import { api } from "@/utils"

export const UsersServices = {
  findAll: async (): Promise<any> => {
    const { data } = await api.get('/user');

    return data.data
  }
}