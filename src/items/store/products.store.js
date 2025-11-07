// src/store/product.store.js
import { create } from "zustand";
import { createProductAction, uploadProductImageAction } from "@/services/upload";
import { deleteProductAction, fetchGetProductAction, fetchUserProductsAction, updateProductAction } from "@/services/products";

export const useProductStore = create((set) => ({
  products: [],
  productRes: [], //para almacenar el producto que se busca por id
  loading: false,
  error: null,

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

  updateProductWithImage: async ({id, productData, file}) => {
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
      const newProduct = await updateProductAction({id, productData: finalProduct});

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


    updateProductWithoutImage: async ({id, productData}) => {
    try {
      set({ loading: true, error: null });
      //  Crear producto en la base de datos
      const newProduct = await updateProductAction({id, productData});

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



}));
