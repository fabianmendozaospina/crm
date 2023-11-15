import { createClient, SupabaseClient } from "../../deps.ts";

class Supabase {
  private _client: SupabaseClient;
  private static instance: Supabase;
  private url: string;
  private anonKey: string;

  private constructor() {
    this.url = Deno.env.get("SUPABASE_URL") || "";
    this.anonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
    this._client = {} as SupabaseClient;
  }

  getClient() {
    this._client = createClient(this.url, this.anonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  get client() {
    return this._client;
  }

  static getInstance(): Supabase {
    if (!Supabase.instance) {
      Supabase.instance = new Supabase();
      Supabase.instance.getClient();
    }

    return Supabase.instance;
  }
}

export default Supabase;
