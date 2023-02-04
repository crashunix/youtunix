import ytdl from 'ytdl-core';

export default async (req, res) => {
  const videoId = req.query.id;
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  res.setHeader('Content-Disposition', `attachment; filename="video.mp4"`);
  res.setHeader('Content-Type', 'video/mp4');

  ytdl(videoUrl, { format: 'mp4' })
    .pipe(res);
};