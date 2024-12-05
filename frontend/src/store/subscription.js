import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useSubscription = create((set) => ({
    isSubscriptionContent: false,
    subscriptionContent: null,
    getSubscriptionData: async (subscriptionId) => {
        set({ isSubscriptionContent: true });
        try {
            const response = await axios.get(`/api/v1/subscription/getSubscriptionData`, {
                params: { subscriptionId },
            });
            set({ subscriptionContent: response.data.subscription, isSubscriptionContent: false });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load subscription data.");
            set({ isSubscriptionContent: false });
        }
    },
}));
