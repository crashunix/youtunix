import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ytdl from "ytdl-core";

export default function Watch() {

    const { query } = useRouter();

    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getTitle(url) {
        const info = await ytdl.getInfo(url);
        return info.title;
    }

    useEffect(() => {
        if (query.v) {
            console.log(query.v);
            async function fetchData() {
                const info = await ytdl.getInfo(`${query.v}`);
                setInfo(info);
                console.log(info);
                setLoading(false);
            }
            fetchData();
        }
    }, [query]);

    return (
        <>videoId:</>
    );
}