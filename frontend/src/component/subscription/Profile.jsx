import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "../../store/authUser";
import Navbar from "../Pages/Home/Navbar";
import SubscriptionPlan from "./SubscriptionPlan";
import { useSubscription } from "../../store/subscription";

const Profile = () => {
    const { user } = useAuthStore();
    const { getSubscriptionData, subscriptionContent } = useSubscription();

    useEffect(() => {
        if (user?.activeSubscription) {
            getSubscriptionData(user.activeSubscription);
        }
    }, [user?.activeSubscription, getSubscriptionData]);

    const subscriptionPlans = [
        {
            title: "Free Plan",
            description: "Limited access to our library for free.",
            price: null,
            buttonText: "Select Free Plan",
        },
        {
            title: "1-Month Plan",
            description: "Unlimited access for one month.",
            price: "$20.00",
            buttonText: "Buy 1-Month Plan",
            subjec: "starter",
            priceId: "price_1QRUMZCsF6BsqQoYfLu0m7CG"
        },
        {
            title: "1-Year Plan",
            description: "Unlimited access for a year.",
            price: "$40.00",
            buttonText: "Buy 1-Year Plan",
            subjec: "pro",
            priceId: "price_1QRUNICsF6BsqQoYimKlTrWN"
        },
    ];

    return (
        <div className="bg-black min-h-screen text-white">
            <div className="container mx-auto px-4 py-8">
                <Navbar />
                <div className="max-w-6xl mx-auto px-6 py-12">
                    <h1 className="text-4xl font-bold mb-8 text-center">Profile</h1>
                    <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-12">
                        <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">
                            User Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-gray-400 text-sm">Name</p>
                                <p className="text-xl font-medium">{user?.username || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Email</p>
                                <p className="text-xl font-medium">{user?.email || "N/A"}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-2">
                            Subscription Plans
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {subscriptionPlans.map((plan, index) => (
                                <SubscriptionPlan
                                    key={index}
                                    plan={plan}
                                    subscriptionId={user?.activeSubscription || null}
                                    subscriptionContent={subscriptionContent}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="text-center mt-12">
                        <Link
                            to="/"
                            className="text-blue-500 hover:text-blue-400 transition underline font-medium"
                        >
                            Go Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
