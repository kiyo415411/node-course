import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // 拿前端網址變數
import { API_URL } from "../utils/config";

const StockDetails = () => {
    const [data, setData] = useState([]);
    // 目前在第幾頁
    const [page, setPage] = useState(1);
    // 總筆數 1,2,3,...,12
    const [lastPage, setLastPage] = useState(1);

    const { stockId } = useParams(); // 從網址上拿變數

    useEffect(() => {
        let getPrice = async () => {
            let response = await axios.get(`${API_URL}/stocks/${stockId}`, {
                params: {
                    page: page,
                },
            });
            // 在 react 裡，不可以直接設定 state 變數
            // 一定要透過 setXXX 設定狀態才可
            setData(response.data.data);
            setLastPage(response.data.pagination.lastPage);
            // setXXX 是非同步函式
        };
        getPrice();
    }, [page, stockId]);
    // 初始化的時候, page 會從沒有定義變成預設值
    // 點擊頁碼時，會透過 onClick 去設定 page setPage(i) -> 引發副作用
    // 再次作用 api
    // 副作用皆在改變完成後才觸發
    function getPage() {
        let pages = [];
        for (let i = 1; i <= lastPage; i++) {
            pages.push(
                <li
                    key={i}
                    style={{
                        display: "inline-block",
                        margin: "2px",
                        backgroundColor: page === i ? "#00d1b2" : "",
                        borderColor: page === i ? "#00d1b2" : "#dbdbdb",
                        color: page === i ? "#fff" : "#363636",
                        borderWidth: "1px",
                        width: "28px",
                        height: "28px",
                        borderRadius: "3px",
                        textAlign: "center",
                    }}
                    onClick={(e) => {
                        setPage(i);
                    }}
                >
                    {i}
                </li>
            );
        }
        return pages;
    }
    return (
        <div>
            <ul>{getPage()}</ul>
            {data.map((item) => {
                return (
                    <div
                        key={item.date}
                        className="bg-white bg-gray-50 p-6 rounded-lg shadow m-6"
                    >
                        <h2 className="text-2xl font-bold mb-2 text-gray-800">
                            日期：{item.date}
                        </h2>
                        <h2 className="text-2xl font-bold mb-2 text-gray-800">
                            成交金額：{item.amount}
                        </h2>
                        <h2 className="text-2xl font-bold mb-2 text-gray-800">
                            成交股數：{item.volume}
                        </h2>
                        <h2 className="text-2xl font-bold mb-2 text-gray-800">
                            開盤價：{item.open_price}
                        </h2>
                        <h2 className="text-2xl font-bold mb-2 text-gray-800">
                            收盤價：{item.end_price}
                        </h2>
                        <h2 className="text-2xl font-bold mb-2 text-gray-800">
                            漲跌價差：{item.delta_price}
                        </h2>
                        <h2 className="text-2xl font-bold mb-2 text-gray-800">
                            最高價：{item.high_price}
                        </h2>
                        <h2 className="text-2xl font-bold mb-2 text-gray-800">
                            最低價：{item.low_price}
                        </h2>
                        <h2 className="text-2xl font-bold mb-2 text-gray-800">
                            成交筆數：{item.transactions}
                        </h2>
                    </div>
                );
            })}
        </div>
    );
};

export default StockDetails;
