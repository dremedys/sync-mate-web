const { NEXT_PUBLIC_SOCKET_URL } = process.env;

// "undefined" means the URL will be computed from the `window.location` object
export const socket_URL = 'wss://ssyncmmate.com'; //NEXT_PUBLIC_SOCKET_URL;

// export const socket = io(`wss://ssyncmmate.com`, { path: '/ws/example/', autoConnect: false, auth: {} });
