const menu = {
  Breakfast: ['Idli & Sambar', 'Ghee Pongal', 'Masala Dosa'],
  Lunch: ['Sambar Rice Meal', 'Curd Rice Meal', 'Chicken Chettinad Meal'],
  Dinner: ['Chapati & Kurma', 'Lemon Rice Combo', 'Mutton Curry Meal'],
}

function MenuDisplay() {
  return (
    <section className="menu">
      <h2>Today's Menu</h2>

      {Object.keys(menu).map((mealTime) => (
        <div key={mealTime} className="meal-group">
          <h3>{mealTime}</h3>
          <ul>
            {menu[mealTime].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}

export default MenuDisplay
