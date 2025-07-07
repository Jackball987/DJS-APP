import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Initialize Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Add this route near the bottom, after app.use() or existing routes
app.get('/api/bans', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('bans')
      .select('*');

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error('Error fetching bans:', err.message);
    res.status(500).json({ error: 'Failed to fetch bans' });
  }
});


app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
