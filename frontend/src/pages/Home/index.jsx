import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import useEcommerceStore from "../../stores/ecommerceStore";

import SmallBanner from "../../components/SmallBanner";
import ProductCard from "../../components/ProductCard";
import MainBanner from "../../assets/images/main-banner.jpg";
import CatBanner01 from "../../assets/images/catbanner-01.jpg";
import CatBanner02 from "../../assets/images/catbanner-02.jpg";
import CatBanner03 from "../../assets/images/catbanner-03.jpg";
import CatBanner04 from "../../assets/images/catbanner-04.jpg";
import Services from "../../components/Services";

import "./styles.css";
import MarqueeWrapper from "../../components/MarqueeWrapper";

const Home = () => {
    const { categories, getCategories, productsByRating, getProductsByRating } =
        useEcommerceStore((state) => {
            return {
                categories: state.categories,
                getCategories: state.getCategories,
                productsByRating: state.productsByRating,
                getProductsByRating: state.getProductsByRating,
            };
        });

    const prods = useRef(productsByRating);
    const cat = useRef(categories);

    useEffect(() => {
        getCategories();
        getProductsByRating();
    }, [cat.current, prods.current]);

    return (
        <>
            <div className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <div className="main-banner position-relative">
                                <img
                                    src={MainBanner}
                                    alt="main-banner"
                                    className="img-fluid rounded-3"
                                />
                                <div className="main-banner-content position-absolute">
                                    <h4>MÚSICA EN ALTA CALIDAD</h4>
                                    <h5 className="d-none d-lg-block">
                                        Oferta Especial
                                    </h5>
                                    <p className="mb-0">A sólo $10.000</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div className="row">
                                <div className="col-lg-6 col-md-12">
                                    <div className="d-flex flex-wrap mt-xxl-0 mt-3 gap-15 justify-content-between align-items-center">
                                        <SmallBanner
                                            image={CatBanner01}
                                            title="Portabilidad y Diseño"
                                            subtitle="Oferta Especial"
                                            description="Desde $399.000"
                                        />
                                        <SmallBanner
                                            image={CatBanner02}
                                            title="Tecnología en tu muñeca"
                                            subtitle="Oferta Especial"
                                            description="Desde $19.000"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12">
                                    <div className="d-flex flex-wrap mt-xxl-0 mt-3 gap-15 justify-content-between align-items-center">
                                        <SmallBanner
                                            image={CatBanner03}
                                            title="Siempre conectado"
                                            subtitle="Oferta Especial"
                                            description="Desde $199.000"
                                        />
                                        <SmallBanner
                                            image={CatBanner04}
                                            title="escuchá"
                                            subtitle="Oferta Especial"
                                            description="Desde $3.000"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Services />
            <div className="products-section py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="section-heading">
                                Productos Destacados
                            </h3>
                        </div>
                        {productsByRating.slice(0, 4).map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                image={product.image}
                                title={product.title}
                                price={product.price}
                                rating={product.rating}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <MarqueeWrapper />
        </>
    );
};

export default Home;
