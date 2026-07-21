import { FaArrowRight, FaClock, FaLeaf, FaStar } from "react-icons/fa";

function HomePage({ onExploreMenu }) {
  const highlights = [
    {
      title: "Daily comfort",
      text: "Warm, homemade meals prepared fresh every day for a wholesome dining experience.",
      icon: <FaClock />,
    },
    {
      title: "Authentic flavors",
      text: "Classic South Indian recipes with vibrant spices and a true home-style touch.",
      icon: <FaLeaf />,
    },
    {
      title: "Trusted service",
      text: "Flexible plans and prompt delivery designed to make your routine feel effortless.",
      icon: <FaStar />,
    },
  ];

  return (
    <section className="home">
      <div className="hero-card">
        <div className="hero-text">
          <p className="eyebrow">Freshly prepared • Daily delivery</p>
          <h1>Saffron Courtyard</h1>
          <p className="subheading">Authentic homemade food delivered with care</p>
          <p className="hero-description">
            Saffron Courtyard brings warm homemade South Indian meals to your table.
            Every dish is crafted with fresh ingredients, classic spices, and a comforting
            hotel-style presentation.
          </p>

          <div className="hero-actions">
            <button className="circle-arrow" onClick={onExploreMenu}>
              <FaArrowRight />
            </button>
            <span className="hero-caption">Explore today&apos;s menu</span>
          </div>
        </div>

        <div className="hero-visual">
          <img
            src="https://shef.com/homemade-food/wp-content/uploads/62460e1038486f1fc22ce529_33726b86.jpg"
            alt="Home cooked meal"
            className="home-image"
          />
          <div className="hero-badges">
            <span>Veg & Non-Veg</span>
            <span>Doorstep service</span>
          </div>
        </div>
      </div>

      <div className="highlights-row">
        {highlights.map((item) => (
          <article key={item.title} className="highlight-card">
            <h3>{item.icon} {item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default HomePage;