// BACKEND FILES FOR itsjustanut-backend (Node.js + Express + MongoDB)

// === Folder Structure ===
// itsjustanut-backend/
// ├── server.js
// ├── models/
// │   └── Video.js
// ├── routes/
// │   └── api.js
// ├── .env.example
// └── package.json

// === File: server.js ===
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);

// ✅ Add this route to fix "Cannot GET /" and display a welcome message
app.get('/', (req, res) => {
  res.send('🎉 Welcome to the ItsJustANut API! Use /api/videos to get your nut.');
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// === File: models/Video.js ===
const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  title: String,
  url: String,
  thumb: String,
  category: String,
  duration: String
});

module.exports = mongoose.model('Video', VideoSchema);

// === File: routes/api.js ===
const express = require('express');
const router = express.Router();
const Video = require('../models/Video');

router.get('/videos', async (req, res) => {
  const videos = await Video.find();
  res.json(videos);
});

router.post('/videos', async (req, res) => {
  const { title, url, thumb, category, duration } = req.body;
  const video = new Video({ title, url, thumb, category, duration });
  await video.save();
  res.json(video);
});

module.exports = router;

// === File: .env.example ===
MONGO_URI=mongodb+srv://admin:<password>@cluster0.mongodb.net/itsjustanut?retryWrites=true&w=majority
JWT_SECRET=supersecretkey
FRONTEND_URL=https://itsjustanut-frontend.vercel.app

// === File: package.json ===
{
  "name": "itsjustanut-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "mongoose": "^7.5.0"
  }
}

// === FRONTEND HOMEPAGE FILE: pages/index.js ===
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/videos`)
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch((err) => console.error('Failed to fetch videos:', err));
  }, []);

  return (
    <div style={{ backgroundColor: '#0f0f0f', color: '#fff', fontFamily: 'Arial, sans-serif', minHeight: '100vh' }}>
      <header style={{ backgroundColor: '#000', padding: '1rem 2rem', borderBottom: '2px solid #ff9800', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '2rem', color: '#ff9800' }}>ItsJustANut</h1>
        <nav style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/">Home</Link>
          <Link href="/upload">Upload</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/about">About</Link>
        </nav>
      </header>

      <section style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Featured Videos</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {videos.map((video) => (
            <div key={video._id} style={{ background: '#1a1a1a', borderRadius: '10px', overflow: 'hidden' }}>
              <img src={video.thumb} alt={video.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
              <div style={{ padding: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.5rem 0' }}>{video.title}</h3>
                <p style={{ fontSize: '0.9rem', color: '#999' }}>{video.category || 'Uncategorized'} • {video.duration || '0:00'}</p>
                <a href={video.url} target="_blank" rel="noopener noreferrer" style={{ color: '#03a9f4', display: 'inline-block', marginTop: '0.5rem' }}>
                  Watch Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
