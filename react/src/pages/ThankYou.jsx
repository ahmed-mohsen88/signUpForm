import { useNavigate } from "react-router-dom";
import thank from "../assets/images/icon-success.svg";
import { PropTypes } from "prop-types";
const ThankYou = ({ appEmail }) => {
    ThankYou.propTypes = {
        appEmail: PropTypes.string,
    };
    const navigate = useNavigate();
    const handelClick = () => {
        navigate("/");
    };
    return (
        <div className="container flex justify-center items-center m-auto">
            <div className="thankContainer bg-white h-1/2  w-[22%] max-w-max max-h-max min-h-[400px] rounded-2xl p-8 flex flex-col justify-between items-start gap-2 xs:w-full xs:h-5/6 xs:justify-start xs:gap-y-7">
                <img
                    src={thank}
                    alt="thanks"
                    className="w-[12%] xs:w-16 xs:mt-10"
                />
                <h1 className="text-[2.5rem] weight_700 ">
                    Thanks for subscribing!
                </h1>
                <p className="weight_400">
                    A confirmation email has been sent to
                    <strong> {appEmail}</strong> Please open it and click the
                    button to confirm the subscription
                </p>
                <div className="h-full w-full flex xs:justify-end sm:h-fit">
                    <button
                        onClick={handelClick}
                        type=""
                        className="submitBtn p-3 rounded w-full xs:mb-0 h-fit self-end weight_400"
                    >
                        Dismiss message
                    </button>{" "}
                </div>
            </div>
        </div>
    );
};
export default ThankYou;
