import { Api } from "./api.js";
import { uploadProductImageAction } from "./upload.services";


export const uploadProductFullAction = async ({ productData, file }) => {
    // 1. Primero subimos la imagen
    const uploadData = await uploadProductImageAction(file);

    // 2. Construimos el objeto final con los datos que retornó Cloudinary
    const finalProduct = {
        ...productData,
        imageurl: uploadData.imageurl,
        imageid: uploadData.imageid,
    };

    // 3. Creamos el producto en la BD
    return await createProductAction(finalProduct);
};

export const createProductAction = async (finalProduct) => {
    const { data } = await Api.post('/api/products/', finalProduct);
    return data;

};


export const createSaleAction = async (saleData) => {
    const { data } = await Api.post('/api/products/sale', saleData);
    return data;

};

export const fetchUserProductsAction = async (uid) => {
    const { data } = await Api.get(`/api/products/userProducts/${uid}`);
    return data;

};

export const fetchGetProductAction = async (id) => {
    const { data } = await Api.get(`/api/products/product/${id}`);
    return data;

};

export const deleteProductAction = async (id) => {
    const { data } = await Api.delete(`/api/products/deleteProduct/${id}`);
    return data;

};

export const updateProductFullAction = async ({ id, productData, file, oldImageId }) => {
    let finalProductData = { ...productData };

    // 1. Si hay un archivo nuevo, lo subimos primero
    if (file) {
        const uploadData = await uploadProductImageAction(file);
        finalProductData.imageurl = uploadData.imageurl;
        finalProductData.imageid = uploadData.imageid;
        finalProductData.oldImageId = oldImageId; // Para que el backend borre la imagen vieja
    }

    // 2. Enviamos la actualización (con o sin imagen nueva)
    // Usamos la acción de PUT que ya tenías convertida a Axios
    return await updateProductAction({ id, productData: finalProductData });
};

export const updateProductAction = async ({ id, productData, oldImageId }) => {
    const body = { ...productData, oldImageId };
    const { data } = await Api.put(`/api/products/update/${id}`, body);
    return data;
};

export const fetchGetAllUserProductsAction = async (id) => {
    const { data } = await Api.get(`/api/products/products/${id}`);
    return data;

};

export const fetchGetAllProductsAction = async () => {
    const { data } = await Api.get('/api/admin/allProducts');
    return data;

};

export const fetchUserPurchasedProductsAction = async (buyer_id) => {
    const { data } = await Api.get(`/api/users/myPurchases/${buyer_id}`);
    return data;

};

export const searchproductsAction = async ({ query, min, max, status }) => {
    const { data } = await Api.get('/api/products/search', {
        params: { query, min, max, status } // Axios construye el ?query=... automáticamente
    });
    return data;

};

export const addToCartAction = async ({ id, uid, quantity }) => {
    const { data } = await Api.post('/api/products/saveToCart', { id, uid, quantity });
    return data;

};

export const getCartItems = async () => {
    const { data } = await Api.get('/api/products/getCart');
    return data;

};

export const deleteProductFromCartACtion = async (id) => {
    const { data } = await Api.delete(`/api/products/deleteFromCart/${id}`);
    return data;
};

export const addValorationAction = async ({ id, valoration }) => {
    const { data } = await Api.post('/api/products/addValoration', { id, valoration });
    return data;

};

export const getCategoriesAction = async () => {
    const { data } = await Api.get('/api/admin/categories');
    return data;

};

export const getAdminHomeDataAction = async () => {
    const { data } = await Api.get('/api/admin/home_data');
    return data;

};