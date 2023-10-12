import { services } from "../../utils/ServicesData";
import "./styles.css";

const Services = () => {
    return (
        <div className="py-5 services-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between">
                            {services.map((service, index) => {
                                return (
                                    <div
                                        className="d-flex align-items-center gap-15 mt-lg-0 mt-5"
                                        key={index}
                                    >
                                        <img
                                            src={service.image}
                                            alt="services"
                                        />
                                        <div>
                                            <h6>{service.title}</h6>
                                            <p className="mb-0">
                                                {service.tagline}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
