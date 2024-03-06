import * as Axios from 'axios';
import fetchAdapter from '@haverstack/axios-fetch-adapter';

export const axios = Axios.default.create({
  adapter: fetchAdapter,
});
