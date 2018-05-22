const DB_NAME = 'indexedDB-goalskeeperapp';
const DB_VERSION = 1;
let db = null;

/**
  Create a new DB if none exists.
*/
function setupDB() {
  return new Promise((resolve, reject) => {
    const openRequest = window.indexedDB.open(DB_NAME, DB_VERSION);

    // Listen for error
    openRequest.onerror = evt => console.log(
      '%c error while opening the DB',
      'color: red;',
      evt.target.errorCode
    ) || reject(evt);

    // Retrieve data from the DB.
    // Always called after `onupgradeneeded`.
    openRequest.onsuccess = function(evt) {
      console.log('%c DB opened correctly', 'color: green;');
      // `this` is the `request` object (<=> `evt.target.value`)
      if (!db) db = this.result;
      resolve(db);
    }

    // Organize the DB when created.
    openRequest.onupgradeneeded = evt => {
      console.log('%c setting up the DB', 'color: blue;');
      db = evt.target.result;

      // store for goals, organized by `id`.
      // indexed by name and creation date.
      const goalsStore = db.createObjectStore('goals', { keyPath: 'id' });
      goalsStore.createIndex('goalName', 'name', { unique: false });
      goalsStore.createIndex('creationDate', 'dateCreated', { unique: false });

      // store for steps, organized by `id`.
      // indexed by name and goal id.
      const stepsStore = db.createObjectStore('steps', { keyPath: 'id' });
      stepsStore.createIndex('stepName', 'name', { unique: false });
      stepsStore.createIndex('goalId', 'goalId', { unique: false });
    };
  });
}

/**
  Fetch initial data from the DB.
*/
function retrieveGoals() {
  console.log('%c retrieving initial data', 'color: blue;');
  return new Promise(resolve => {
    const goals = [];
    // Start a `transaction` to retrieve initial data.
    const tr = db
      .transaction(['goals'])
      .objectStore('goals')
      .openCursor()
      .onsuccess = evt => {
        const cursor = evt.target.result;
        if (cursor) {
          goals.push(cursor.value);
          cursor.continue();
        } else {
          resolve(goals);
        }
      };
  });
}

/**
  Add a new object inside an object store.
  @param { string } storeName : the name of the object store to add to
  @param { object } data : the new object to add
*/
function addData(storeName, data) {
  console.log('%c adding new item to DB', 'color: blue;');
  const addReq = db
    .transaction([storeName], 'readwrite')
    .objectStore(storeName)
    .add(data);

  // Listen for error
  addReq.onerror = evt => console.log(
    '%c error while adding a new item',
    'color: red;',
    evt.target.errorCode
  );

  // Success
  addReq.onsuccess = evt => console.log(
    '%c item added correctly',
    'color: green;'
  );
}

function getDB() {
  return db;
}

export { getDB, addData, retrieveGoals };
export default setupDB;
