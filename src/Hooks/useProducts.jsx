import axios from 'axios';
import { useQuery } from "@tanstack/react-query";
export default function useProducts() {
  async function getApi() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }
  let response = useQuery({
    queryKey: ["productQuery"],
    queryFn: getApi,
    staleTime: 20000,
    select:(data)=> data.data.data
  })
  
  return response
}
