var request = new XMLHttpRequest();
var videoIds = ['1630723954', '2667647842', '1402726504'];
var responses = [];

var mainContainer = document.getElementById("video-links");

for (var i = 0; i < videoIds.length; i++) {
    var btnLink = document.createElement('button');
    var breakTag = document.createElement('br');

    btnLink.className = "btn btn-primary video-link"
    btnLink.id = videoIds[i];
    btnLink.innerHTML = "Link " + (i + 1);

    btnLink.addEventListener('mousedown', function (event) {
        linkClicked(this, event);
    }, false);
    mainContainer.appendChild(btnLink);
}

function linkClicked(ref, event) {
    window.location.href = window.location.pathname + "?id=" + ref.id
}

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get('id');
    request.open('GET', 'https://www.cbc.ca/bistro/order?mediaId=' + videoId)
    if (videoId != null) {
        makeAjaxCall(videoId);
    }
}

function makeAjaxCall(id) {
    request.open('GET', 'https://www.cbc.ca/bistro/order?mediaId=' + id, true);
    request.onload = function () {
        var data = JSON.parse(this.response)
        responses.push(data['items'])
        insertData(data['items'][0])
    }
    request.send();
}

function insertData(data) {
    var videoContainer = document.getElementById('video-container');
    var metadata = document.getElementById('metadata');
    var controls = document.getElementById('controls');
    var breakTag = document.createElement('br');

    var btnPlay = document.createElement('button');
    var btnPause = document.createElement('button');
    var btnStop = document.createElement('button');

    btnPlay.className = "btn btn-success";
    btnPlay.innerHTML = "Play";
    btnPause.className = "btn btn-secondary";
    btnPause.innerHTML = "Pause";
    btnStop.className = "btn btn-danger";
    btnStop.innerHTML = "Stop";

    btnPlay.onclick = playVideo;
    btnPause.onclick = pauseVideo;
    btnStop.onclick = stopVideo;

    var title = document.createElement('h1');
    title.innerHTML = data.title;
    var description = document.createElement('p');
    description.innerHTML = data.description;

    var videoPlayer = document.getElementById('video-player');
    var video = document.createElement('video');
    video.id = "videoPlayer"
    video.style.width = "100%";
    video.style.height = "400px";
    var source = document.createElement('source');

    source.src = data['assetDescriptors'][1].key;
    video.append(source)
    videoPlayer.appendChild(video);

    controls.appendChild(btnPlay);
    controls.append(breakTag);
    controls.appendChild(btnPause);
    controls.append(breakTag);
    controls.appendChild(btnStop);

    metadata.appendChild(title);
    metadata.appendChild(description);
    console.log(data)
}

function playVideo() {
    var videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.play();
}

function pauseVideo() {
    var videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.pause();
}

function stopVideo() {
    var videoPlayer = document.getElementById('videoPlayer');
    pauseVideo();
    videoPlayer.currentTime = 0;
}