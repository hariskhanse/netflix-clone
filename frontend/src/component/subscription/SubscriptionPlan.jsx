import axios from "axios";

const SubscriptionPlan = ({ plan }) => {
    const handleSubscribe = async () => {
        try {
            const response = await axios.get(`/api/v1/subscription/subscribe`, {
                params: { plan: plan.subjec.toLowerCase() },
            });
            console.log(response.data);
            if (response.data?.url) {
                window.location.href = response.data.url;
            }
        } catch (error) {
            console.error("Subscription error:", error.response?.data || error.message);
        }
    };

    return (
        <div className="bg-gray-700 rounded-lg p-6 shadow-lg text-center hover:shadow-xl hover:bg-gray-600 transition flex flex-col justify-between">
            <div>
                <h3 className="text-lg font-semibold mb-2">{plan.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{plan.description}</p>
                {plan.price && (
                    <p className="text-xl font-bold text-white mb-4">{plan.price}</p>
                )}
            </div>

            <button
                onClick={handleSubscribe}
                className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-lg mt-4"
            >
                {plan.buttonText}
            </button>
        </div>
    );
};

export default SubscriptionPlan;