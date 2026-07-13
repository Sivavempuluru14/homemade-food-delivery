const plans = [
  {
    name: 'Veg Plan',
    price: 6500,
    features: ['Breakfast, Lunch & Dinner daily', 'Vegetarian South Indian menu'],
  },
  {
    name: 'Non-Veg Plan',
    price: 7500,
    features: ['Breakfast, Lunch & Dinner daily', 'Non-Veg dish included daily'],
  },
]

function SubscriptionPlans() {
  return (
    <section className="plans">
      <h2>Subscription Plans</h2>

      <div className="plan-cards">
        {plans.map((plan) => (
          <div key={plan.name} className="plan-card">
            <h3>{plan.name}</h3>
            <p className="price">₹{plan.price} / month</p>
            <ul>
              {plan.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <button>Choose {plan.name}</button>
          </div>
        ))}
      </div>

      <p className="addon-note">
        + ₹1000 one-time charge in the first month for personal lunchbox setup
      </p>
    </section>
  )
}

export default SubscriptionPlans
