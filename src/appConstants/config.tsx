export const axios_base_url =
  process.env.NODE_ENV === "production"
    ? "https://visionary-croquembouche-894e5a.netlify.app/"
    : "http://192.168.101.7:3000/";
