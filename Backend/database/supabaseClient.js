// import { createClient } from '@supabase/supabase-js';
// import dotenv from 'dotenv';
// dotenv.config();

// const supabase = createClient(
//     process.env.SUPABASE_URL,
//     process.env.SUPABASE_SERVICE_ROLE_KEY // or SUPABASE_ANON_KEY for client-side
// );

// export default supabase;

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY     
);

module.exports = supabase;