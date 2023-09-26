import Breadcrumb from "../../components/Breadcrumb";
import Meta from "../../components/Meta";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiInfoCircle, BiPhoneCall } from "react-icons/bi";
import "./styles.css";

const Contact = () => {
    return (
        <>
            <Meta title="Contacto" />
            <Breadcrumb title="Contacto" />
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-12">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3286.4423285471976!2d-58.715195624455674!3d-34.54235435425973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcbd0d64956237%3A0x31423264dad3b599!2sAv.%20Dr.%20Ricardo%20Balb%C3%ADn%201234%2C%20B1663NCM%20San%20Miguel%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1694037152435!5m2!1ses-419!2sar"
                            width="600"
                            height="450"
                            className="border-0 w-100"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                    <div className="col-lg-12 mt-lg-5 mt-3">
                        <div className="contact-inner-wrapper row">
                            <div className="col-lg-6 col-md-12">
                                <h3 className="contact-title mb-4">
                                    Envianos tu consulta
                                </h3>
                                <form
                                    action=""
                                    method="get"
                                    className="d-flex flex-column gap-3"
                                >
                                    <div>
                                        <input
                                            name="name"
                                            placeholder="Nombre"
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            name="email"
                                            placeholder="Email"
                                            type="email"
                                            className="form-control"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            name="mobile"
                                            placeholder="Teléfono"
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>
                                    <div>
                                        <div className="mb-3">
                                            <textarea
                                                className="form-control w-100"
                                                name="comments"
                                                placeholder="Comentarios"
                                                id=""
                                                rows="3"
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="btn btn-info">
                                            Enviar
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-5 col-md-12">
                                <h3 className="contact-title mb-4">
                                    O nos encontras en:
                                </h3>
                                <div>
                                    <ul className="ps-0">
                                        <li className="mb-3 d-flex align-align-items-center gap-5">
                                            <AiOutlineHome className="fs-5" />
                                            <address className="mb-0">
                                                Av. Ricardo Balbin 1234 San
                                                Miguel
                                            </address>
                                        </li>
                                        <li className="mb-3 d-flex align-align-items-center gap-5">
                                            <BiPhoneCall className="fs-5" />
                                            <a
                                                href="tel:+5491111001100"
                                                className="mb-0"
                                            >
                                                +54 9 11-1100-1100
                                            </a>
                                        </li>
                                        <li className="mb-3 d-flex align-align-items-center gap-5">
                                            <AiOutlineMail className="fs-5" />
                                            <a
                                                href="mailto:info@tech-solutions.com.ar"
                                                className="mb-0"
                                            >
                                                info@tech-solutions.com.ar
                                            </a>
                                        </li>
                                        <li className="mb-3 d-flex align-align-items-center gap-5">
                                            <BiInfoCircle className="fs-5" />
                                            <p className="mb-0">
                                                Lunes a Viernes de 9 a 18hs
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
