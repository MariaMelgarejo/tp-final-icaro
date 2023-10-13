import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import "./styles.css";

// Images
import AddCartImg from "../../assets/images/add-cart.svg";
import WishImg from "../../assets/images/wish.svg";
import ViewImg from "../../assets/images/view.svg";

const ProductCard = ({
    grid,
    title,
    image,
    rating,
    price,
    description,
    id,
}) => {
    let location = useLocation();
    const arrayLocation = location.pathname.split("/");

    return (
        <div
            className={`${
                arrayLocation[1] == "tienda"
                    ? `gr-${grid} mb-2`
                    : "col-lg-3 col-md-12"
            }`}
        >
            <Link
                to={`${`/tienda/producto/${id}`}`}
                className="product-card position-relative"
            >
                <div className="wishlist-icon position-absolute">
                    <button className="border-0 bg-transparent">
                        <img src={WishImg} alt="add wishlist" />
                    </button>
                </div>
                <div className="product-image">
                    <img
                        src={image}
                        className="img-fluid rounded"
                        alt="product image"
                    />
                </div>
                <div className="product-details">
                    <h5 className="product-title mt-4">{title}</h5>
                    <ReactStars
                        count={5}
                        size={24}
                        activeColor="#ffd700"
                        value={rating}
                        edit={false}
                    />
                    <p
                        className={`description ${
                            grid === 12 ? "d-block" : "d-none"
                        }`}
                    >
                        {description}
                    </p>
                    <p className="price">$ {price}</p>
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
