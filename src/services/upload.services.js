import { Api } from './api.js'; // Tu instancia de Axios con interceptores

/**
 * Sube la imagen de perfil y elimina la anterior si existe
 */
export async function uploadProfileImageAction({ file, oldProfileImageId }) {
    const formData = new FormData();
    formData.append('profileImage', file);
    formData.append('oldProfileImageId', oldProfileImageId || "");

    const { data } = await Api.post('/api/upload/profileImage', formData);
    return data;

}

/**
 * Sube una imagen para un producto
 */
export async function uploadProductImageAction(file) {
    const formData = new FormData();
    formData.append('productImage', file);

    const { data } = await Api.post('/api/upload/productImage', formData);
    return data;

}

/**
 * Sube una imagen para un reporte de error
 */
export async function uploadReportImageAction(file) {
    const formData = new FormData();
    formData.append('reportImage', file);

    const { data } = await Api.post('/api/upload/reportImage', formData);
    return data;
 
}