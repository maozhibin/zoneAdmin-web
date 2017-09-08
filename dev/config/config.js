let hostname = {};
switch (window.location.hostname) {
case 'testh5-driver.caocaokeji.cn': hostname = {
  oss: 'https://testhttp1.caocaokeji.cn/caocao',
  cap: 'https://testcap1.caocaokeji.cn/cap',
  mkt: 'https://testmarketing-center1.caocaokeji.cn/caocao',
  risk: 'https://testappeal-center1.caocaokeji.cn'
}; break;
case 'testh52-driver.caocaokeji.cn': hostname = {
  oss: 'https://testpro.caocaokeji.cn/caocao',
  cap: 'https://testcap2.caocaokeji.cn/cap',
  mkt: 'https://testmarketing-center2.caocaokeji.cn/caocao',
  risk: 'https://testappeal-center2.caocaokeji.cn'
}; break;
case 'stableh5-driver.caocaokeji.cn': hostname = {
  oss: 'https://stablehttp.caocaokeji.cn/caocao',
  cap: 'https://stablecap.caocaokeji.cn/cap',
  mkt: 'https://stablemarketing.caocaokeji.cn/center-marketing',
  risk: 'https://stablerisk.caocaokeji.cn'
}; break;
case 'test33h5driver.caocaokeji.cn': hostname = {
  cap: 'https://test33cap.caocaokeji.cn'
}; break;
case 'h5-driver.caocaokeji.cn': hostname = {
  oss: 'https://grayhttp.caocaokeji.cn/caocao',
  cap: 'https://cap.caocaokeji.cn/cap',
  mkt: 'https://mkt.caocaokeji.cn/center-marketing',
  risk: 'https://appeal-center.caocaokeji.cn'
}; break;
default: hostname = {
  oss: 'http://www.51caocao.net/caocao',
  // cap: 'https://devcap.caocaokeji.cn',
  cap: 'https://devcap.caocaokeji.cn',
  mkt: '',
  risk: ''
};
}

const param = {
  appCode: 'no_sign',
  appVersion: '1.0.1',
  clientType: 3,
  sign: 'no_sign',
  version: '1.0',
  timestamp: new Date().getTime(),
  token: 'debug'
  // uid: '429211',
  // cityCode: '0571',
  // token: 'debug'
};

export {
  hostname,
  param
};