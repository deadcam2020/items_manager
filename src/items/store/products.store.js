// src/store/product.store.js
import { create } from "zustand";
import {
    uploadProductImageAction
} from "@/services/upload";

import {
  addToCartAction,
  addValorationAction,
  createProductAction,
  createSaleAction,
  deleteProductAction,
  deleteProductFromCartACtion,
  fetchGetAllProductsAction,
  fetchGetAllUserProductsAction,
  fetchGetProductAction,
  fetchUserProductsAction,
  fetchUserPurchasedProductsAction,
  getAdminHomeDataAction,
  getCartItems,
  getCategoriesAction,
  searchproductsAction,
  updateProductAction
} from "@/services/products";



export const useProductStore = create((set, get) => ({
  products: [],
  productRes: [],//para almacenar el producto que se busca por id
  purchasedProducts: [],
  cartProducts: [],
  loading: false,
  error: null,
  //admin data
  categories: [],
  adminData:[],

  uploadProduct: async (productData, file) => {
    try {
      set({ loading: true, error: null });

      //  Subir imagen a Cloudinary
      const uploadData = await uploadProductImageAction(file);

      const finalProduct = {
        ...productData,
        imageurl: uploadData.imageurl,
        imageid: uploadData.imageid,
      };

      //  Crear producto en la base de datos
      const newProduct = await createProductAction(finalProduct);

      //  Actualizar el estado global
      set((state) => ({
        products: [...state.products, newProduct],
        loading: false,
      }));

      return true;
    } catch (err) {
      console.error("Error uploading product:", err);
      set({ error: err.message, loading: false });
      return false;
    }
  },



  fetchUserProducts: async (uid) => {
    set({ loading: true })

    try {

      const response = await fetchUserProductsAction(uid)

      set({ products: response, loading: false })

    } catch (error) {
      console.error("Error fetching products:", error);
      set({ loading: false, error: error.message });
    }
  },

  fetchGetProduct: async (id) => {
    set({ loading: true })

    try {

      const response = await fetchGetProductAction(id)

      set({ productRes: response, loading: false })
      return response;
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ loading: false, error: error.message });
    }
  },


  fetchGetAllUserProducts: async (id) => {
    set({ loading: true })

    try {

      const response = await fetchGetAllUserProductsAction(id)

      set({ products: response, loading: false })

      return response;
    } catch (error) {
      console.error("Error fetching all products:", error);
      set({ loading: false, error: error.message });
    }
  },

    fetchGetAllProducts: async () => {
    set({ loading: true })

    try {

      const response = await fetchGetAllProductsAction()

      set({ products: response, loading: false })

      return response;
    } catch (error) {
      console.error("Error fetching all products:", error);
      set({ loading: false, error: error.message });
    }
  },


  deleteProduct: async (id) => {
    set({ loading: true });

    try {
      const response = await deleteProductAction(id);

      // Actualiza la lista en el estado
      set((state) => ({
        products: state.products.filter((products) => products.id !== id),
        loading: false,
      }));

      return response;
    } catch (error) {
      console.error("Error deleting product:", error);
      set({ loading: false, error: error.message });
      return null;
    }
  },

  updateProductWithImage: async ({ id, productData, file, oldImageId }) => {
    try {
      set({ loading: true, error: null });

      //  Subir imagen a Cloudinary
      const uploadData = await uploadProductImageAction(file);

      const finalProduct = {
        ...productData,
        imageurl: uploadData.imageurl,
        imageid: uploadData.imageid,
      };

      //  Crear producto en la base de datos
      const newProduct = await updateProductAction({ id, productData: finalProduct, oldImageId });

      //  Actualizar el estado global
      set((state) => ({
        products: state.products.map((p) => (p.id === id ? newProduct : p)),
        loading: false,
      }));


      return true;
    } catch (err) {
      console.error("Error uploading product:", err);
      set({ error: err.message, loading: false });
      return false;
    }
  },


  updateProductWithoutImage: async ({ id, productData }) => {
    console.log(productData.stock);

    try {
      set({ loading: true, error: null });
      //  Crear producto en la base de datos
      const newProduct = await updateProductAction({ id, productData });

      //  Actualizar el estado global
      set((state) => ({
        products: state.products.map((p) => (p.id === id ? newProduct : p)),
        loading: false,
      }));


      return true;
    } catch (err) {
      console.error("Error uploading product:", err);
      set({ error: err.message, loading: false });
      return false;
    }
  },

  saveSale: async (saleData) => {
    try {
      set({ loading: true, error: null });



      //  Crear producto en la base de datos
      const newSale = await createSaleAction(saleData);

      set((state) => ({
        loading: false,
      }));

      return true;
    } catch (err) {
      console.error("Error saving Sale:", err);
      set({ error: err.message, loading: false });
      return false;
    }
  },


  fetchUserPurchasedProducts: async (buyer_id) => {
    set({ loading: true })

    try {

      const response = await fetchUserPurchasedProductsAction(buyer_id)

      set({ purchasedProducts: response, loading: false })
      return true
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ loading: false, error: error.message });
      return false

    }
  },

  fetchSearchProducts: async ({ query, min, max, status }) => {
    set({ loading: true });

    try {
      const response = await searchproductsAction({ query, min, max, status });

      set({
        products: response,
        loading: false,
      });

      return true;

    } catch (error) {
      console.error("Error searching products:", error);
      set({ loading: false, error: error.message });
      return false;
    }
  },

  fetchAddToCart: async ({ id, uid, quantity }) => {
    set({ loading: true });

    try {
      const response = await addToCartAction({ id, uid, quantity });

      set({
        loading: false,
      });

      return true;

    } catch (error) {
      console.error("Error searching products:", error);
      set({ loading: false, error: error.message });
      return false;
    }
  },


   fetchGetCartProducts: async () => {
    set({ loading: true });

    try {
      const response = await getCartItems();

      
      set({
        loading: false,
        cartProducts: response
      });

      return true;

    } catch (error) {
      console.error("Error searching products:", error);
      set({ loading: false, error: error.message });
      return false;
    }
  },

   deleteProductFromCart: async (id) => {
    set({ loading: true });

    try {
       await deleteProductFromCartACtion(id);

       const {cartProducts} = get()

      set({
        loading: false,
        cartProducts: cartProducts.filter((cartProducts) => cartProducts.cart_item_id !== id)
        //state.cartProducts.filter((cartProducts) => cartProducts.id !== id),

      });

      return true;

    } catch (error) {
      console.error("Error delete product:", error);
      set({ loading: false, error: error.message });
      return false;
    }
  },

   addValoration: async ({ id, valoration}) => {
    set({ loading: true });

    try {
      const response = await addValorationAction({ id, valoration });

      set({
        loading: false,
      });

      return true;

    } catch (error) {
      console.error("Error searching products:", error);
      set({ loading: false, error: error.message });
      return false;
    }
  },

  //ADMIN FUNCTIONS

     getCategories: async () => {
    set({ loading: true });

    try {
      const response = await getCategoriesAction();

      set({
        loading: false,
        categories: response
      });

      return true;

    } catch (error) {
      console.error("Error searching products:", error);
      set({ loading: false, error: error.message });
      return false;
    }
  },

    getAdminHomeData    : async () => {
    set({ loading: true });

    try {
      const response = await getAdminHomeDataAction();

      set({
        loading: false,
        adminData: response
      });

      return true;

    } catch (error) {
      console.error("Error searching products:", error);
      set({ loading: false, error: error.message });
      return false;
    }
  },

}));
