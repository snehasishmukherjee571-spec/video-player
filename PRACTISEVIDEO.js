const video=document.getElementById('myVideo');
const fileInput=document.getElementById('fileInput');
const progressBar=document.getElementById('progressBar');
const volumeControl=document.getElementById('volume');
const playlistElement = document.getElementById('playlist');

let playlist=[];
let currentVideoIndex=-1;
let lastvolume=1;
try{
fileInput.addEventListener('change',(e)=>{
    const files=Array.from(e.target.files);
    files.forEach(file=>{
        playlist.push({
            name:file.name,
            url:URL.createObjectURL(file)
        });

    })
    updatePlaylistDisplay();
    if(currentVideoIndex===-1)changeVideo(1);
})}
catch(error){
    console.trace(`error is::${error}`)
}
try{
function updatePlaylistDisplay(){
playlistElement.innerHTML=playlist.map((item,index)=>
    `<div class="playlist-item ${index===currentVideoIndex ?'active-video' 
        :''}"
    onclick="loadvideo(${index})">
    ${item.name}
    </div>`
).join('');
}}
catch(error){
    console.trace(error)
};
function loadvideo(index){
currentVideoIndex=index;
video.src=playlist[index].url;
video.play();
updatePlaylistDisplay();
};
video.addEventListener('timeupdate',updateprogess);
function updateprogess(){
const progress=(video.currentTime/video.duration) * 100;
progressBar.style.width=`${progress}%`;
};
progressBar.parentElement.addEventListener('click',(e)=>{
    const rect=this.getBoundingClientRect();
    const pos=(e.clientX - rect.left)/rect.width;
    video.currentTime=pos * video.duration;
});
volumeControl.addEventListener('input',(e)=>{
    video.volume=e.target.value;
    if(video.volume>0)lastvolume=video.volume;

})
function toggleMute(){
    video.volume>0 ? 0 : lastvolume;
    volumeControl.value=video.volume;

}
function changespeed(speed){
    video.playbackRate=speed;
}
function changeVideo(index){
    const stepindex=currentVideoIndex + index;
    if(stepindex>=0 && stepindex <playlist.length ){
        loadvideo(stepindex);
    }
}
video.addEventListener('ended',changeVideo(1));
function playpause(){
    video[video.paused ?'play' : 'pause']();

}
function playPause(){
    video.pause();
    video.currentTIme=0;

}

function stop() {
    video.pause();
    video.currentTime = 0;
}

function skip(seconds){
    video.currentTIme+=seconds;
};