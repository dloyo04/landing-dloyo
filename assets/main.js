const url = 'https://youtube-v31.p.rapidapi.com/search?channelId=UC9OU618E3WXF80OCxcKSuOw&part=snippet%2Cid&order=date&maxResults=50';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '73f7df9f47msh752114060e4ce57p13db2ejsn122430947201',
        'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
    }
};

async function fetchData(urlApi) {
    try {
        const response = await fetch(urlApi, options);
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const contentVideos = document.getElementById("contentVideos");
    if (contentVideos) {
        try {
            const videos = await fetchData(url);
            let view = `
            ${videos.items.map(video => `
            <a href="https://youtube.com/watch?v=${video.id.videoId}" target="_blank">
            <div class="group relative">
                <div
                    class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-100">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${video.snippet.title}
                    </h3>
                </div>
            </div>
            `).slice(0, 4).join('')}
            `;
            contentVideos.innerHTML = view;
        } catch (error) {
            console.error('There was an error fetching the videos:', error);
        }
    } else {
        console.error('Element with ID "contentVideos" not found');
    }
});
