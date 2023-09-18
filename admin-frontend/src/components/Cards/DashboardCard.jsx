const DashboardCard = ({
    title,
    subtitle,
    icon,
    footerIcon,
    footerText,
    color,
}) => {
    return (
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div className="card">
                <div className="card-header p-3 pt-2">
                    <div
                        className={`icon icon-lg icon-shape bg-gradient-${color} shadow-${color} text-center border-radius-xl mt-n4 position-absolute`}
                    >
                        {icon}
                    </div>
                    <div className="text-end pt-1">
                        <p className="text-sm mb-0 text-capitalize">
                            {subtitle}
                        </p>
                        <h4 className="mb-0">{title}</h4>
                    </div>
                </div>
                <hr className="dark horizontal my-0" />
                <div className="card-footer p-3">
                    <p className="mb-0">
                        <span className="text-sm font-weight-bolder me-1">
                            {footerIcon}
                        </span>
                        {footerText}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DashboardCard;
