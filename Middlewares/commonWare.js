import geoip from "geoip-lite"; // Geo-Ip Mapping lookup
import rateLimit from "express-rate-limit"; // to limit requests
import { GlobalError } from "./errorMiddleware.js";

export const logRequestDetails = (req, res, next) => {
  const ip = req.clientIp;
  const userAgent = req.useragent;

  // Get location based on IP address
  const geo = geoip.lookup("157.32.210.253");
  const location = geo
    ? `${geo.city}, ${geo.region}, ${geo.country}`
    : "Unknown";

  // Log request information
  req.IP_ADDRESS = `IP Address: ${ip}`;
  req.DEVICE_LOCATION = `Location: ${location}`;
  req.DEVICE = `${userAgent.platform}, ${userAgent.os}, ${userAgent.browser}`;

  next();
};

// Rate limiting middleware
export const requestRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5, // limit each IP to 7 requests per windowMs,
  handler: (req, res, next) => {
    const error = new GlobalError("Limit Exceeded! Try Again After 15 Mins",403);
    next(error);
  },
});
