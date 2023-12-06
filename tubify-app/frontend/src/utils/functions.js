// Random num generator between 0 and N (inclusive)
export const randomBetweenZeroAndN = (n) => {
    return Math.floor(Math.random() * (n + 1));
}

export const convertToEmbedUrl = (youtubeUrl) => {
    const videoId = youtubeUrl.split('watch?v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
}

export const identifyLinkType = (link) => {
    if (link.includes("youtube")) {
        return 'YouTube';
    } else {
        return 'Spotify';
    }
};