import "./styles.css";
const SmallBanner = ({ image, title, subtitle, description }) => {
    return (
        <div className="small-banner position-relative">
            <img
                src={image}
                className="img-fluid rounded-3"
                alt="main banner"
            />
            <div className="small-banner-content position-absolute">
                <h4>{title}</h4>
                <h5>{subtitle}</h5>
                <p className="mb-0">{description}</p>
            </div>
        </div>
    );
};

export default SmallBanner;
