// export/import => ESM 的模組管理方式
// 設定預設值
export const BASE_URL =
    process.env.REACT_APP_API_URL || 'http://localhost:3001';
export const API_URL = BASE_URL + '/api';
// http://localhost:3001/images/member/1655003608497.jpg
export const IMAGE_URL = BASE_URL + '/images';
