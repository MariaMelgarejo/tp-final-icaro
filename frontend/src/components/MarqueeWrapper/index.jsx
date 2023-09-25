import Marquee from "react-fast-marquee";

const MarqueeWrapper = () => {
    return (
        <div className="py-5">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="marquee-inner-wrapper card-wrapper">
                            <Marquee className="d-flex">
                                <div className="mx-4 w-25">
                                    <img
                                        src="assets/images/brand-01.png"
                                        alt=""
                                    />
                                </div>
                                <div className="mx-4 w-25">
                                    <img
                                        src="assets/images/brand-02.png"
                                        alt=""
                                    />
                                </div>
                                <div className="mx-4 w-25">
                                    <img
                                        src="assets/images/brand-03.png"
                                        alt=""
                                    />
                                </div>
                                <div className="mx-4 w-25">
                                    <img
                                        src="assets/images/brand-04.png"
                                        alt=""
                                    />
                                </div>
                                <div className="mx-4 w-25">
                                    <img
                                        src="assets/images/brand-05.png"
                                        alt=""
                                    />
                                </div>
                                <div className="mx-4 w-25">
                                    <img
                                        src="assets/images/brand-06.png"
                                        alt=""
                                    />
                                </div>
                                <div className="mx-4 w-25">
                                    <img
                                        src="assets/images/brand-07.png"
                                        alt=""
                                    />
                                </div>
                                <div className="mx-4 w-25">
                                    <img
                                        src="assets/images/brand-08.png"
                                        alt=""
                                    />
                                </div>
                            </Marquee>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarqueeWrapper;
