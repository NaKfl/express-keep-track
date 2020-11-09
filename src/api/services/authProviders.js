import axios from 'axios';

export default {
  facebook: async access_token => {
    try {
      const fields = 'id, name, email, picture';
      const url = 'https://graph.facebook.com/me';
      const params = { access_token, fields };
      const response = await axios.get(url, { params });
      console.log('response', response);
      const { id, name, email, picture } = response.data;
      return {
        service: 'facebook',
        picture: picture.data.url,
        id,
        name,
        email,
      };
    } catch (err) {
      console.log('err', err);
    }
  },

  google: async access_token => {
    try {
      const url = 'https://www.googleapis.com/oauth2/v3/userinfo';
      const params = { access_token };
      const response = await axios.get(url, { params });
      const { sub, name, email, picture } = response.data;
      return {
        service: 'google',
        picture,
        id: sub,
        name,
        email,
      };
    } catch (err) {
      console.log('err', err);
    }
  },
};
