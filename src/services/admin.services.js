import { Api } from "./api";


export const getUsersgeneralInfoAction = async () => {
    const { data } = await Api.get('/api/admin/users_info');
    return data;
  
};


export const countProductsByCategory = async () => {
    const { data } = await Api.get('/api/admin/products_by_category');
    return data;
  
};


export const dashboardStatsAction = async () => {
    const { data } = await Api.get('/api/admin/dashboard_stats');
    return data;

};


export const getReportsAction = async () => {
    const { data } = await Api.get('/api/admin/all_reports');
    return data;

};

export const getAdminHomeDataAction = async () => {
  try {
    const { data } = await Api.get('/api/admin/home_data');
    return data;
  } catch (error) {
    console.error('Error en getAdminHomeDataAction:', error);
    throw error.response?.data?.error || 'Error al buscar datos del administrador';
  }
};

export const getCategoriesAction = async () => {
    const { data } = await Api.get('/api/admin/categories');
    return data;

};

export const SendReportResponseAction = async ({reportId, response}) => {
    const { data } = await Api.put(`/api/admin/report_response/${reportId}`, { response });
    return data;

};