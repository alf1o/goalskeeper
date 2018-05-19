const DB_NAME = 'indexedDB-goalskeeperapp';
const DB_VERSION = 1;
let db = null;

/**
  Create a new DB if none exists.
*/
function setupDB() {
  const openRequest = window.indexedDB.open(DB_NAME, DB_VERSION);

  // Listen for error
  openRequest.onerror = evt => console.log(
    '%c error while opening the DB',
    'color: red;',
    evt.target.errorCode
  );

  // Retrieve data from the DB.
  openRequest.onsuccess = function(evt) {
    console.log('%c DB opened correctly', 'color: green;');
    // `this` is the `request` object (<=> `evt.target.value`)
    if (!db) db = this.result;
    retrieveData();
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
}
/**
  TODO
*/
function retrieveData() {
  console.log('TODO');
}

export default setupDB;
