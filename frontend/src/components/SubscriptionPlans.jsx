import { useState } from 'react'
import axios from 'axios'

const plans = [
  {
    name: 'Veg Plan',
    type: 'Veg',
    price: 6500,
    features: ['Breakfast, Lunch & Dinner daily', 'Vegetarian South Indian menu'],
  },
  {
    name: 'Non-Veg Plan',
    type: 'Non-Veg',
    price: 7500,
    features: ['Breakfast, Lunch & Dinner daily', 'Non-Veg dish included daily'],
  },
]

function SubscriptionPlans() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubscribe = async (plan) => {
    // userId will be set by the login flow (Member 3's work)
    // Check with them for the exact localStorage key name used after login
    const userId = localStorage.getItem('userId')

    if (!userId) {
      setMessage('Please log in first to subscribe to a plan.')
      return
    }

    const lunchBoxCharge = 1000
    const totalAmount = plan.price + lunchBoxCharge

    setLoading(true)
    setMessage('')

    try {
      const res = await axios.post('http://localhost:5000/api/subscriptions', {
        userId: userId,
        planType: plan.type,
        amount: plan.price,
        lunchBoxCharge: lunchBoxCharge,
        totalAmount: totalAmount,
      })
      console.log('Subscription created:', res.data)
      setMessage(`Subscribed to ${plan.name} successfully! Total: ₹${totalAmount}`)
    } catch (err) {
      console.error(err.response?.data || err.message)
      setMessage('Subscription failed. Please try again.')
    }

    setLoading(false)
  }

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
            <button onClick={() => handleSubscribe(plan)} disabled={loading}>
              {loading ? 'Processing...' : `Choose ${plan.name}`}
            </button>
          </div>
        ))}
      </div>

      <p className="addon-note">
        + ₹1000 one-time charge in the first month for personal lunchbox setup
      </p>

      {message && <p className="subscription-message">{message}</p>}
    </section>
  )
}

export default SubscriptionPlans