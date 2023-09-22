import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import "./styles.css";

// Images
import AddCartImg from "../../assets/images/add-cart.svg";
import WishImg from "../../assets/images/wish.svg";
import ViewImg from "../../assets/images/view.svg";
import WatchImg from "../../assets/images/watch.jpg";
import Watch1Img from "../../assets/images/watch-1.jpeg";

const ProductCard = (props) => {
    const { grid } = props;
    let location = useLocation();
    return (
        <div
            className={`${
                location.pathname == "/tienda" ? `gr-${grid}` : "col-3"
            }`}
        >
            <Link to="producto/:id" className="product-card position-relative">
                <div className="wishlist-icon position-absolute">
                    <button className="border-0 bg-transparent">
                        <img src={WishImg} alt="add wishlist" />
                    </button>
                </div>
                <div className="product-image">
                    <img
                        src={WatchImg}
                        className="img-fluid"
                        alt="product image"
                    />
                    <img
                        src={Watch1Img}
                        className="img-fluid"
                        alt="product image"
                    />
                </div>
                <div className="product-details">
                    <h6 className="brand">Casio</h6>
                    <h5 className="product-title">Smartwatch Deportivo</h5>
                    <ReactStars
                        count={5}
                        size={24}
                        activeColor="#ffd700"
                        value={3}
                        edit={false}
                    />
                    <p
                        className={`description ${
                            grid === 12 ? "d-block" : "d-none"
                        }`}
                    >
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Obcaecati, voluptatem quam dolorem blanditiis
                        placeat natus itaque consequatur aliquam sunt ullam.
                        Rem, reiciendis voluptatibus! Quos ad voluptatem nulla
                        dolores hic maiores!
                    </p>
                    <p className="price">$ 1000</p>
                </div>
                <div className="action-bar position-absolute">
                    <div className="d-flex flex-column gap-15">
                        <button className="border-0 bg-transparent">
                            <img src={ViewImg} alt="view" />
                        </button>
                        <button className="border-0 bg-transparent">
                            <img src={AddCartImg} alt="add cart" />
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
