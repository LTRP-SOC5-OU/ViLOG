import type jose from "jose";
import fs from "node:fs/promises";
import crypto from "node:crypto";
import { OPENID_PRIVATE_KEY, OPENID_PRIVATE_KEY_PATH } from "$server/utils/env";

function isOpenidPrivateKeyEnabled() {
  return Boolean(OPENID_PRIVATE_KEY || OPENID_PRIVATE_KEY_PATH);
}

async function readKey() {
  if (!isOpenidPrivateKeyEnabled()) return null;
  if (OPENID_PRIVATE_KEY) return OPENID_PRIVATE_KEY;

  return await fs.readFile(OPENID_PRIVATE_KEY_PATH);
}

/** Private Key 作成 */
export async function createPrivateKey(): Promise<jose.JWK | null> {
  const key = await readKey();
  if (!key) return null;

  return crypto.createPrivateKey(key).export({ format: "jwk" });
}

/** Public Key 作成 */
export async function createPublicKey(): Promise<jose.JWK | null> {
  const key = await readKey();
  if (!key) return null;

  return crypto.createPublicKey(key).export({ format: "jwk" });
}
