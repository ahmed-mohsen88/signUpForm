import axios from "axios";
// import { propTypes } from "prop-types";

export default function StackedList({
    subscriptionData,
    token,
    setsubscriptionData,
}) {
    // StackedList.propTypes = {
    //     subscriptionData: propTypes?.any,
    //     token: propTypes.string,
    //     setsubscriptionData: propTypes.function,
    // };
    const handelDelete = async (id) => {
        console.log(id);
        const data = JSON.stringify({ id: `${id}` });
        console.log(data);
        try {
            await axios.delete(`http://127.0.0.1:8000/api/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            await axios
                .get("http://127.0.0.1:8000/api/getall", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((resp) => {
                    setsubscriptionData(() => resp.data);
                });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <ul role="list" className="divide-y divide-gray-100 text">
            {subscriptionData.map((person) => (
                <li
                    key={person.email}
                    className="flex justify-between gap-x-6 py-5"
                >
                    <div className="flex gap-x-4">
                        <img
                            className="h-12 w-12 flex-none rounded-full bg-gray-50"
                            alt=""
                        />
                        <div className="min-w-0 flex-auto">
                            <p className="text-xl font-semibold leading-6 text-white">
                                {person.id}
                            </p>
                            <p className="mt-1 truncate text-xl leading-5 text-white">
                                {person.email}
                            </p>
                        </div>
                    </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-end ">
                        <p className="text-xl leading-6 text-white">
                            {person.created_at}
                        </p>
                        {person.updated_at ? (
                            <>
                                <p className="mt-1 text-sm leading-5 text-white">
                                    Updated at{" "}
                                    <time dateTime={person.updated_at}>
                                        {person.updated_at}
                                    </time>
                                </p>
                                <div>
                                    <button
                                        className="bg-red-600 rounded-xl px-5 py-2 text-white"
                                        onClick={() => handelDelete(person.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="mt-1 flex items-center gap-x-1.5">
                                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                </div>
                                <p className="text-sm leading-5 text-white">
                                    Online
                                </p>
                            </div>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    );
}
