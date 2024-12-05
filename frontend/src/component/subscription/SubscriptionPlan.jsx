import axios from "axios";

const SubscriptionPlan = ({ plan, subscriptionId, subscriptionContent }) => {
    const isActivePlan = plan.priceId == subscriptionContent?.planId;
    const handleSubscribe = async () => {
        try {
            const response = await axios.get(`/api/v1/subscription/subscribe`, {
                params: { plan: plan.subjec.toLowerCase() },
            });
            if (response.data?.url) {
                window.location.href = response.data.url;
            }
        } catch (error) {
            console.error("Subscription error:", error.response?.data || error.message);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`/api/v1/subscription/update`, {
                subscriptionId,
                newPlan: plan.subjec,
            });
            console.log(response.data);
            alert("Subscription updated successfully!");
        } catch (error) {
            console.error("Update error:", error.response?.data || error.message);
        }
    };

    const handleCancel = async () => {
        try {
            const response = await axios.delete(`/api/v1/subscription/cancel`, {
                data: { subscriptionId },
            });
            console.log(response.data);
            alert("Subscription canceled successfully!");
        } catch (error) {
            console.error("Cancellation error:", error.response?.data || error.message);
        }
    };

    return (
        <div className="bg-gray-700 rounded-lg p-6 shadow-lg text-center flex flex-col justify-between">
            <h3 className="text-lg font-semibold mb-2">{plan.title}</h3>
            <p className="text-sm text-gray-400 mb-4">{plan.description}</p>
            {plan.price && <p className="text-xl font-bold mb-4">{plan.price}</p>}

            {!isActivePlan && (
                <button
                    onClick={handleSubscribe}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-lg mb-2"
                >
                    {plan.buttonText}
                </button>
            )}

            {(subscriptionId && isActivePlan) && (
                <>
                    <button
                        onClick={handleUpdate}
                        className="bg-yellow-500 hover:bg-yellow-400 text-white font-medium px-4 py-2 rounded-lg mb-2"
                    >
                        Update Plan
                    </button>

                    <button
                        onClick={handleCancel}
                        className="bg-red-600 hover:bg-red-500 text-white font-medium px-4 py-2 rounded-lg"
                    >
                        Cancel Plan
                    </button>
                </>
            )}
        </div>
    );
};

export default SubscriptionPlan;
