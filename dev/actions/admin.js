import {browserHistory} from 'react-router';
import {proRes} from '../config/util';
import {hostname} from '../config/config';

export function login(data) {
  return async (dispatch) => {
    try {
      // const json = await proRes({url: `${hostname.cap}/bps/h5Login/1.0`, type: 'jsonp', body: data});
      var json = await proRes(
        {
          url: `admin/login`,
          type: 'post',
          body: data
        });
      if (json.code == 200) {
        const user = Object.assign({
          name: data.name,
          expiration: (new Date().getTime() + 30 * 24 * 3600 * 1000)
        }, json.data);
        dispatch({type: 'USER_UPDATE', data: user});
        dispatch({type: 'USER_UPDATE', data: user});
        window.localStorage.setItem('token',data.name);      
        browserHistory.push('public');
      } else {
        alert("账号或者密码错误")
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export function logout(data) {
  return async (dispatch) => {
    try {
      const json = await proRes({url: `${hostname.cap}/bps/logout/1.0`, type: 'jsonp', body: data});

      if (json.code == 0) {
        dispatch({
          type: 'HOME_UPDATE',
          data: {
            status: 0
          }
        });
      }

      browserHistory.push('home');
    } catch (e) {
      console.log(e);
    }
  };
}

//获取优惠券
export function getCoupon(data) {
  return async (dispatch) => {
    try {
      const json = await proRes({url: `${hostname.cap}/bps/coupons/1.0`, type: 'jsonp', body: data});

      if (json.code === '0') {
        dispatch({
          type: 'COUPON_UPDATE',
          data: {
            couponList: json.data
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
}