import {create} from 'zustand'
import axios from 'axios'

export const useAuthStore = create((set) => ({
    user:null,
    isAuthenticated: false,
    isLoading:false,
    isCheckingAuth: true,

    signup: async(email, password, name ) => {
        set({isLoading:true, error: null});
        try{
            await response = axios.post("https:localhost:5000/api/auth/signup", {email,password,name});
        }catch (error){

        }
    }
}))
