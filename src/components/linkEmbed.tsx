import {Tweet} from "react-tweet";

function extractYouTubeVideoId(rawUrl: string): string | null {
  try {
    const url = new URL(rawUrl);
    const host: string = url.host;
    const pathname: string = url.pathname;

    // Case 1: Standard watch URL with ?v=VIDEO_ID
    if (url.searchParams.has("v")) {
      return url.searchParams.get("v");
    }

    // Case 2: Shortened URL - youtu.be/VIDEO_ID
    if (host === "youtu.be") {
      return pathname.slice(1); // remove leading slash
    }

    // Case 3: Embed URL - /embed/VIDEO_ID
    if (pathname.startsWith("/embed/")) {
      return pathname.split("/")[2];
    }

    // Case 4: Shorts URL - /shorts/VIDEO_ID
    if (pathname.startsWith("/shorts/")) {
      return pathname.split("/")[2];
    }

    return null; // No matching format
  } catch (error) {
    // Invalid URL or parsing failure
    return null;
  }
}

function extractTweetId(rawUrl: string): string | null{
    try{
        const url = new URL(rawUrl);
        const pathname: string = url.pathname;
        const xRegex = /status\/(\d+)/i;
        const match = pathname.match(xRegex);
        return match?match[1] : null;
    }catch(error){
        return null;
    }
}

const handleHost = (link: string): string=>{
    // console.log(link);
    let host = '';
    try {
        host = (new URL(link)).host;
    } catch (error) {
        if(error instanceof Error) console.error(error.message);
        else console.error('Unexpected Exception Occured');
    }
    switch (host) {
        case 'youtu.be':
        case 'www.youtube.com':
            return extractYouTubeVideoId(link) || 'couldn\'d parse url...';
        case 'www.twitter.com':
        case 'x.com':
        case 'www.x.com':
            return extractTweetId(link)||'couldn\'d parse url...'
        default:
            return link
    }
}

export const LinkEmbed = ({link,type}:{link:string,type: string})=>{
    const resource_id = handleHost(link);
    switch (type) {
        case 'youtube':
            return(
                <div className="w-full static">
                    <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${resource_id}`} title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
            )
        case 'x':
            return(
                <div className="w-full h-full static">
                    <Tweet id={resource_id}  />
                </div>
            )
        default:
            return(
                <div className="w-full">
                    <a href={link}>{link}</a>
                </div>
            )
    }
}