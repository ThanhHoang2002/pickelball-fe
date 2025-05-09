import { useQuery } from "@tanstack/react-query";

import { getAllSuppliers } from "../api/getAllSuppliers";


export const useSuppliers = () => {
  return useQuery({
    queryKey: ["suppliers"],
    queryFn: () => getAllSuppliers()
  });
};
