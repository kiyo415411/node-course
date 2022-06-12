import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL, IMAGE_URL } from '../utils/config';

const About = () => {
    const [member, setMember] = useState(null);
    useEffect(() => {
        let getMemberInfo = async () => {
            let response = await axios.get(`${API_URL}/member/info`, {
                // 允許跨源讀寫 cookie
                // 這樣才可以把之前有紀錄登入資料的 session id 送回去後端
                withCredentials: true,
            });
            console.log(response.data);
            setMember(response.data);
        };
        getMemberInfo();
    }, []);

    return (
        <div className='m-7'>
            <h2 className='m-7 text-2xl text-gray-600'>這裡是魚股市</h2>
            {member ? (
                <>
                    <h3>Hi,{member.name}</h3>
                    <img src={`${IMAGE_URL}${member.photo}`} alt='' />
                </>
            ) : (
                <h3>尚未登入</h3>
            )}
        </div>
    );
};

export default About;
