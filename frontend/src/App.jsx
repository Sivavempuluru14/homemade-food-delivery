import { useState } from 'react'
import HomePage from './components/HomePage.jsx'
import MenuDisplay from './components/MenuDisplay.jsx'
import SubscriptionPlans from './components/SubscriptionPlans.jsx'

function App() {
  const [page, setPage] = useState('home')

  return (
    <div className="app-shell">
      <header className="main-nav">
        <button className="nav-btn btn-home" onClick={() => setPage('home')}>
          Home
        </button>
        <button className="nav-btn btn-menu" onClick={() => setPage('menu')}>
          Explore Menu
        </button>
        <button className="nav-btn btn-plan" onClick={() => setPage('plans')}>
          View Plans
        </button>
      </header>

      <main className="page-body">
        {page === 'home' && (
          <HomePage
            onViewPlans={() => setPage('plans')}
            onExploreMenu={() => setPage('menu')}
          />
        )}
        {page === 'plans' && <SubscriptionPlans />}
        {page === 'menu' && <MenuDisplay />}
      </main>

      <footer className="site-footer">
        <p>Saffron Courtyard — Homemade food with hotel-style care.</p>
        <p>Contact us for warm, daily-prepared meals and simple subscription plans.</p>
      </footer>
    </div>
  )
}

export default App
