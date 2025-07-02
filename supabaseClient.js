import {createClient} from '@supabase/supabase-js' 
const projectUrl=import.meta.env.VITE_SUPABASE_PROJECT_URL;
const anonKey=import.meta.env.VITE_SUPABASE_ANON_KEY;
  const supabase = createClient(projectUrl,anonKey);
  export default supabase;
