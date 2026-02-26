import { useQuery } from "@tanstack/react-query";
import { 
  fetchUserProductsAction, 
  fetchGetProductAction, 
  fetchGetAllProductsAction, 
  fetchUserPurchasedProductsAction, 
  searchproductsAction, 
  getCartItems, 
  getCategoriesAction, 
  getAdminHomeDataAction, 
  fetchGetAllUserProductsAction
} from "@/services/products.services";


export const useUserProducts = (uid) => {
  return useQuery({
    queryKey: ['products', 'user', uid],
    queryFn: () => fetchUserProductsAction(uid),
    enabled: !!uid, // Solo se ejecuta si hay un uid
  });
};


export const useUserPurchasedProducts = (uid) => {
   return useQuery({
    queryKey: ['purchases', uid],
    queryFn: () => fetchUserPurchasedProductsAction(uid),
    enabled: !!uid, // Solo se ejecuta si hay un uid
  }); 
}

export const useGetUserProducts = (uid) => {
   return useQuery({
    queryKey: ['products', 'user', uid],
    queryFn: () => fetchGetAllUserProductsAction(uid),
    enabled: !!uid, // Solo se ejecuta si hay un uid
  }); 
}

export const useGetProduct = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchGetProductAction(id),
    enabled: !!id,
  });
};

export const useAdminAllProducts = () => {
  return useQuery({
    queryKey: ['admin', 'products'],
    queryFn: fetchGetAllProductsAction,
  });
};

export const useSearchProducts = (filters) => {
  return useQuery({
    queryKey: ['products', 'search', filters],
    queryFn: () => searchproductsAction(filters),
    enabled: !!filters.query, // Solo busca si hay un término
  });
};

export const useCart = (uid) => {
  return useQuery({
    queryKey: ['cart', uid],
    queryFn: getCartItems,
    enabled: !!uid
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategoriesAction,
  });
};

export const useAdminHomeData = () => {
  return useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: getAdminHomeDataAction,
  });
};