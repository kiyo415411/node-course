import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { API_URL } from '../utils/config';
// CORS policy 瀏覽器的安全性控制 | 跨來源資源共用
// 只要跨來源就會被瀏覽器阻擋
// 想開放 > 找後端開放 > cors | 第三方開發的中間件

const Stock = () => {
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        // axios.get(URL, config)
        let getStocks = async () => {
            let response = await axios.get(API_URL + '/stocks');
            setStocks(response.data);
        };
        getStocks();
    }, []); // [] 初始值

    return (
        <div>
            <h2 className='ml-7 mt-6 text-xl text-gray-600'>股票代碼</h2>
            {stocks.map((stock) => {
                return (
                    <div
                        key={stock.id}
                        className='bg-white bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg m-6 cursor-pointer'
                    >
                        <Link to={`/stock/${stock.id}`}>
                            <h2 className='text-2xl font-bold mb-2 text-gray-800'>
                                {stock.id}
                            </h2>
                            <p className='text-gray-700'>{stock.name}</p>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};

export default Stock;
