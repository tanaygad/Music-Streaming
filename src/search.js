const links = document.querySelectorAll('#link');
links.forEach(link => {
  link.addEventListener('mouseover', () => {
    link.style.color = 'red';
  });
  link.addEventListener('mouseout', () => {
    link.style.color = 'black';
  });
});



const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-btn');
const durationInput = document.getElementById('duration-input');
const explicitFilter = document.getElementById('explicit-filter');
const resetButton = document.getElementById('reset-filter-button');
let currentAudio = null;
 
resetButton.addEventListener('click',()=>{
    explicitFilter.value='';
    durationInput.value='(inf)';
    search();
});
searchButton.addEventListener('click', search);
searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      search();
    }
});
durationInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      search();
    }
});
explicitFilter.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      search();
    }
});
   
function search(){
    // Get the user's search query
   const query = searchInput.value;
   const maxDuration = durationInput.value;
   const explicitness = explicitFilter.value;
   // Build the iTunes API URL with the user's search query
 
    const url = `https://itunes.apple.com/search?term=${query}`;
    let added=0;
 
   // Fetch the search results from the iTunes API
   fetch(url)
      .then(response => response.json())
      .then(data => {
         const searchResults = document.getElementById('search-results');
         searchResults.innerHTML = '';
         //console.log(data);
         //console.log(data.resultCount);
         if (data.resultCount === 0) {
            const noResultsElement = document.createElement('div');
            searchResults.appendChild(noResultsElement);
            noResultsElement.innerHTML +=` <div class="no-result">NO RESULTS FOUND</div>` ;
         } else {
            for (let i = 0; i < data.results.length && i < 10; i++) {
                const result = data.results[i];
                const durationInSeconds = result.trackTimeMillis / 1000;
                console.log(maxDuration);
                if (maxDuration ) {
                    const maxDurationInSeconds = maxDuration * 60;
                    const durationInSeconds = result.trackTimeMillis / 1000;
                    if (durationInSeconds > maxDurationInSeconds) {
                       continue;
                    }
                 }
                //console.log(explicitness);
                if (explicitness !== ''){
                    if (explicitness=='explicit' && result.trackExplicitness=='notExplicit') continue;
                    else if (explicitness=='non-explicit' && result.trackExplicitness=='explicit')continue;
                }
             
             added++;
               // Check if the search result has a playable audio clip
            //    if (result.kind === 'song') {
                  const resultElement = document.createElement('div');
                  resultElement.classList.add('result');
                  if (added%2==1){
                  resultElement.innerHTML = `
                  
                  <div class="song-details-search-odd">
                    <div class="index-search"><p class="a">${added}</p></div>
                     <div class="album-poster">
                        <img src="${result.artworkUrl100}">
                     </div>
                        <div class="track-name-search"><h3>${result.trackName}</h3></div>
                        <div class="artist-name-search"<p>${result.artistName}</p></div>
                        <div class="audio-player">
                        <audio controls>
                           <source src="${result.previewUrl}" type="audio/mpeg">
                           Your browser does not support the audio tag.
                        </audio>
                        </div>
                   </div> 
                  `;
                  
                  searchResults.appendChild(resultElement);
 
                  const audioElement = resultElement.querySelector('audio');
                  audioElement.addEventListener('play', () => {
                    if (currentAudio && currentAudio !== audioElement) {
                        currentAudio.pause();
                    }
                    currentAudio = audioElement;
                  });
                  }
                  else{
                    resultElement.innerHTML = `
                  <div class="song-details-search-even">
                    <div class="index-search"><p class="a">${added}</p></div>
                     <div class="album-poster">
                        <img src="${result.artworkUrl100}">
                     </div>
                        <div class="track-name-search"><h3>${result.trackName}</h3></div>
                        <div class="artist-name-search"<p>${result.artistName}</p></div>
                        <div class="audio-player">
                        <audio controls>
                           <source src="${result.previewUrl}" type="audio/mpeg">
                           Your browser does not support the audio tag.
                        </audio>
                        </div>
                   </div> 
                  `;
                  
                  searchResults.appendChild(resultElement);
 
                  // Add event listener to the audio element to pause any currently playing audio
                  const audioElement = resultElement.querySelector('audio');
                  audioElement.addEventListener('play', () => {
                    if (currentAudio && currentAudio !== audioElement) {
                        currentAudio.pause();
                    }
                    currentAudio = audioElement;
                  });
                  }
                // }
            }
            if (added===0){
                const noResultsElement = document.createElement('div');
                searchResults.appendChild(noResultsElement);
                noResultsElement.innerHTML +=` <div class="no-result">NO RESULTS FOUND</div>` ;
            }
         }
      })
      .catch(error => console.log(error));
}