import { useFetch } from "@/hooks/useFetch/useFetch"
import { Users } from "./types"

export const useUsers = () => {
  return useFetch<Users[]>('user', { initialValue: [], cache: false })
}