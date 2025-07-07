import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Register route
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return res.status(400).json({ error: error.message });
  res.json({ user: data.user });
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return res.status(401).json({ error: error.message });
  res.json({ user: data.user, session: data.session });
});

// Get bans
app.get('/bans', async (req, res) => {
  const { data, error } = await supabase.from('bans').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Post ban
app.post('/bans', async (req, res) => {
  const { user_id, reason } = req.body;
  const { data, error } = await supabase.from('bans').insert([{ user_id, reason }]);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.listen(port, () => {
  console.log(`✅ Backend running on port ${port}`);
});
