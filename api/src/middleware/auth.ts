import { Context, verify } from "../../deps.ts";
import SecretKey from "../helpers/key.ts";

export async function checkAuthorization(
  ctx: Context,
  next: () => Promise<unknown>,
) {
  // Authorization by header.
  const authHeader = ctx.request.headers.get("Authorization");

  if (!authHeader) {
    ctx.throw(401, "Not authenticated, there is not a JWT");
  }

  // Get the token and verify it.
  const token = authHeader.split(" ")[1];
  let isValidToken;

  try {
    const key = await SecretKey.getInstance();
    isValidToken = await verify(token, key);
  } catch (error) {
    ctx.throw(500, error);
  }

  if (!isValidToken) {
    ctx.throw(401, "Not authenticated");
  }

  await next();
}
