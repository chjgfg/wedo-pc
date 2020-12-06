import axios from "axios";
import store from '../store'


// axios.defaults.baseURL = "http://192.168.1.22:10010/api";
axios.defaults.baseURL = "http://42.192.137.173:10010/api";
export default function request(url, data = {}, type = "GET") {
  return new Promise((resolve, reject) => {

    if (type === 'GET') {
      // 准备url query参数数据
      let dataStr = '';//数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      });
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'));
        url = url + '?' + dataStr
      }
    }

    console.log(store.state.form);

    axios({url: url,data: data,headers:{'WD_TOKEN': store.state.form},method: type}).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err)
    });

  })
}