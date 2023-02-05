import ytdl from 'ytdl-core';

export default async (req, res) => {

  const videoId = req.query.id;
  const quality = req.query.quality;
  const mimeType = req.query.mimeType;
  const container = req.query.container;

  console.log(req.query);

  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  res.setHeader('Content-Disposition', `attachment; filename="video.${container}"`);
  res.setHeader('Content-Type', mimeType);

  ytdl(videoUrl, { format: container, quality: quality })
    .pipe(res);
};