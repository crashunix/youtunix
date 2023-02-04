// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import ytdl from "ytdl-core";

export default async function handler(req, res) {
  const info = await ytdl.getInfo(`${req.query.videoId}`);
  res.status(200).json(info)
}
