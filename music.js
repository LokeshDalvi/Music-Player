var image = document.querySelector("img")
var audio = document.querySelector("audio")

var nextBtn = document.querySelector(".fa-forward")
var backBtn = document.querySelector(".fa-backward")
var playBtn = document.querySelector(".fa-play")
var pauseBtn = document.querySelector(".fa-pause")

var shuffleBtn = document.querySelector(".fa-shuffle")
var volumeBtn = document.querySelector(".fa-volume")

var volumeControl = document.querySelector("#volume-controls")
var songDuration = document.querySelector("#song-duration")

var storage = [
{audioSrc :"./media/Chaleya.mp3", imageSrc : "./media/chaleya-jawan-500-500.jpg"},
{audioSrc : "./media/Ek-Din-Aap.mp3", imageSrc :"./media/ek-din-aap-yes-boss-500-500.jpg"},
{audioSrc : "./media/Main-Koi-Aisa-Geet.mp3", imageSrc :"./media/ek-din-aap-yes-boss-500-500.jpg"},
{audioSrc : "./media/Dekha-Ek-Khwab.mp3", imageSrc :"./media/Silsile.jpg"},
{audioSrc :"./media/Sukh-Kalale.mp3" , imageSrc :"./media/Sukh-Kalale.jpg"}]

var index = 0
var realTime = 0
pauseBtn.style.display = "none"

function playSong(){
    image.src = storage[index].imageSrc
    audio.src = storage[index].audioSrc
    audio.play() //song started 
   
    audio.currentTime = realTime // song will start from 0 -> realtime
    playBtn.style.display = "none" //then hide play button 
    pauseBtn.style.display = "inline" //display pause button
}

// playSong()
function pausePlay() {
    if(audio.paused){ //When the song is paused display playbtn
        playSong()
    }
    else{ //when the song id playing display pausebtn
        audio.pause()
        realTime = audio.currentTime // now currentTime will be store in realtime
        playBtn.style.display = "inline"
        pauseBtn.style.display = "none"
    }
}

playBtn.addEventListener("click",pausePlay)
pauseBtn.addEventListener("click",pausePlay)


nextBtn.addEventListener("click",function() {
    index = (index + 1) % storage.length
    realTime = 0
    playSong()
}
)

backBtn.addEventListener("click",()=> {
    index = (index - 1 + storage.length) % storage.length 
    realTime = 0
    playSong()

})

volumeBtn.addEventListener("mouseover",()=> {
    volumeControl.style.display = "flex"
})


volumeBtn.addEventListener("click",()=> {
    volumeControl.style.display = "none"
})

volumeControl.addEventListener("input", ()=> {
    audio.volume = volumeControl.value
})

songDuration.addEventListener("input",()=> {
    clearInterval(audioInterval)
    audio.currentTime = (songDuration.value*audio.duration)/100
    realTime = audio.currentTime
})

audio.addEventListener("ended",()=> {
    index = (index+1)%storage.length
    realTime = 0
    playSong()
})