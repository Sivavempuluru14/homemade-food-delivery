import { useState } from 'react'
import HomePage from './components/HomePage.jsx'
import MenuDisplay from './components/MenuDisplay.jsx'
import SubscriptionPlans from './components/SubscriptionPlans.jsx'
import DeliveryOptions from './components/DeliveryOptions.jsx'

function App() {
  const [page, setPage] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [editMenuOpen, setEditMenuOpen] = useState(false)
  const [adminAction, setAdminAction] = useState(null)

  const changePage = (nextPage) => {
    setPage(nextPage)
    setMenuOpen(false)
    setEditMenuOpen(false)
    setAdminAction(null)
  }

  const openAdminAction = (action) => {
    setAdminAction(action)
    setMenuOpen(false)
    setEditMenuOpen(false)
    setPage('menu')
  }

  return (
    <div className="app-shell">
      <header className="main-nav">
        <div className="nav-brand">
          <span className="brand-icon" aria-hidden="true">
            🏨
          </span>
          <span className="brand-name">Saffron Courtyard</span>
        </div>

        <div className="nav-links">
          <button className="nav-btn btn-home" onClick={() => changePage('home')}>
            Home
          </button>
          <button className="nav-btn btn-menu" onClick={() => changePage('menu')}>
            Explore Menu
          </button>
          <button className="nav-btn btn-plan" onClick={() => changePage('plans')}>
            View Plans
          </button>
          <button className="nav-btn btn-delivery" onClick={() => changePage('delivery')}>
            Delivery Options
          </button>
        </div>

        <div className="hamburger-wrapper">
          <button
            type="button"
            className="hamburger-button"
            onClick={() => {
              setMenuOpen((prev) => !prev)
              setEditMenuOpen(false)
            }}
            aria-label="Open menu options"
          >
            ☰
          </button>

          {menuOpen && (
            <div className="hamburger-menu">
              <button
                type="button"
                className="menu-option-btn"
                onClick={() => setEditMenuOpen((prev) => !prev)}
              >
                Edit Menu
              </button>

              {editMenuOpen && (
                <div className="submenu">
                  <button type="button" className="submenu-btn" onClick={() => openAdminAction('add')}>
                    Add Items
                  </button>
                  <button type="button" className="submenu-btn" onClick={() => openAdminAction('edit')}>
                    Edit Items
                  </button>
                  <button type="button" className="submenu-btn" onClick={() => openAdminAction('delete')}>
                    Delete Items
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      <main className="page-body">
        {page === 'home' && (
          <HomePage
            onViewPlans={() => changePage('plans')}
            onExploreMenu={() => changePage('menu')}
          />
        )}
        {page === 'plans' && <SubscriptionPlans />}
        {page === 'menu' && <MenuDisplay adminAction={adminAction} onAdminActionChange={setAdminAction} />}
        {page === 'delivery' && <DeliveryOptions />}
      </main>

      <footer className="site-footer">
        <p>Saffron Courtyard — Homemade food with hotel-style care.</p>
        <p>Contact us for warm, daily-prepared meals and simple subscription plans.</p>
      </footer>
    </div>
  )
}

export default App
