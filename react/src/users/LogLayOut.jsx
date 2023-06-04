import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";

export default function LogLayOut({ title, buttonText }) {
    LogLayOut.propTypes = {
        title: PropTypes.string,
        buttonText: PropTypes.string,
    };
    const [user, setuser] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem("profile"))?.token;
    useEffect(() => {
        if (token) {
            navigate("/dashBoard");
        }
    }, [navigate, token]);
    const handelClick = (e) => {
        e.preventDefault();
        if (title === "Sign in") {
            const { email, password } = user;
            console.log(email);
            console.log(password);
            const data = {
                email: email,
                password: password,
            };
            try {
                axios
                    .post("http://127.0.0.1:8000/api/log", data)
                    .then((resp) => {
                        const { user, token } = resp.data;
                        localStorage.setItem(
                            "profile",
                            JSON.stringify({
                                user: user,
                                token: token,
                            })
                        );
                        if (token) {
                            navigate("/dashboard");
                        }
                    });
            } catch (error) {
                console.log(error);
            }
        } else if (title === "Sign up") {
            console.log("up");
        }
    };
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                        {title}
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" method="Post">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-white"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e) =>
                                        setuser({
                                            ...user,
                                            email: e.target.value,
                                        })
                                    }
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-white"
                                >
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    onChange={(e) =>
                                        setuser({
                                            ...user,
                                            password: e.target.value,
                                        })
                                    }
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                onClick={handelClick}
                                className=" flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {buttonText}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
