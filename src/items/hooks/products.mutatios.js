import { useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  createProductAction, 
  createSaleAction, 
  deleteProductAction, 
  addToCartAction, 
  deleteProductFromCartACtion, 
  addValorationAction, 
  uploadProductFullAction,
  updateProductFullAction,
  deletecArtAction
} from "@/services/products.services";


export const useCreateProductFull = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: uploadProductFullAction,
        onSuccess: () => {
            // Esto invalida la lista de productos para que se recargue sola
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
};

// export const useCreateProduct = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: createProductAction,
//     onSuccess: () => {
//       queryClient.invalidateQueries(['products']);
//     }
//   });
// };

export const useUpdateProductFull = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProductFullAction,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['products']);
      queryClient.invalidateQueries(['product', variables.id]);
    }
  });
};

export const useDeleteProduct = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteProductAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    }
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addToCartAction,
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
    }
  });
};

export const useDeleteFromCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProductFromCartACtion,
    onSuccess: () => {
      queryClient.invalidateQueries(['cart', user.id]);
    }
  });
};

export const useDeleteCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletecArtAction,
    onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['cart'] });
    }
  });
};

export const useCreateSale = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSaleAction,
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      queryClient.invalidateQueries(['sales']);
      queryClient.invalidateQueries(['cart']); // Limpiar carrito tras venta
    }
  });
};

export const useAddValoration = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addValorationAction,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['product', variables.id]);
    }
  });
};