import { create } from 'zustand';
import { persistLocalStorage, clearLocalStorage } from '../utils/localStorage.utility'

export interface UserInfo {
  id: number;
  sucursal_id: number;
  forzar_produccion: boolean;
  franquicia: boolean;
  nombre: string;
  email: string;
  password: string;
  tipo_us: number;
}

export const EmptyUserState: UserInfo = {
  id: 0,
  sucursal_id: 0,
  forzar_produccion: false,
  franquicia: false,
  nombre: '',
  email: '',
  password: '',
  tipo_us: 0
};

export const UserKey = 'user';

interface UserStore {
  url_img: string; // Añadir url_img aquí
  user: UserInfo;
  getUser: (payload: UserInfo) => void;
  updateUser: (payload: Partial<UserInfo>) => void;
  resetUser: () => void;
  updateUrlImg: (url: string) => void;  // Añadir acción para actualizar url_img
}

const useUserStore = create<UserStore>((set) => ({
  url_img: 'http://hiplot.dyndns.org:84/api_dev/', // URL base de la imagen
  user: localStorage.getItem(UserKey) ? JSON.parse(localStorage.getItem(UserKey)!) : EmptyUserState,
  getUser: (payload) => set(() => {
    persistLocalStorage(UserKey, payload);
    return { user: payload };
  }),
  updateUser: (payload) => set((state) => {
    const result = { ...state.user, ...payload };
    persistLocalStorage(UserKey, result);
    return { user: result };
  }),
  resetUser: () => set(() => {
    clearLocalStorage(UserKey);
    return { user: EmptyUserState };
  }),
  updateUrlImg: (url) => set(() => ({ url_img: url }))  // Actualización de url_img
}));

export default useUserStore;
