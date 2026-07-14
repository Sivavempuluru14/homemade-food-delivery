import { useState } from 'react'

const menu = {
  Breakfast: [
    {
      name: 'Idli & Sambar',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuRyhCKmFMtjahrJ51TggP8JuXIHWYUoTdt5f_TQOJlSFOcr5f1QEBSwg&s=10',
      description: 'Soft steamed idlis with a fragrant lentil sambar.',
    },
    {
      name: 'Ghee Pongal',
      image:
        'https://anandhabhavan.com/wp-content/uploads/2025/04/ghee-pongal01.jpg',
      description: 'Creamy rice and lentil pongal finished with ghee.',
    },
    {
      name: 'Masala Dosa',
      image:
        'https://www.palatesdesire.com/wp-content/uploads/2019/09/Mysore_Masala_Dosa@Palates_Desire-1024x738.jpg',
      description: 'Crisp dosa stuffed with a spiced potato filling.',
    },
  ],
  Lunch: [
    {
      name: 'Sambar Rice Meal',
      image:
        'https://t4.ftcdn.net/jpg/04/95/70/55/360_F_495705545_lNbZSN8a3XbmxvBecFoUOCwhjc9iJgr3.jpg',
      description: 'Steaming rice paired with sambar, vegetables, and pickle.',
    },
    {
      name: 'Curd Rice Meal',
      image:
        'https://static.vecteezy.com/system/resources/thumbnails/067/242/146/small/creamy-rice-dessert-with-nuts-and-herbs-perfect-for-holiday-celebrations-and-culinary-designs-photo.jpg',
      description: 'Cooling curd rice served with crunchy toppings and curry leaves.',
    },
    {
      name: 'Chicken Chettinad Meal',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbVBnO-qW7rfzxv-WNSrVgSh2CMok6xulLoymYYQL4dSPG4MKv4f8UECQ&s=10',
      description: 'Spicy Chettinad chicken with rice and sides.',
    },
  ],
  Dinner: [
    {
      name: 'Chapati & Kurma',
      image:
        'https://sangskitchen.b-cdn.net/wp-content/uploads/2018/08/Veg-kurma-thumbnail.jpg',
      description: 'Soft chapatis served with a rich and flavorful kurma.',
    },
    {
      name: 'Lemon Rice Combo',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa6mot2QryD97ecQFI1ooZhs7L4kQvKYFtdG5OfAUcPlXfX-PCg0VpB_gw&s=10',
      description: 'Tangy lemon rice with papad and a side curry.',
    },
    {
      name: 'Mutton Curry Meal',
      image:
        'https://t4.ftcdn.net/jpg/05/32/19/77/360_F_532197714_A3iAnfwDeau6jYVbDa1g6ZB2y5w0443z.jpg',
      description: 'Slow-cooked mutton curry served with rice or roti.',
    },
  ],
}

function MenuDisplay() {
  const [selectedItem, setSelectedItem] = useState(null)

  return (
    <section className="menu">
      <h2>Today's Menu</h2>

      {Object.keys(menu).map((mealTime) => (
        <div key={mealTime} className="meal-group">
          <h3>{mealTime}</h3>
          <div className="meal-items">
            {menu[mealTime].map((item) => (
              <article key={item.name} className="meal-card">
                <button
                  type="button"
                  className="meal-image-button"
                  onClick={() => setSelectedItem(item)}
                  aria-label={`View ${item.name}`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="meal-image"
                  />
                </button>
                <div className="meal-content">
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}

      {selectedItem && (
        <div
          className="image-modal"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedItem(null)}
        >
          <div className="image-modal-content" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="modal-close"
              onClick={() => setSelectedItem(null)}
              aria-label="Close image"
            >
              ×
            </button>
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="modal-image"
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default MenuDisplay
