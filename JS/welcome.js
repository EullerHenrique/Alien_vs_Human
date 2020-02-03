function welcome() {
    //Reproduz o áudio de boas vindas

    var audio_welcome = new Audio();
    audio_welcome.src = '../MP3/welcome.mp3';
    audio_welcome.play();
}
