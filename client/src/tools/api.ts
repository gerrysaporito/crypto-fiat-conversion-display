import axios, { AxiosRequestConfig } from 'axios';

/*
 * Build for the api client.
 * This api client is set up to work from either browser and server.
 */
const buildClient = (ctx?: { req: AxiosRequestConfig }) => {
  if (typeof window === 'undefined' && ctx?.req) {
    // From the server
    return axios.create({
      baseURL: '/', // For backend requests not to this server (i.e. http://ingress-nginx-controller.ingress-nginx.svc.cluster.local)
      headers: ctx.req.headers,
    });
  } else if (typeof window !== 'undefined' && !ctx?.req) {
    // From the client
    return axios.create({
      baseURL: '/',
    });
  } else {
    // Default from unknown
    return axios.create();
  }
};

export default buildClient;
