import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Supabase setup
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Root route
app.get('/', (req, res) => {
  res.send('✅ Backend is running');
});

// GET all bans
app.get('/api/bans', async (req, res) => {
  try {
    const { data, error } = await supabase.from('bans').select('*');

    if (error) {
      console.error('Error fetching bans from Supabase:', error.message);
      return res.status(500).json({ error: 'Failed to fetch bans' });
    }

    res.json(data);
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ error: 'Server error while fetching bans' });
  }
});

// POST a new ban
app.post('/api/bans', async (req, res) => {
  const { user, reason } = req.body;

  if (!user || !reason) {
    return res.status(400).json({ error: 'Missing user or reason' });
  }

  try {
    const { data, error } = await supabase.from('bans').insert([{ user, reason }]);

    if (error) {
      console.error('Error inserting ban into Supabase:', error.message);
      return res.status(500).json({ error: 'Failed to insert ban' });
    }

    res.status(201).json(data[0]);
  } catch (err) {
    console.error('Server error while inserting ban:', err.message);
    res.status(500).json({ error: 'Server error while inserting ban' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});

