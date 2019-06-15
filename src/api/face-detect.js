import instance from 'common/js/axios';
import qs from 'qs';

export function faceDetect(image) {
  let url = 'https://api-cn.faceplusplus.com/facepp/v3/detect';

  let data = {
    api_key: 'OLNu-1M9P-OMv5ggugtKXYN4_uLyEvRl',
    api_secret: 'es7j2bRbBM4p7nPZsoEpiCrK0VIvQy7o',
    image_base64: image.src
  };

  return instance.post(url, qs.stringify(data)).then(res => {
    return Promise.resolve(res.data);
  });
}
