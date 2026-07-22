import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Veg Plan",
    type: "Veg",
    price: 6500,
    features: [
      "Breakfast, Lunch & Dinner daily",
      "Vegetarian South Indian menu",
    ],
  },
  {
    name: "Non-Veg Plan",
    type: "Non-Veg",
    price: 7500,
    features: [
      "Breakfast, Lunch & Dinner daily",
      "Non-Veg dish included daily",
    ],
  },
];

function SubscriptionPlans() {
  const navigate = useNavigate();

  const handleSubscribe = (plan) => {
    const selectedPlan = {
      planType: plan.type,
      amount: plan.price,
      lunchBoxCharge: 1000,
      totalAmount: plan.price + 1000,
    };

    // Save selected plan
    localStorage.setItem(
      "selectedPlan",
      JSON.stringify(selectedPlan)
    );
    localStorage.setItem("checkoutPending", "true");

    // Go to Register page
    navigate("/register");
  };

  return (
    <section className="plans">
      <h2>Subscription Plans</h2>

      <div className="plan-cards">
        {plans.map((plan) => (
          <div key={plan.type} className="plan-card">
            <h3>{plan.name}</h3>

            <p className="price">
              ₹{plan.price} / month
            </p>

            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <button onClick={() => handleSubscribe(plan)}>
              Choose {plan.name}
            </button>
          </div>
        ))}
      </div>

      <p className="addon-note">
        + ₹1000 one-time charge in the first month for personal lunchbox setup.
      </p>
    </section>
  );
}

export default SubscriptionPlans;