import * as UI from './ui.js';
import { API } from './api.js';

UI.searchForm.addEventListener('submit', e => {
    e.preventDefault();

    //Read the user input
    const artistName = UI.artistInput.value,
        songName = UI.songInput.value;

    //Validate the form
    if(!artistName || !songName) {
        UI.messageDiv.innerHTML = "All fields are mandatory";
        UI.messageDiv.classList.add('error');

        setTimeout(() => {
            UI.messageDiv.innerHTML = "";
            UI.messageDiv.classList.remove('error');
        }, 2000);
    } else {
        //Query the REST Api
        const lyric = new API(artistName, songName);
        lyric.queryAPI()
            .then(data => {
                const lyrics = data.lyrics;
                if(lyrics) {
                    UI.resultDiv.innerHTML = lyrics;
                    UI.searchForm.reset();
                } else {
                    UI.messageDiv.innerHTML = 'No Lyrics Found';
                    UI.messageDiv.classList.add('error');
                    setTimeout(() => {
                        UI.messageDiv.innerHTML = '';
                        UI.messageDiv.classList.remove('error'); 
                        UI.searchForm.reset();
                    }, 3000);
                }
            });
    }
})