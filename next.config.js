/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.gstatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*openai.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*claude.ai",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*",
        pathname: "/**",
      },
    ],
  },
};

export default config;
