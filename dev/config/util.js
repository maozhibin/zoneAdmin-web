import { proRequest } from 'caoh5-request';
import { param } from './config';

const proRes = async (data, dispatch) => {
  const json = await proRequest(Object.assign({}, data, {
    body: Object.assign({
      timestamp: new Date().getTime()
    }, param, data.body)
  }));

  if (dispatch && json.code !== '0') {
    dispatch({
      type: 'TOAST_SHOW',
      data: {
        message: '网络开小差了'
      }
    });
    setTimeout(() => {
      dispatch({ type: 'TOAST_HIDE' });
    }, 3000);
    throw new Error(json.message);
  }
  return json;
};

const formatDay = (time) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}${month < 10 ? `0${month}` : month}${day < 10 ? `0${day}` : day}`;
};

const getDateTime = (time)=>{
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month<10 ? `0${month}`: month}-${day<10 ? `0${day}`: day}`;
};

export { proRes, formatDay,getDateTime};