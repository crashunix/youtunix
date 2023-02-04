import Description from "@/components/Description";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ytdl from "ytdl-core";

export default function Watch({ videoInfo }) {

    console.log(videoInfo);

    const { videoDetails: { thumbnails, viewCount, author, title, description, channel_url, videoId } } = videoInfo;

    const downloadMedia = async () => {
        const response = await fetch(`/api/downloadMedia?id=${videoId}`);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'video.mp4');
        document.body.appendChild(link);
        link.click();
      };

    return (
        <>
            <div className="grid grid-cols-4 gap-4">
                <div className="flex flex-col col-span-3">
                    <div className="aspect-video relative">
                        {/* <Image fill src={`${thumbnails[thumbnails.length - 1].url}`} alt={title}></Image> */}
                        <iframe className="w-full h-full" src="https://www.youtube.com/embed/Wz-M-r5oChU" title="少年篇ダイジェスト | アニメ『NARUTO-ナルト-』20周年記念 | studioぴえろ【公式】" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullscreen></iframe>
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
                </div>
                <div className="flex flex-col">
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