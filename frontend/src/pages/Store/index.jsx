import { useRef, useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import Meta from "../../components/Meta";
import useEcommerceStore from "../../stores/ecommerceStore";
import ProductCard from "../../components/ProductCard";
import ReactStars from "react-rating-stars-component";
import "./styles.css";

import WatchImg from "../../assets/images/watch.jpg";
import GridImg1 from "../../assets/images/gr1.svg";
import GridImg2 from "../../assets/images/gr2.svg";
import GridImg3 from "../../assets/images/gr3.svg";
import GridImg4 from "../../assets/images/gr4.svg";

const Store = () => {
    const auth = JSON.parse(localStorage.getItem("authStore"));

    const [grid, setGrid] = useState(4);

    const {
        categories,
        getCategories,
        products,
        getProducts,
        productsByRating,
        getProductsByRating,
    } = useEcommerceStore((state) => {
        return {
            categories: state.categories,
            getCategories: state.getCategories,
            products: state.products,
            getProducts: state.getProducts,
            productsByRating: state.productsByRating,
            getProductsByRating: state.getProductsByRating,
        };
    });

    const catRef = useRef(categories);
    const prodRef = useRef(products);

    useEffect(() => {
        getCategories();
        getProducts();
        getProductsByRating();
    }, [catRef.current, prodRef.current]);

    return (
        <>
            <Meta title="Tienda" />
            <Breadcrumb title="Tienda" />
            <div className="container mt-lg-5 mb-5">
                <div className="row pt-3">
                    <div className="col-lg-3 d-none d-xxl-block d-lg-block">
                        <div className="filter-card mb-3 card">
                            <h3 className="filter-title">Categorías</h3>
                            <ul className="ps-0">
                                {categories.map((category) => (
                                    <li
                                        key={category.id}
                                        className="d-flex align-items-center"
                                    >
                                        {category.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="filter-card mb-3 card">
                            <h3 className="filter-title">Filtrar por:</h3>
                            <div>
                                <h5 className="filter-subtitle">Precio</h5>
                                <div className="d-flex align-items-center gap-2">
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            className="form-control px-3"
                                            id="priceFor"
                                            placeholder="Desde"
                                        />
                                        <label
                                            htmlFor="priceFor"
                                            className="ps-1"
                                        >
                                            Desde:
                                        </label>
                                    </div>
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            className="form-control px-3"
                                            id="priceTo"
                                            placeholder="Hasta"
                                        />
                                        <label
                                            htmlFor="priceTo"
                                            className="ps-1"
                                        >
                                            Hasta:
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="filter-card mb-3 card">
                            <h3 className="filter-title">Destacados</h3>
                            <div>
                                {productsByRating.slice(0, 3).map((product) => (
                                    <div
                                        className="random-products d-flex mb-3"
                                        key={product.id}
                                    >
                                        <div className="w-50">
                                            <img
                                                src={WatchImg}
                                                alt="watch"
                                                className="img-fluid"
                                            />
                                        </div>
                                        <div className="w-50">
                                            <h5>{product.title}</h5>
                                            <ReactStars
                                                count={5}
                                                size={24}
                                                activeColor="#ffd700"
                                                value={product.rating}
                                                edit={false}
                                            />
                                            <b>$ {product.price}</b>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-12">
                        <div className="filter-sort-grid mb-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <p
                                        className="mb-0 d-block"
                                        style={{ width: "150px" }}
                                    >
                                        Ordenar por:
                                    </p>
                                    <select
                                        name=""
                                        id=""
                                        className="form-control form-select ps-2"
                                    >
                                        <option value="best-selling">
                                            Mas Vendidos
                                        </option>
                                        <option value="title-ascending">
                                            De la A a la Z
                                        </option>
                                        <option value="title-descending">
                                            De la Z a la A
                                        </option>
                                        <option value="price-ascending">
                                            Precio - Más bajo primero
                                        </option>
                                        <option value="price-descending">
                                            Precio - Más alto primero
                                        </option>
                                        <option value="created-descending">
                                            Mas Recientes
                                        </option>
                                        <option value="created-ascending">
                                            Mas Antiguos
                                        </option>
                                    </select>
                                </div>
                                <div className="d-flex align-items-center d-none d-lg-block">
                                    <div className="d-flex align-items-center gap-2 grid">
                                        <img
                                            onClick={() => {
                                                setGrid(3);
                                            }}
                                            src={GridImg4}
                                            alt="grid"
                                            className="d-block img-fluid"
                                        />
                                        <img
                                            onClick={() => {
                                                setGrid(4);
                                            }}
                                            src={GridImg3}
                                            alt="grid"
                                            className="d-block img-fluid"
                                        />
                                        <img
                                            onClick={() => {
                                                setGrid(6);
                                            }}
                                            src={GridImg2}
                                            alt="grid"
                                            className="d-block img-fluid"
                                        />
                                        <img
                                            onClick={() => {
                                                setGrid(12);
                                            }}
                                            src={GridImg1}
                                            alt="grid"
                                            className="d-block img-fluid"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="products-list pb-5 d-flex flex-wrap gap-2">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    id={product.id}
                                    image={product.image}
                                    title={product.title}
                                    description={product.description}
                                    price={product.price}
                                    rating={product.rating}
                                    grid={grid}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Store;
