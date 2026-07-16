import { FaArrowRight } from "react-icons/fa";

function HomePage({ onExploreMenu }) {
  return (
    <section className="home">
      <h1>Saffron Courtyard</h1>

      <p className="subheading">
        Authentic Homemade Food Delivered with Care
      </p>

      <img
        src="https://shef.com/homemade-food/wp-content/uploads/62460e1038486f1fc22ce529_33726b86.jpg"
        alt="Home cooked meal"
        className="home-image"
      />

      <p>
        Saffron Courtyard brings warm homemade South Indian meals to your
        table. Every dish is crafted with fresh ingredients, classic spices,
        and a comforting hotel-style presentation.
      </p>

      <button className="circle-arrow" onClick={onExploreMenu}>
        <FaArrowRight />
      </button>
    </section>
  );
}

export default HomePage;