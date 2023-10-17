import { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import Meta from "../../components/Meta";
import useEcommerceStore from "../../stores/ecommerceStore";
import ProductCard from "../../components/ProductCard";
import ReactStars from "react-rating-stars-component";
import { Pagination } from "antd";
import "./styles.css";

import GridImg1 from "../../assets/images/gr1.svg";
import GridImg2 from "../../assets/images/gr2.svg";
import GridImg3 from "../../assets/images/gr3.svg";
import GridImg4 from "../../assets/images/gr4.svg";

const Store = () => {
    const auth = JSON.parse(localStorage.getItem("authStore"));

    const [grid, setGrid] = useState(4);
    const [sortBy, setSortBy] = useState("best-rating");
    const [search, setSearch] = useState(null);
    const [priceFrom, setPriceFrom] = useState(0);
    const [priceTo, setPriceTo] = useState(0);

    let location = useLocation();
    const arrayLocation = location.pathname.split("/");
    const category = arrayLocation[3];

    const {
        categories,
        getCategories,
        products,
        totalProducts,
        setProducts,
        productsByRating,
        getProductsByRating,
        getProductsByCategory,
        getProductsWithPagination,
    } = useEcommerceStore((state) => {
        return {
            categories: state.categories,
            getCategories: state.getCategories,
            products: state.products,
            totalProducts: state.totalProducts,
            setProducts: state.setProducts,
            productsByRating: state.productsByRating,
            getProductsByRating: state.getProductsByRating,
            getProductsByCategory: state.getProductsByCategory,
            getProductsWithPagination: state.getProductsWithPagination,
        };
    });

    const catRef = useRef(categories);
    const prodRef = useRef(products);

    useEffect(() => {
        getCategories();
        if (location.pathname === "/tienda") {
            getProductsWithPagination({
                page: 1,
                limit: 12,
            });
        } else {
            getProductsByCategory(category);
        }
        getProductsByRating();
    }, [catRef.current, prodRef.current, location.pathname]);

    useEffect(() => {
        switch (sortBy) {
            case "title-ascending":
                setProducts(sort_lists("title", products));
                break;
            case "title-descending":
                setProducts(sort_lists("title", products, true));
                break;
            case "price-ascending":
                setProducts(sort_lists("price", products));
                break;
            case "price-descending":
                setProducts(sort_lists("price", products, true));
                break;
            case "created-descending":
                setProducts(sort_lists("createdAt", products, true));
                break;
            case "created-ascending":
                setProducts(sort_lists("createdAt", products));
                break;
            default:
                setProducts(sort_lists("rating", products, true));
                break;
        }
    }, [sortBy]);

    const sort_lists = (key, list, inverse) =>
        inverse
            ? [...list].sort((b, a) =>
                  a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0
              )
            : [...list].sort((a, b) =>
                  a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0
              );

    const handleSearch = (e) => {
        if (e.target.value !== "") {
            setSearch(e.target.value);
        } else {
            setSearch(null);
            getProductsWithPagination({
                page: 1,
                limit: 12,
            });
        }
    };

    useEffect(() => {
        if (search) {
            const filteredProducts = products.filter((product) => {
                if (
                    product.title.toLowerCase().includes(search.toLowerCase())
                ) {
                    return true;
                }
                return false;
            });
            setProducts(filteredProducts);
        }
    }, [search]);

    useEffect(() => {
        if (priceFrom == "") {
            setPriceFrom(0);
            document.querySelector("#priceFrom").value = 0;
        }
        if (priceTo == "") {
            setPriceTo(0);
            document.querySelector("#priceTo").value = 0;
        }
        if (priceFrom == 0 && priceTo == 0)
            getProductsWithPagination({
                page: 1,
                limit: 12,
            });
        if (priceFrom == 0 && priceTo != 0) {
            const filteredProducts = products.filter((product) => {
                if (product.price <= priceTo) {
                    return true;
                }
                return false;
            });
            setProducts(filteredProducts);
        } else if (priceFrom != 0 && priceTo == 0) {
            const filteredProducts = products.filter((product) => {
                if (product.price >= priceFrom) {
                    return true;
                }
                return false;
            });
            setProducts(filteredProducts);
        } else {
            const filteredProducts = products.filter((product) => {
                if (product.price >= priceFrom && product.price <= priceTo) {
                    return true;
                }
                return false;
            });
            setProducts(filteredProducts);
        }
    }, [priceFrom, priceTo]);

    const [current, setCurrent] = useState(1);
    const onChangePage = (page) => {
        getProductsWithPagination({
            page,
            limit: 12,
        });
        setCurrent(page);
    };

    return (
        <>
            <Meta title="Tienda" />
            <Breadcrumb title="Tienda" />
            <div className="container mt-lg-5 mb-5">
                <div className="row pt-3">
                    <div className="col-lg-3 d-none d-xxl-block d-lg-block">
                        <div className="filter-card mb-3 card">
                            <h3 className="filter-title">Buscar</h3>
                            <input
                                type="text"
                                className="form-control px-2"
                                placeholder="Buscar"
                                onChange={handleSearch}
                            />
                        </div>
                        <div className="filter-card mb-3 card">
                            <h3 className="filter-title">Categorías</h3>
                            <ul className="ps-0">
                                {categories.map((category) => {
                                    if (category.active) {
                                        return (
                                            <Link
                                                key={category.id}
                                                to={`/tienda/categorias/${category.title}`}
                                                className="d-flex align-items-center"
                                            >
                                                {category.title}
                                            </Link>
                                        );
                                    }
                                })}
                            </ul>
                        </div>
                        <div className="filter-card mb-3 card">
                            <h3 className="filter-title">Filtrar por:</h3>
                            <div>
                                <h5 className="filter-subtitle">Precio</h5>
                                <div className="d-flex align-items-center gap-2">
                                    <div className="form-floating">
                                        <input
                                            type="number"
                                            min={0}
                                            className="form-control px-3"
                                            id="priceFrom"
                                            defaultValue={0}
                                            onBlur={(e) =>
                                                setPriceFrom(e.target.value)
                                            }
                                        />
                                        <label
                                            htmlFor="priceFrom"
                                            className="ps-1"
                                        >
                                            Desde $
                                        </label>
                                    </div>
                                    <div className="form-floating">
                                        <input
                                            type="number"
                                            min={0}
                                            className="form-control px-3"
                                            defaultValue={0}
                                            id="priceTo"
                                            onBlur={(e) =>
                                                setPriceTo(e.target.value)
                                            }
                                        />
                                        <label
                                            htmlFor="priceTo"
                                            className="ps-1"
                                        >
                                            Hasta $
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="filter-card mb-3 card">
                            <h3 className="filter-title">Destacados</h3>
                            <div>
                                {productsByRating.slice(0, 5).map((product) => (
                                    <Link
                                        to={`/tienda/producto/${product.id}`}
                                        className="random-products d-flex mb-3 gap-2"
                                        key={product.id}
                                    >
                                        <div className="w-50">
                                            <img
                                                src={product.image}
                                                alt="watch"
                                                className="img-fluid rounded"
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
                                    </Link>
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
                                        id="select-products"
                                        className="form-control form-select ps-2"
                                        onChange={(e) => {
                                            setSortBy(e.target.value);
                                        }}
                                    >
                                        <option value="best-rating">
                                            Mas Destacados
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
                        {search ? (
                            <div className="filter-sort-grid d-flex justify-content-center align-items-center mb-3">
                                <p className="text-center mb-0">
                                    Resultados de la busqueda: {search}
                                </p>
                            </div>
                        ) : (
                            ""
                        )}
                        <div className="products-list pb-2 d-flex flex-wrap gap-2">
                            {products.map((product) => {
                                if (product.active) {
                                    return (
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
                                    );
                                }
                            })}
                        </div>
                        <div className="bg-white rounded py-3 d-flex justify-content-center">
                            <Pagination
                                current={current}
                                onChange={onChangePage}
                                total={totalProducts}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Store;
