const url = "https://api.football-data.org/v2/competitions/2021/standings/";

const fetchApi = url => {
  return fetch(url, {
  headers: {
    'X-Auth-Token': "4d31dd5053af43ffb26916979af7800e"
  }
  });
}

const getLigaInggris = () => { 
  if ('caches' in window) {
    caches.match(url).then(function(response) {
      if (response) {
        response.json().then(function (data) {
          console.log("liga inggris :", data);
          let clubHTML = ""; 
          clubHTML = viewLigaInggris(data);    
          document.getElementById("information_club").innerHTML = clubHTML;       
         })
      } 
    })
  }

  fetchApi(url)
  .then(status)
  .then(json)
  .then(data => {
      //Menyusun komponen card artikel secara dinamis
       let clubHTML = "";
       clubHTML = viewLigaInggris(data);  
       document.getElementById("information_club").innerHTML = clubHTML;
  })
}

const getKlasemen = () => { 
  if ('caches' in window) {
    caches.match(url).then(function(response) {
      if (response) {
        response.json().then(function (data) {
          let classementHtml = "";
          classementHtml = viewKlasemen(data);
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("information_club").innerHTML = classementHtml;        })
      } 
    })
  }

  fetchApi(url)
  .then(status)
  .then(json)
  .then(data => {
      console.log("liga inggris :", data.standings[0].table);
      let classementHtml = "";
      classementHtml = viewKlasemen(data);
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("information_club").innerHTML = classementHtml;
  })
}

// Blok kode yang akan di panggil jika fetch berhasil
const status = response => {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
const json = response => {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
const error = error => {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}


const url_tim = "https://api.football-data.org/v2/teams/";
const fetchApi_2 = url_tim => {
  return fetch(url_tim, {
  headers: {
    'X-Auth-Token': "4d31dd5053af43ffb26916979af7800e"
  }
  });
}

const getClubById = () => {
  return new Promise(function(resolve, reject) {
  // Ambil nilai query parameter (?id=)
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(url_tim + idParam).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            console.log("data klub : ", data);
            let infoCLubHTML = "";
            infoCLubHTML= viewDetailClub(data);            
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = infoCLubHTML;
            resolve(data);
          });
        }
      });
    }

    fetchApi_2(url_tim+ idParam)
      .then(status)
      .then(json) 
      .then(function(data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        let jml_player = data.squad.length - 1;
        console.log("jml : ", jml_player);
        console.log("data club : ", data);
        // Menyusun komponen card artikel secara dinamis
        let infoCLubHTML = "";
        infoCLubHTML = viewDetailClub(data);
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = infoCLubHTML;
        resolve(data);
      })
      .catch(error => console.log(error),
      console.log("error cuk : ", error),
      document.getElementById("body-content").innerHTML = `Anda dalam keadaan Offline, ada error : ${error}`);
  });
}

const getSavedClubs = () => {
  getAll().then(function(clubs) {
    console.log("data saved: ", clubs.length);
    // Menyusun komponen card artikel secara dinamis
    let clubsHTML = "";

    if (clubs.length == 0){
        clubsHTML = "<p>Club favorite is empty</p>";
    }
    clubs.forEach(function(club) {
      clubsHTML += `
            <div class="card">
                <a href="./detail_club.html?id=${club.id}&saved=true">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${club.crestUrl}" alt="image of club"/>
                  </div>
                </a>
              <div class="card-content">
                <span class="card-title truncate">${club.name}</span>
              </div>
            </div>
          `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content\
    document.getElementById("information_club").innerHTML = clubsHTML;
  });
}

const getSavedClubById = () => {
  return new Promise(function(resolve, reject) {
      let urlParams = new URLSearchParams(window.location.search);
      const idParam = urlParams.get("id");
      
      getById(+idParam).then(function(data) {

        console.log("holla : ", data);
        let jml_player = data.squad.length - 1;
        let infoCLubHTML = `
        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img src="${data.crestUrl}" alt="image of club"/>
          </div>
          <div class="card-content">
            <span class="card-title">${data.name}</span>
            <p>Founded : ${data.founded}</p>
            <p>Venue : ${data.venue}</p>
            <p>Website : ${data.website}</p>
            <center><h6> --- COACH --- </h6></center>
            <table>
              <tr>
                <td>Name </td>
                <td> : </td>
                <td>${data.squad[jml_player].name}</td>
              </tr>
              <tr>
                <td>Country Of Birth </td>
                <td> : </td>
                <td>${data.squad[jml_player].countryOfBirth}</td>
              </tr>
              <tr>
                <td>Nationality </td>
                <td> : </td>
                <td>${data.squad[jml_player].nationality}</td>
              </tr>
              <tr>
                <td>Date Of Birth </td>
                <td> : </td>
                <td>${data.squad[jml_player].dateOfBirth.substr(0, 10)}</td>
              </tr>
            </table>
          </div>
        </div>
      `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = infoCLubHTML;
        resolve(data);
      });
  });
}

const viewLigaInggris = data  => {
  let clubHTML = "";
  data.standings[0].table.forEach(function(club) {
    clubHTML += `
          <div class="card">
            <a href="./detail_club.html?id=${club.team.id}">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${club.team.crestUrl}" alt="image of club" />
              </div>
            </a>
            <div class="card-content">
              <span class="card-title truncate">${club.team.name}</span>
            </div>
          </div>
        `;
  });
  return clubHTML;
}

const viewKlasemen = data => {
  let classementHtml = "";
  let dt_tim = data.standings[0].table;
  dt_tim.forEach(function(tim) {
    classementHtml += `
            <table class="responsive-table">
            <thead>
              <tr>
                  <th>Position </th>
                  <th>Name</th>
                  <th>played Games</th>
                  <th>form</th>
                  <th>lost</th>
                  <th>points</th>
              </tr>
            </thead>
    
            <tbody>
              <tr>
                <td>${tim.position}</td>
                <td>${tim.team.name}</td>
                <td>${tim.playedGames}</td>
                <td>${tim.form}</td>
                <td>${tim.lost}</td>
                <td>${tim.points}</td>
              </tr>
            </tbody>
            </table>
        `;
  });
  return classementHtml;
}

const viewDetailClub = data => {
  let jml_player = data.squad.length - 1;
  let infoCLubHTML = ""; 
  infoCLubHTML = `
  <div class="card">
    <div id="note_saved"></div>
    <div class="card-image waves-effect waves-block waves-light">
      <img src="${data.crestUrl}" alt="image of club" />
    </div>
    <div class="card-content">
      <span class="card-title">${data.name}</span>
      <p>Founded : ${data.founded}</p>
      <p>Venue : ${data.venue}</p>
      <p>Website : ${data.website}</p>
      <center><h6> --- COACH --- </h6></center>
      <table>
        <tr>
          <td>Name </td>
          <td> : </td>
          <td>${data.squad[jml_player].name}</td>
        </tr>
        <tr>
          <td>Country Of Birth </td>
          <td> : </td>
          <td>${data.squad[jml_player].countryOfBirth}</td>
        </tr>
        <tr>
          <td>Nationality </td>
          <td> : </td>
          <td>${data.squad[jml_player].nationality}</td>
        </tr>
        <tr>
          <td>Date Of Birth </td>
          <td> : </td>
          <td>${data.squad[jml_player].dateOfBirth.substr(0, 10)}</td>
        </tr>
      </table>
    </div>
  </div>
`;
 return infoCLubHTML;
}