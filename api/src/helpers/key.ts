// key.ts
class SecretKey {
  private static instance: CryptoKey | null = null;

  private constructor() {}

  public static async getInstance(): Promise<CryptoKey> {
    if (!this.instance) {
      this.instance = await crypto.subtle.generateKey(
        {
          name: "HMAC",
          hash: "SHA-512",
        },
        true,
        [
          "sign",
          "verify",
        ],
      );
    }

    return this.instance;
  }
}

export default SecretKey;
