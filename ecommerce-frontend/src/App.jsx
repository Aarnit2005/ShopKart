import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:8080";

// Product images stored inside public/products
const productImages = {
  "Gaming Laptop": "/products/gaming-laptop.jpg",
  "HP Pavilion 15": "/products/hp.jpeg",
  "Samsung Galaxy S24": "/products/Samsung Galaxy S24.jpeg",
  "Apple iPhone 15": "/products/Apple Iphone 15.jpeg",
  "Sony WH-1000XM5": "/products/sony-xm5.jpeg",
  "Logitech MX Keys S": "/products/mx-keys.jpeg",
  "Logitech MX Master 3S": "/products/mx master.jpeg",
  "Dell UltraSharp 27": "/products/dell monitor.jpeg",
  "Lenovo Legion 5": "/products/legion-5.jpeg",
  "Apple iPad Air": "/products/ipad air.jpeg",
  "Apple Watch SE": "/products/apple watch.jpeg",
  "Samsung 990 EVO 1TB": "/products/samsung 990.jpeg",
  "Anker PowerCore 20000": "/products/anker powerbank.jpeg",
};

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [showAccount, setShowAccount] = useState(false);
  const [accountMode, setAccountMode] = useState("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");

  // Load products and cart when website opens
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  // =========================
  // PRODUCTS
  // =========================

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API}/products`);

      if (!response.ok) {
        throw new Error("Failed to load products");
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Product loading error:", error);
    }
  };

  // =========================
  // CART
  // =========================

  const fetchCart = async () => {
    try {
      const response = await fetch(`${API}/cart/3`);

      if (!response.ok) {
        throw new Error("Failed to load cart");
      }

      const cartData = await response.json();

      const cartProducts = [];

      for (const item of cartData) {
        try {
          const productResponse = await fetch(
            `${API}/products/${item.productId}`
          );

          if (productResponse.ok) {
            const product = await productResponse.json();

            cartProducts.push({
              ...product,
              cartId: item.id,
              quantity: item.quantity,
            });
          }
        } catch (error) {
          console.error("Error loading cart product:", error);
        }
      }

      setCart(cartProducts);
    } catch (error) {
      console.error("Cart loading error:", error);
    }
  };

  const addToCart = async (product) => {
    try {
      const response = await fetch(`${API}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 3,
          productId: product.id,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not add product");
      }

      await fetchCart();

      showMessage(`${product.name} added to cart!`);
    } catch (error) {
      console.error("Add to cart error:", error);
      showMessage("Could not add product to cart.");
    }
  };

  const removeFromCart = async (cartId) => {
    try {
      const response = await fetch(`${API}/cart/${cartId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Could not remove item");
      }

      await fetchCart();

      showMessage("Product removed from cart.");
    } catch (error) {
      console.error("Remove cart error:", error);
    }
  };

  // =========================
  // MESSAGES
  // =========================

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  // =========================
  // ACCOUNT
  // =========================

  const openAccount = () => {
    setShowAccount(true);
    setMessage("");
  };

  const closeAccount = () => {
    setShowAccount(false);
    setName("");
    setEmail("");
    setPassword("");
    setMessage("");
  };

  // =========================
  // LOGIN
  // =========================

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login request failed");
      }

      const result = await response.json();

      if (result === true) {
        setLoggedIn(true);
        closeAccount();
        showMessage("Login successful!");
      } else {
        showMessage("Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      showMessage("Unable to connect to the server.");
    }
  };

  // =========================
  // REGISTER
  // =========================

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      setName("");
      setEmail("");
      setPassword("");

      setAccountMode("login");

      showMessage("Account created successfully!");
    } catch (error) {
      console.error("Registration error:", error);
      showMessage("Unable to create account.");
    }
  };

  // =========================
  // CART NAVIGATION
  // =========================

  const openCart = () => {
    const cartSection = document.getElementById("cart");

    if (cartSection) {
      cartSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // =========================
  // SHOP NOW
  // =========================

  const goToProducts = () => {
    const productsSection = document.getElementById("products");

    if (productsSection) {
      productsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // =========================
  // CHECKOUT
  // =========================

  const handleCheckout = () => {
    if (cart.length === 0) {
      showMessage("Your cart is empty.");
      return;
    }

    showMessage(
      "Checkout started! Payment integration coming next."
    );
  };

  // =========================
  // FILTER PRODUCTS
  // =========================

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  // =========================
  // CART TOTAL
  // =========================

  const cartTotal = cart.reduce(
    (total, product) =>
      total + product.price * product.quantity,
    0
  );

  return (
    <div className="app">

      {/* =========================
          NAVBAR
      ========================= */}

      <header className="navbar">

        <div className="logo">
          🛒 <span>ShopKart</span>
        </div>

        <div className="search-box">

          <input
            type="text"
            placeholder="Search for products, brands and more..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

          <button>
            🔍
          </button>

        </div>

        <div className="nav-actions">

          <button
            className="account-btn"
            onClick={openAccount}
          >
            👤
            <span>
              {loggedIn ? "My Account" : "Account"}
            </span>
          </button>

          <button
            className="cart-btn"
            onClick={openCart}
          >
            🛒
            <span>Cart</span>

            {cart.length > 0 && (
              <span className="cart-count">
                {cart.length}
              </span>
            )}

          </button>

        </div>

      </header>


      {/* =========================
          CATEGORY BAR
      ========================= */}

      <nav className="category-bar">

        {[
          "All",
          "Electronics",
          "Mobiles",
          "Computers",
          "Accessories",
        ].map((item) => (

          <button
            key={item}
            className={
              category === item
                ? "active-category"
                : ""
            }
            onClick={() => setCategory(item)}
          >
            {item}
          </button>

        ))}

      </nav>


      {/* =========================
          TOAST
      ========================= */}

      {message && (
        <div className="toast">
          {message}
        </div>
      )}


      {/* =========================
          HERO
      ========================= */}

      <section className="hero">

        <div className="hero-content">

          <p className="hero-small">
            LIMITED TIME OFFER
          </p>

          <h1>
            Upgrade Your
            <br />
            <span>Everyday Tech</span>
          </h1>

          <p className="hero-description">
            Discover powerful devices, accessories
            and everything you need for your
            digital lifestyle.
          </p>

          <button
            className="shop-now"
            onClick={goToProducts}
          >
            Shop Now →
          </button>

        </div>

        <div className="hero-product">
          💻
        </div>

      </section>


      {/* =========================
          FEATURES
      ========================= */}

      <section className="features">

        <div>
          <strong>
            🚚 Free Delivery
          </strong>

          <span>
            On orders above ₹999
          </span>
        </div>

        <div>
          <strong>
            🔒 Secure Payments
          </strong>

          <span>
            100% secure checkout
          </span>
        </div>

        <div>
          <strong>
            ↩️ Easy Returns
          </strong>

          <span>
            7-day return policy
          </span>
        </div>

        <div>
          <strong>
            ⚡ Fast Support
          </strong>

          <span>
            We're here to help
          </span>
        </div>

      </section>


      {/* =========================
          PRODUCTS
      ========================= */}

      <main
        id="products"
        className="products-section"
      >

        <div className="section-heading">

          <div>

            <p className="section-label">
              EXPLORE
            </p>

            <h2>
              Featured Products
            </h2>

          </div>

          <span>
            {filteredProducts.length} products
          </span>

        </div>


        {filteredProducts.length === 0 ? (

          <div className="empty">

            <h3>
              No products found
            </h3>

            <p>
              Try another search or category.
            </p>

          </div>

        ) : (

          <div className="product-grid">

            {filteredProducts.map((product) => (

              <div
                className="product-card"
                key={product.id}
              >

                {/* PRODUCT IMAGE */}

                <div className="product-image">

                  {productImages[product.name] ? (

                    <img
                      src={productImages[product.name]}
                      alt={product.name}
                      className="product-photo"
                    />

                  ) : (

                    <div className="product-icon">

                      {product.category === "Mobiles"
                        ? "📱"
                        : product.category === "Computers"
                        ? "💻"
                        : product.category === "Accessories"
                        ? "🎧"
                        : "🛍️"}

                    </div>

                  )}

                  <span className="discount">
                    SALE
                  </span>

                </div>


                {/* PRODUCT INFORMATION */}

                <div className="product-info">

                  <p className="product-category">
                    {product.category}
                  </p>

                  <h3>
                    {product.name}
                  </h3>

                  <p className="description">
                    {product.description}
                  </p>

                  <div className="rating">
                    ⭐⭐⭐⭐⭐
                    <span>
                      (24)
                    </span>
                  </div>

                  <div className="price-row">

                    <span className="price">
                      ₹
                      {product.price.toLocaleString(
                        "en-IN"
                      )}
                    </span>

                  </div>

                  <div className="stock">

                    {product.stock > 0
                      ? `✓ ${product.stock} left in stock`
                      : "Out of stock"}

                  </div>

                  <button
                    className="add-button"
                    disabled={product.stock <= 0}
                    onClick={() =>
                      addToCart(product)
                    }
                  >
                    🛒 Add to Cart
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>


      {/* =========================
          CART
      ========================= */}

      <section
        id="cart"
        className="cart-section"
      >

        <div className="section-heading">

          <div>

            <p className="section-label">
              YOUR SHOPPING BAG
            </p>

            <h2>
              Your Cart
            </h2>

          </div>

          <span>
            {cart.length} items
          </span>

        </div>


        {cart.length === 0 ? (

          <div className="cart-empty">

            <div className="empty-cart-icon">
              🛒
            </div>

            <h3>
              Your cart is empty
            </h3>

            <p>
              Add products to get started.
            </p>

            <button
              className="continue-shopping"
              onClick={goToProducts}
            >
              Continue Shopping
            </button>

          </div>

        ) : (

          <div className="cart-items">

            {cart.map((product) => (

              <div
                className="cart-item"
                key={product.cartId}
              >

                <div className="cart-product-icon">

                  {productImages[product.name] ? (

                    <img
                      src={productImages[product.name]}
                      alt={product.name}
                    />

                  ) : (

                    product.category === "Mobiles"
                      ? "📱"
                      : product.category === "Computers"
                      ? "💻"
                      : "🎧"

                  )}

                </div>


                <div className="cart-product-info">

                  <h3>
                    {product.name}
                  </h3>

                  <p>
                    {product.description}
                  </p>

                  <span>
                    Quantity: {product.quantity}
                  </span>

                </div>


                <strong>
                  ₹
                  {(
                    product.price *
                    product.quantity
                  ).toLocaleString("en-IN")}
                </strong>


                <button
                  className="remove-button"
                  onClick={() =>
                    removeFromCart(
                      product.cartId
                    )
                  }
                >
                  Remove
                </button>

              </div>

            ))}


            <div className="cart-total">

              <span>
                Total
              </span>

              <strong>
                ₹
                {cartTotal.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>


            <button
              className="checkout"
              onClick={handleCheckout}
            >
              Proceed to Checkout →
            </button>

          </div>

        )}

      </section>


      {/* =========================
          ACCOUNT MODAL
      ========================= */}

      {showAccount && (

        <div
          className="modal-overlay"
          onClick={closeAccount}
        >

          <div
            className="account-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="close-modal"
              onClick={closeAccount}
            >
              ×
            </button>


            <div className="account-icon">
              👤
            </div>


            {accountMode === "login" ? (

              <>

                <h2>
                  Welcome Back
                </h2>

                <p className="modal-subtitle">
                  Login to your ShopKart account
                </p>


                <form
                  onSubmit={handleLogin}
                >

                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event) =>
                      setEmail(
                        event.target.value
                      )
                    }
                    required
                  />


                  <label>
                    Password
                  </label>

                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) =>
                      setPassword(
                        event.target.value
                      )
                    }
                    required
                  />


                  <button
                    type="submit"
                    className="modal-submit"
                  >
                    Login
                  </button>

                </form>


                <p className="switch-account">

                  Don't have an account?

                  <button
                    onClick={() => {
                      setAccountMode(
                        "register"
                      );
                      setMessage("");
                    }}
                  >
                    Create Account
                  </button>

                </p>

              </>

            ) : (

              <>

                <h2>
                  Create Account
                </h2>

                <p className="modal-subtitle">
                  Join ShopKart today
                </p>


                <form
                  onSubmit={handleRegister}
                >

                  <label>
                    Full Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(event) =>
                      setName(
                        event.target.value
                      )
                    }
                    required
                  />


                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event) =>
                      setEmail(
                        event.target.value
                      )
                    }
                    required
                  />


                  <label>
                    Password
                  </label>

                  <input
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(event) =>
                      setPassword(
                        event.target.value
                      )
                    }
                    required
                  />


                  <button
                    type="submit"
                    className="modal-submit"
                  >
                    Create Account
                  </button>

                </form>


                <p className="switch-account">

                  Already have an account?

                  <button
                    onClick={() => {
                      setAccountMode(
                        "login"
                      );
                      setMessage("");
                    }}
                  >
                    Login
                  </button>

                </p>

              </>

            )}

          </div>

        </div>

      )}


      {/* =========================
          FOOTER
      ========================= */}

      <footer>

        <div className="footer-logo">
          🛒 ShopKart
        </div>

        <p>
          Modern e-commerce platform powered by
          React, Spring Boot, PostgreSQL,
          Redis & Kafka.
        </p>

        <span>
          © 2026 ShopKart. All rights reserved.
        </span>

      </footer>

    </div>
  );
}

export default App;