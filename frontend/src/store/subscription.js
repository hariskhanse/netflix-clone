import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useSubscription = create((set) => ({
    isSubscription: false,
    data: null,
    createSubscription: async (plan) => {
        set({ isSubscription: true });
        try {
            const response = await axios.get(`/api/v1/subscription/subscribe`, {
                params: { plan },
            });
            console.log(response)
            set({ data: response.data.content, isSubscription: false });
            toast.success("Subscription Created");
        } catch (error) {
            toast.error(error.response?.data?.message || "Subscription failed");
            set({ isSubscription: false });
        }
    }
}))