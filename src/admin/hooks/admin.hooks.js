import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  getUsersgeneralInfoAction, 
  countProductsByCategory, 
  dashboardStatsAction, 
  getReportsAction, 
  getAdminHomeDataAction,
  getCategoriesAction,
  SendReportResponseAction
} from "@/services/admin.services";
import { fetchGetAllProductsAction } from "@/services/products.services";


export const useUsersGeneralInfo = () => {
  return useQuery({
    queryKey: ['users_general_info'],
    queryFn: getUsersgeneralInfoAction,
    // Los datos de usuarios no cambian cada segundo, podemos cachearlos 5 min
    staleTime: 1000 * 60 * 5, 
  });
};

export const useAdminAllProducts = () => {
  return useQuery({
    queryKey: ['admin', 'products'],
    queryFn: fetchGetAllProductsAction,
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
    queryKey: ['categories'],
    queryFn: getCategoriesAction,
    staleTime: 1000 * 60 * 5, 
    retry: 2, 
  });
};

export const useSendReportResponse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: SendReportResponseAction,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['admin', 'reports']);
    }
  });
};
