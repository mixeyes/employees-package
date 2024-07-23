export default {
  defaults: {
    origin: `${process.env.HOST}:${process.env.PORT}`,
    prefix: '/oauth',
    transport: 'state',
  },
  google: {
    key: process.env.GOOGLE_CLIENT_ID,
    secret: process.env.GOOGLE_CLIENT_SECRET,
    custom_params: {
      access_type: 'offline',
    },
    scope: ['profile', 'email', 'openid'],
    response: ['tokens', 'profile', 'email'],
  },
};
