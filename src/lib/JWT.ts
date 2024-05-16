import { type JWTPayload, type KeyLike, SignJWT } from "jose";
import { jwtVerify } from 'jose';

// Function to verify the JWT token
export async function verify(token: string, secret: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
  // Run some checks on the returned payload, perhaps you expect some specific values

  // If it's all good, return it, or perhaps just return a boolean
  return payload;
}


export const signJwt = async (payload : JWTPayload, secretKey : KeyLike | Uint8Array) => {
    const jwt = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
     
      .sign(secretKey);
    return jwt;
  };