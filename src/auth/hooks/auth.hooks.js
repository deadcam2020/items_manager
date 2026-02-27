import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createReportAction, updateUserAction } from '@/services/auth.services';
import { uploadReportImageAction } from '@/services/upload.services';
import { getUsersgeneralInfoAction } from '@/services/admin.services';
import { useAuthStore } from '../store/auth.store';

// QUERY: Para ver la lista de usuarios (Admin)
export const useUsersGeneralInfo = () => {
  return useQuery({
    queryKey: ['admin', 'users'],
    queryFn: getUsersgeneralInfoAction,
  });
};

// MUTATION: Para actualizar perfil (Mezcla React Query + Zustand)
export const useUpdateUserProfile = () => {
  const updateStoreUser = useAuthStore((state) => state.updateStoreUser);
  
  return useMutation({
    mutationFn: updateUserAction,
    onSuccess: (updatedUser) => {
      updateStoreUser(updatedUser); // Actualizamos el "espejo" en Zustand
    }
  });
};

// MUTATION: Crear reporte (Orquestada)
export const useCreateReport = () => {
  return useMutation({
    mutationFn: async ({ reportData, file }) => {
      // 1. Subir imagen
      const uploadData = await uploadReportImageAction(file);
      // 2. Crear reporte con la URL de la imagen
      return await createReportAction({
        ...reportData,
        imageurl: uploadData.imageurl,
        imageid: uploadData.imageid
      });
    }
  });
};