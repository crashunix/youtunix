import Description from "@/components/Description";
import { textToSlug } from "@/helpers/helpers";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ytdl from "ytdl-core";

export default function Watch({ videoInfo }) {

    // console.log(videoInfo);
    const [selectedQuality, setSelectedQuality] = useState(null);

    let sQuality;

    const { videoDetails: { thumbnails, viewCount, author, title, description, channel_url, videoId, embed }, formats, related_videos } = videoInfo;

    const downloadMedia = async () => {
        const response = await fetch(`/api/downloadMedia?id=${videoId}&quality=${sQuality.itag}&container=${sQuality.container}&mimeType=${sQuality.mimeType}`);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${textToSlug(title)}${sQuality.qualityLabel ? '-' + sQuality.qualityLabel : ''}${sQuality.audioQuality ? '-' + sQuality.audioQuality : ''}${sQuality.hasVideo && !sQuality.hasAudio ? '-only-video' : !sQuality.hasVideo && sQuality.hasAudio ? '-only-audio' : ''}.${sQuality.container}`);
        document.body.appendChild(link);
        link.click();
    };

    const handleQualityChange = (format) => {
        // setSelectedQuality(format);
        sQuality = format;
    };

    return (
        <>
            <Head>
                <title>Youtunix 🟢 {title}</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="grid grid-cols-4 gap-4">
                <div className="flex flex-col col-span-3">
                    <div className="aspect-video relative">
                        {/* <Image fill src={`${thumbnails[thumbnails.length - 1].url}`} alt={title}></Image> */}
                        <iframe className="w-full h-full" src={embed.iframeUrl} title={title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    </div>
                    <h1 className="text-xl font-bold truncate text-ellipsis mt-2" title={title}>{title}</h1>
                    <span className="text-gray-500 text-xs">{viewCount} views</span>
                    <div className="flex items-center space-x-3 mt-4">
                        <div className="w-12 aspect-square relative">
                            <Image fill src={author.thumbnails[author.thumbnails.length - 1].url} alt={author.name}></Image>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-lg leading-none">{author.name}</span>
                            <span className="text-xs text-gray-500">{author.subscriber_count} subscribers</span>
                        </div>
                    </div>
                    <Description text={description} />
                    <div className="grid grid-cols-3 gap-4 mt-24">
                        {related_videos.map(video => (
                            <div className="flex flex-col space-y-1">
                                <div className="w-full aspect-video relative">
                                    <Image src={video.thumbnails[video.thumbnails.length - 1].url} fill></Image>
                                </div>
                                <span className="mt-2 font-bold">{video.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col">
                    <form className="flex flex-col">
                        {formats.map(format => (
                            <label key={format.itag} className="bg-gray-600 grid grid-cols-3">
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        name="quality"
                                        value={format.itag}
                                        checked={selectedQuality === format.itag}
                                        onChange={() => handleQualityChange(format)}
                                    />
                                    <span>{format.qualityLabel}</span>
                                </div>
                                <span>{format.container}</span>
                                <div>{format.audioQuality == 'AUDIO_QUALITY_LOW' ? '🟥' : format.audioQuality == 'AUDIO_QUALITY_MEDIUM' ? '🟨' : format.audioQuality}{format.hasAudio && '🎵'}{format.hasVideo && '📺'}</div>
                            </label>
                        ))}
                        {/* <span>Video:</span>
                        {formats.filter(x => x.hasVideo).map(format => (
                            <label key={format.itag} className="bg-gray-600">
                                <input
                                    type="radio"
                                    name="quality"
                                    value={format.itag}
                                    checked={selectedQuality === format.itag}
                                    onChange={() => handleQualityChange(format)}
                                    />
                                {format.qualityLabel} {format.container}
                            </label>
                        ))}
                        <span>Audio:</span>
                        {formats.filter(x => !x.hasVideo && x.hasAudio).map(format => (
                            <label key={format.itag} className="bg-gray-600">
                                <input
                                    type="radio"
                                    name="quality"
                                    value={format.itag}
                                    checked={selectedQuality === format.itag}
                                    onChange={() => handleQualityChange(format)}
                                />
                                {format.audioQuality} {format.container}
                            </label>
                        ))} */}
                        <p>Selected value: {selectedQuality}</p>
                    </form>
                    <button className="w-full p-2 bg-green-600" onClick={() => downloadMedia()}>Download</button>
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    let videoInfo;
    await fetch(`${process.env.APP_URL}/api/getInfo?videoId=${context.query.v}`)
        .then(response => response.json())
        .then(data => {
            videoInfo = data;
        });
    return {
        props: { videoInfo: videoInfo }, // will be passed to the page component as props
    }
}