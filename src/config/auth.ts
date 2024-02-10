export default {
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  refresh_token: {
    secret: process.env.REFRESH_SECRET,
    expiresIn: process.env.REFRESH_EXPIRES_IN,
    refreshDuration: Number(process.env.REFRESH_DURATION),
  },
};
