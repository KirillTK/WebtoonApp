import api from 'axios';
import btoa from 'btoa';

const options = {
  headers: {
    'Content-Type': 'image/jpeg',
    Referer: 'http://www.webtoons.com/',
  },
  responseType: 'arraybuffer',
  mode: 'no-cors',
};
class PreviewService {
  async getPreview(url) {
    const response = await api.get(url, options);
    const image = btoa(
      new Uint8Array(response.data)
        .reduce((data, byte) => data + String.fromCharCode(byte), ''),
    );

    return `data:${response.headers['content-type'].toLowerCase()};base64,${image}`;
  }

  async getImagePreviews(urlImageList = [], urlProperty = '') {
    return Promise
      .all(urlImageList.map(async (previewObj) => {
        const url = urlProperty ? previewObj[urlProperty] : previewObj;

        return urlProperty
          ? { ...previewObj, [urlProperty]: await this.getPreview(url) } : this.getPreview(url);
      }));
  }
}

export const previewService = new PreviewService();
