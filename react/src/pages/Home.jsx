import rightImage from "../assets/images/illustration-sign-up-desktop.svg";
import rightImageMobile from "../assets/images/illustration-sign-up-mobile.svg";
import { PropTypes } from "prop-types";
import listIcon from "../assets/images/icon-list.svg";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/Md";

const Home = ({ setappEmail }) => {
    Home.propTypes = {
        setappEmail: PropTypes.function,
    };

    const [focus, setfocus] = useState(false);
    const smallScreen = useMediaQuery({ query: "(max-width: 450px)" });
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [activeClass, setActiveClass] = useState("");

    const navigate = useNavigate();

    const handelClick = (e) => {
        e.preventDefault();
        if (
            email.length < 5 ||
            !email.includes("@") ||
            !email.endsWith(".com")
        ) {
            setError("Valid email required");
            setActiveClass("emailInput");
        } else {
            const data = { email: email };
            axios
                .post("http://127.0.0.1:8000/api/createSub", data)
                .then((res) => console.log(res));
            setEmail("");
            navigate("/thankYou");
            setappEmail(email);
            setError("");
            setActiveClass("");
        }
    };

    const handelLogin = () => {
        navigate("/login");
    };

    return (
        <div className="container min-w-full flex justify-center items-center">
            <div className="flexBetween border rounded-3xl w-1/2 xs:p-0 p-5 bg-white xs:flex-col-reverse xs:w-full ">
                {/* left */}
                <div className="left flex flex-col justify-between gap-10 xs:gap-5 xs:justify-start xs:w-full p-5">
                    {/* top */}
                    <div className="flex justify-between items-start flex-col gap-5 xs:gap-2">
                        <button
                            className="loginBtn rounded-full text-white"
                            onMouseEnter={() => setfocus(true)}
                            onMouseLeave={() => setfocus(false)}
                            onClick={handelLogin}
                        >
                            <span>
                                <MdAccountCircle className="text-4xl" />
                            </span>
                        </button>
                        <h1 className="f_700 xs:text-[2rem]">Stay updated!</h1>
                        <p>
                            Join 60,000+ product managers receiving monthly
                            updates on:
                        </p>
                        <ul>
                            <li>
                                <p>
                                    <img
                                        src={listIcon}
                                        alt="list"
                                        className="xs:w-5 inline-flex"
                                    />
                                </p>
                                <p>
                                    Product discovery and building what matters
                                </p>
                            </li>
                            <li>
                                <p>
                                    <img
                                        src={listIcon}
                                        alt="list"
                                        className="xs:w-5 inline-flex"
                                    />
                                </p>
                                <p>Measuring to ensure updates are a success</p>
                            </li>
                            <li>
                                <p>
                                    <img
                                        src={listIcon}
                                        alt="list"
                                        className="xs:w-5 inline-flex"
                                    />
                                </p>
                                <p>And much more!</p>
                            </li>
                        </ul>
                    </div>
                    {/* bottom */}
                    <div className="bottom ">
                        <form
                            method="post"
                            className="flex flex-col justify-center items-start xs:w-full"
                        >
                            <label htmlFor="email" className="xs:text-[.9rem]">
                                Email address
                            </label>
                            <span className={`${activeClass}`}>{error}</span>
                            <input
                                required
                                type="email"
                                name="email"
                                id="email"
                                placeholder="email@company.com"
                                className={`border-[2px] w-96 xs:w-full p-2 m-2 rounded ${activeClass}`}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button
                                className="border-[2px] w-96 p-2 m-2 rounded xs:w-full submitBtn"
                                type="submit"
                                onClick={handelClick}
                            >
                                Subscribe to monthly newsletter
                            </button>
                        </form>
                    </div>
                </div>
                {/* right */}
                <div className="flex relative xs:h-full xs:w-full ">
                    {smallScreen ? (
                        <img
                            src={rightImageMobile}
                            alt="img"
                            className="w-full h-full "
                        />
                    ) : (
                        <img
                            src={rightImage}
                            alt="icon"
                            className="min-w-full w-1/2 "
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
