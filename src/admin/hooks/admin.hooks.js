import { useQuery } from "@tanstack/react-query";
import { 
  getUsersgeneralInfoAction, 
  countProductsByCategory, 
  dashboardStatsAction, 
  getReportsAction, 
  getAdminHomeDataAction,
  getCategoriesAction
} from "@/services/admin.services";


export const useUsersGeneralInfo = () => {
  return useQuery({
    queryKey: ['admin', 'users'],
    queryFn: getUsersgeneralInfoAction,
    // Los datos de usuarios no cambian cada segundo, podemos cachearlos 5 min
    staleTime: 1000 * 60 * 5, 
  });
};


export const useProductsByCategory = () => {
  return useQuery({
    queryKey: ['admin', 'products_by_category'],
    queryFn: countProductsByCategory,
  });
};


export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboardData', 'stats'],
    queryFn: dashboardStatsAction,
    // Refrescar automáticamente cada vez que la ventana gane foco
    refetchOnWindowFocus: true,
  });
};


export const useAdminReports = () => {
  return useQuery({
    queryKey: ['admin', 'reports'],
    queryFn: getReportsAction,
  });
};

export const useAdminHomeData = () => {
  return useQuery({
    queryFn: getAdminHomeDataAction,
    staleTime: 1000 * 60 * 5, 
    retry: 2, 
  });
};

export const useGetCategories = () => {
  return useQuery({
    queryFn: getCategoriesAction,
    staleTime: 1000 * 60 * 5, 
    retry: 2, 
  });
};