import { createBrowserClient } from "@supabase/ssr";

const DEFAULT_SUPABASE_URL = "https://ixxfzgrpaxpgbmqbzgtj.supabase.co";
const DEFAULT_SUPABASE_KEY = "sb_publishable_-wUA7Hgc-N0sRT3cLaJMHQ_b8HP59bg";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || DEFAULT_SUPABASE_KEY;

export const createClient = () =>
  createBrowserClient(
    supabaseUrl,
    supabaseKey
  );
