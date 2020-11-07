
import config from "./config"
export default (url,data={},method='GET' )=>{

  let cookie = wx.getStorageSync('cookie');

  return new Promise(
    (resolve,reject)=>{

      wx.request({
        url: config.host + url,
        data,
        method,
        success:(res)=>{
          resolve(res.data);
        },
        fail:(err)=>{

          reject(err);
        },
        header: {
          cookie: cookie
        }
      });

    }
  );
 

}