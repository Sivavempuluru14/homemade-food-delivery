function DeliveryOptions() {
  const locations = [
    'Guindy Railway Station',
    'IIT Madras',
    'Anna University',
    'SIDCO Industrial Estate',
    'CIT Nagar',
  ]

  return (
    <section className="delivery-options">
      <h2>Delivery Options</h2>
      <p className="delivery-intro">
        We currently deliver to these convenient locations around Guindy in Chennai.
      </p>

      <div className="delivery-list">
        {locations.map((location) => (
          <div key={location} className="delivery-card">
            <h3>{location}</h3>
            <p>Available for doorstep delivery within the area.</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default DeliveryOptions
