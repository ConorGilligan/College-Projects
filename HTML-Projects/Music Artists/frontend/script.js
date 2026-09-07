const API = "http://localhost:5000";

function showSection(section){
  document.getElementById("artists").style.display = "none";
  document.getElementById("albums").style.display = "none";
  document.getElementById("songs").style.display = "none";

  document.getElementById(section).style.display = "block";
}





//artists
async function loadArtists(){
  const res = await fetch(API + "/artists");
  const data = await res.json();

  const table = document.getElementById("artistsTable");
  table.innerHTML = "<tr><th>ID</th><th>Name</th><th>Genre</th><th>Listeners</th></tr>";

  data.forEach(a =>{
    table.innerHTML += `
      <tr>
        <td>${a.id}</td>
        <td>${a.name}</td>
        <td>${a.genre}</td>
        <td>${a.listeners}</td>
      </tr>
    `;
  });
}




async function createArtist(){
  const name = document.getElementById("artistName").value;
  const genre = document.getElementById("artistGenre").value;
  const listeners = document.getElementById("artistListeners").value;

  await fetch(API + "/artists",{
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, genre, listeners })
  });

  loadArtists();
}





async function updateArtist(){
  const id = document.getElementById("artistId").value;
  const name = document.getElementById("artistName").value;
  const genre = document.getElementById("artistGenre").value;
  const listeners = document.getElementById("artistListeners").value;
  await fetch(API + "/artists/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, genre, listeners })
  });
  loadArtists();
}



async function deleteArtist() {
  const id = document.getElementById("artistId").value;

  await fetch(API + "/artists/" + id,{
    method: "DELETE"
  });
  loadArtists();
}





// Alboms
async function loadAlbums(){
  const res = await fetch(API + "/albums");
  const data = await res.json();

  const table = document.getElementById("albumsTable");
  table.innerHTML = "<tr><th>ID</th><th>Name</th><th>Year</th><th>Listens</th><th>Artist ID</th></tr>";

  data.forEach(a =>{
    table.innerHTML += `
      <tr>
        <td>${a.id}</td>
        <td>${a.name}</td>
        <td>${a.year}</td>
        <td>${a.listens}</td>
        <td>${a.artist_id}</td>
      </tr>
    `;
  });
}





async function createAlbum(){
  const name = document.getElementById("albumName").value;
  const year = document.getElementById("albumYear").value;
  const listens = document.getElementById("albumListens").value;
  const artist_id = document.getElementById("albumArtistId").value;

  await fetch(API + "/albums", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, year, listens, artist_id })
  });

  loadAlbums();
}




async function updateAlbum(){
  const id = document.getElementById("albumId").value;
  const name = document.getElementById("albumName").value;
  const year = document.getElementById("albumYear").value;
  const listens = document.getElementById("albumListens").value;
  const artist_id = document.getElementById("albumArtistId").value;

  await fetch(API + "/albums/" + id,{
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, year, listens, artist_id })
  });
  loadAlbums();
}




async function deleteAlbum(){
  const id = document.getElementById("albumId").value;

  await fetch(API + "/albums/" + id,{
    method: "DELETE"
  });
  loadAlbums();
}





//Songs
async function loadSongs(){
  const res = await fetch(API + "/songs");
  const data = await res.json();

  const table = document.getElementById("songsTable");
  table.innerHTML = "<tr><th>ID</th><th>Name</th><th>Year</th><th>Album ID</th></tr>";
  data.forEach(s => {
    table.innerHTML += `
      <tr>
        <td>${s.id}</td>
        <td>${s.name}</td>
        <td>${s.year}</td>
        <td>${s.album_id}</td>
      </tr>
    `;
  });
}





async function createSong(){
  const name = document.getElementById("songName").value;
  const year = document.getElementById("songYear").value;
  const album_id = document.getElementById("songAlbumId").value;

  await fetch(API + "/songs",{
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, year, album_id })
  });

  loadSongs();
}





async function updateSong() {
  const id = document.getElementById("songId").value;
  const name = document.getElementById("songName").value;
  const year = document.getElementById("songYear").value;
  const album_id = document.getElementById("songAlbumId").value;

  await fetch(API + "/songs/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, year, album_id })
  });

  loadSongs();
}


async function deleteSong() {
  const id = document.getElementById("songId").value;
  await fetch(API + "/songs/" + id, {
    method: "DELETE"
  });
  loadSongs();
}

// Load everuthing
loadArtists();
loadAlbums();
loadSongs();