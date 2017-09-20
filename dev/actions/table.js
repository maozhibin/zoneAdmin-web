import {browserHistory} from 'react-router';
import {proRes} from '../config/util';
import {hostname} from '../config/config';

export function getData(data) {
  return async (dispatch) => {
    try {
      // const json = await proRes({url: `${hostname.cap}/bps/h5Login/1.0`, type: 'jsonp', body: data});

      // if (json.code == 0) {
      //   const user = Object.assign({
      //     phone: data.phone,
      //     expiration: (new Date().getTime() + 30 * 24 * 3600 * 1000)
      //   }, json.data);
      //   dispatch({type: 'USER_UPDATE', data: user});
      // } else {
        
      // }
      const list = [];
      const total = 99;
      for (let i = 0; i < data.pageSize; i++) {
        list.push({
          key: (data.pageNo-1)*data.pageSize+i,
          name: `Edward King ${(data.pageNo-1)*data.pageSize+i}`,
          age: 32,
          address: `London, Park Lane no. ${(data.pageNo-1)*data.pageSize+i}`,
        });
      }
      dispatch({type: 'TABLE_UPDATE', data: {
        list: list,
        total: total,
      }});
    } catch (e) {
      console.log(e);
    }
  };
}