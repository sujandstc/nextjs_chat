export const axios_base_url =
  process.env.NODE_ENV === "production"
    ? "https://candid-flan-5e0884.netlify.app/"
    : "http://192.168.101.7:3000/";
