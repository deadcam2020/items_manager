import { createReportAction, loginAction, updateUserAction} from '@/services/auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { checkAuthAction } from '../actions/check-auth.action.js';
import { uploadProductImageAction, uploadProfileImageAction, uploadReportImageAction } from '@/services/upload.js';
import { getUsersgeneralInfoAction } from '@/services/admin.js';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      usersData:[],
      authStatus: 'checking',
      token: null,

      // Getters
      isAdmin: () => {
        const roles = get().user?.role || [];
        return roles.includes('admin');
      },

      // Actions
      login: async ({ email, password }) => {
        try {
          const data = await loginAction({ email, password });
          localStorage.setItem('token', data.token);

          set({
            user: data.user,
            token: data.token,
            authStatus: 'authenticated',
          });

          return true;
        } catch (error) {
          console.error('Error en login: ', error);
          localStorage.removeItem('token');
          set({ user: null, token: null, authStatus: 'not-authenticated' });
          return false;
        }
      },

      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, authStatus: 'not-authenticated' });
      },

      checkAuthStatus: async () => {
        try {
          const { user, token } = await checkAuthAction();

          set({
            user,
            token,
            authStatus: 'authenticated',
          });

          return true;
        } catch (error) {
          set({
            user: undefined,
            token: undefined,
            authStatus: 'not-authenticated',
          });
          return false;
        }
      },

      updateUser: async (userData) => {
        try {
          const updatedUser = await updateUserAction(userData);

          // Asegúrate de mezclar el user actual con los nuevos datos
          set((state) => ({
            user: { ...state.user, ...updatedUser },
          }));


          return true;
        } catch (error) {
          console.error('Error actualizando usuario', error);
          return false;
        }
      },

      updateProfileImage: async ({file, oldProfileImageId}) => {

        
        try {

          const updatedImage = await uploadProfileImageAction({file, oldProfileImageId})

          set((state) => ({
            user: { ...state.user, ...updatedImage },
          }));
          return true

        } catch (error) {
          console.error('Error subiendo foto', error);
          return false;
        }
      },

      getUsersGeneralInfo: async () => {

        
        try {

          const response = await getUsersgeneralInfoAction()

          set((state) => ({
            usersData: response,
          }));
          return true

        } catch (error) {
          console.error('Error subiendo foto', error);
          return false;
        }
      },


        createReport: async (reportData, file) => {
          try {
            set({ loading: true, error: null });
      
            //  Subir imagen a Cloudinary
            const uploadData = await uploadReportImageAction(file);
      
            const finalReport = {
              ...reportData,
              imageurl: uploadData.imageurl,
              imageid: uploadData.imageid,
            };
      
            //  Crear reporte en la base de datos
            const newReport = await createReportAction(finalReport);
      
            //  Actualizar el estado global
            set((state) => ({
              loading: false,
            }));
      
            return true;
          } catch (err) {
            console.error("Error uploading report:", err);
            set({ error: err.message, loading: false });
            return false;
          }
        },

    }),
    {
      name: 'auth-storage', // nombre en localStorage
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        authStatus: state.authStatus,
      }),
    },
  )
);
