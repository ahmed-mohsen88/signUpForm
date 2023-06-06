import axios from "axios";
import DashLayOut from "../components/DashLayOut";
import { useEffect, useState } from "react";
import StackedList from "../components/StakedList";

const DashBoard = () => {
    const [subscriptionData, setsubscriptionData] = useState([]);
    const token = JSON.parse(localStorage.getItem("profile")).token;
    const subData = async () => {
        await axios
            .get("http://127.0.0.1:8000/api/getall", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((resp) => {
                setsubscriptionData(resp.data);
                return resp.data;
            });
    };

    useEffect(() => {
        subData();
    }, []);

    return (
        <DashLayOut>
            <StackedList
                subscriptionData={subscriptionData}
                token={token}
                setsubscriptionData={setsubscriptionData}
            />
        </DashLayOut>
    );
};
export default DashBoard;
