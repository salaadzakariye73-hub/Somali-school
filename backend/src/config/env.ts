import crypto from 'node:crypto';
import dotenv from 'dotenv';

dotenv.config();

// Ephemeral fallback ensures no hardcoded JWT secret exists in source code.
const ephemeralJwtSecret = crypto.randomBytes(32).toString('hex');

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 3000),
  mongodbUri: (process.env.MONGODB_URI || '').trim(),
  jwtSecret: (process.env.JWT_SECRET || '').trim() || ephemeralJwtSecret,
  appUrl: (process.env.APP_URL || '').trim(),
  corsOrigins: (process.env.CORS_ORIGIN || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean),
  initialSuperAdmin: {
    email: (process.env.INITIAL_SUPER_ADMIN_EMAIL || '').trim().toLowerCase(),
    username: (process.env.INITIAL_SUPER_ADMIN_USERNAME || 'superadmin').trim().toLowerCase(),
    password: (process.env.INITIAL_SUPER_ADMIN_PASSWORD || '').trim(),
    fullName: (process.env.INITIAL_SUPER_ADMIN_NAME || 'System Super Administrator').trim(),
  },
};
