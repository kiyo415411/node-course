// 註冊頁 : 資料變動 > 資料送出
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/config";
const Register = () => {
    // const [email, setEmail] = useState("");
    // const [name, setName] = useState("");

    const [member, setMember] = useState({
        email: "jojo@gmail.com",
        name: "jojo",
        password: "test123123",
        confirmPassword: "test123123",
        photo: "",
        // 圖片的拿法比較特別，所以會特別做一個 handle 函式給他
    });

    function handleChange(e) {
        // react 事件中，不可更改原本的 state 記憶體
        // 大括號就是新的記憶體
        setMember({ ...member, [e.target.name]: e.target.value });
    }

    function handlePhoto(e) {
        // 圖片屬於多張，只抓第 1 張圖
        setMember({ ...member, photo: e.target.files[0] });
    }

    async function handleSubmit(e) {
        // Step.1 停止預設行為
        e.preventDefault();
        try {
            // axios.get(URL, params)
            // axios.post(URL, data, params)
            // ------ 方法 1 : 當你的表單沒有圖片的時候，可以直接傳輸 json 到後端去
            // let response = await axios.post(`${API_URL}/auth/register`, member);
            // console.log(response.data);
            // member 是以 json 的方法送
            // 所以要送圖片就需要改變傳送方法
            // ------ 方法 2 : 如果表單有圖片，會用 FormData 的方式來上傳
            let formData = new FormData();
            formData.append("email", member.email);
            formData.append("name", member.name);
            formData.append("password", member.password);
            formData.append("confirmPassword", member.confirmPassword);
            formData.append("photo", member.photo);
            let response = await axios.post(
                `${API_URL}/auth/register`,
                formData
            );
            console.log(response.data);
        } catch (e) {
            console.error(e);
        }
    }
    return (
        <form className="bg-purple-100 h-screen md:h-full md:my-20 md:mx-16 lg:mx-28 xl:mx-40 py-16 md:py-8 px-24 text-gray-800 md:shadow md:rounded flex flex-col md:justify-center">
            <h2 className="flex justify-center text-3xl mb-6 border-b-2 pb-2 border-gray-300">
                註冊帳戶
            </h2>
            <div className="mb-4 text-2xl">
                <label htmlFor="name" className="flex mb-2 w-32">
                    Email
                </label>
                <input
                    className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
                    type="text"
                    id="email"
                    name="email"
                    value={member.email}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4 text-2xl">
                <label htmlFor="name" className="flex mb-2 w-32">
                    姓名
                </label>
                <input
                    className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
                    type="text"
                    id="name"
                    name="name"
                    value={member.name}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4 text-2xl">
                <label htmlFor="password" className="flex mb-2 w-16">
                    密碼
                </label>
                <input
                    className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
                    type="password"
                    id="password"
                    name="password"
                    value={member.password}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-8 text-2xl">
                <label htmlFor="password" className="flex mb-2 w-32">
                    確認密碼
                </label>
                <input
                    className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={member.confirmPassword}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-8 text-2xl">
                <label htmlFor="photo" className="flex mb-2 w-32">
                    圖片
                </label>
                <input
                    className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
                    type="file"
                    id="photo"
                    name="photo"
                    onChange={handlePhoto}
                />
            </div>
            <button
                className="text-xl bg-indigo-300 px-4 py-2.5 rounded hover:bg-indigo-400 transition duration-200 ease-in"
                onClick={handleSubmit}
            >
                註冊
            </button>
        </form>
    );
};

export default Register;
