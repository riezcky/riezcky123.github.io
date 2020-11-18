// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(function() {
          console.log("Pendaftaran ServiceWorker berhasil");
        })
        .catch(function() {
          console.log("Pendaftaran ServiceWorker gagal");
        });
    });
  } else {
    console.log("ServiceWorker belum didukung browser ini.");
  }

  document.addEventListener("DOMContentLoaded", function() {

    let urlParams = new URLSearchParams(window.location.search);
    let isFromSaved = urlParams.get("saved");
    let btnSave = document.getElementById("save-btn");
    let btnRemove = document.getElementById("remove-btn");

    btnRemove.style.display = 'none';
    let clubSaved;
    let item;

    if (isFromSaved) {
      // Hide fab jika dimuat dari indexed db
      btnSave.style.display = 'none';
      btnRemove.style.display = 'block';
      
      // ambil artikel lalu tampilkan
      clubSaved = getSavedClubById();
    } else {
      item = getClubById();
      btnSave.disabled = true;
      item.then(function(club) {
          getById(club.id).then(function(data) {
            if(data !== undefined){ //data sudah pernah disimpan
              M.toast({html:'Club sudah tersimpan, silakan ke menu favorites', outDuration: 300000});
            }

          })

      });
    }

    btnSave.onclick = function () {
      console.log("Tombol add to fav di klik.");
      item.then(function(club) {
          getById(club.id).then(function(data) {

            if(data !== undefined){ //data sudah pernah disimpan
              // M.toast({html:'Club sudah tersimpan, silakan ke menu favorites'});
            }else{
              saveForLater(club);
            }

          })

      });
    };

    btnRemove.onclick = function () {
      console.log("Tombol remove from fav di klik.");
      clubSaved.then(function(club) {
        deleteById(club.id);
      });
    };

  });