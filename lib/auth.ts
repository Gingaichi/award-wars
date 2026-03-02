import jwt from "jsonwebtoken";

const SECRET = process.env.SESSION_SECRET || process.env.NEXTAUTH_SECRET || "dev-secret";

export function signToken(payload: Record<string, any>) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET) as Record<string, any>;
  } catch (e) {
    return null;
  }
}
