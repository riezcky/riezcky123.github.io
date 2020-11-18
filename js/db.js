let dbPromised = idb.open("football-premier-league", 1, function(upgradeDb) {
    let clubsObjectStore = upgradeDb.createObjectStore("clubs", {
      keyPath: "id"
    });
    clubsObjectStore.createIndex("name", "name", { unique: false });
});

const saveForLater = club => {
  dbPromised
    .then(function(db) {
      let tx = db.transaction("clubs", "readwrite");
      let store = tx.objectStore("clubs");
      store.put(club);
      return tx.complete;
    })
    .then(function() {
      M.toast({html:'Club berhasil disimpan'});
    });
}

const getById = id => {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction("clubs", "readonly");
        let store = tx.objectStore("clubs");
        return store.get(id);
      })
      .then(function(club) {
        resolve(club);
      });
  });
}

const getAll = () => {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction("clubs", "readonly");
        let store = tx.objectStore("clubs");
        return store.getAll();
      })
      .then(function(clubs) {
        resolve(clubs);
      });
  });
}

const deleteById = id => {
  dbPromised
    .then(function(db) {
      let tx = db.transaction("clubs", "readwrite");
      let store = tx.objectStore("clubs");
      store.delete(id);
      return tx.complete;
    })
    .then(function() {
      M.toast({html:'Club berhasil dihapus'});
    });
}