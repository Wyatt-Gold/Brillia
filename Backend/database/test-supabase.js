import supabase from './supabaseClient.js';

async function test() {
    const { data, error } = await supabase.from('Lessons').select('*');

    if (error) {
        console.error("❌ Supabase error:", error);
    } else {
        console.log("✅ Connected! Data:", data);
    }
}

test();