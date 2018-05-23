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
      // indexed goal id.
      const stepsStore = db.createObjectStore('steps', { keyPath: 'id' });
      stepsStore.createIndex('goalId', 'goalId', { unique: false });

      // store for the user
      db.createObjectStore('user', { keyPath: 'id' });
    };
  });
}

/**
  Fetch initial data from the DB.
*/
function retrieveData(storeName) {
  console.log('%c retrieving initial data', 'color: blue;');
  return new Promise(resolve => {
    const res = [];
    // Start a `transaction` to retrieve initial data.
    db
      .transaction(storeName)
      .objectStore(storeName)
      .openCursor()
      .onsuccess = evt => {
        const cursor = evt.target.result;
        if (cursor) {
          res.push(cursor.value);
          cursor.continue();
        } else {
          resolve(res);
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
    .transaction(storeName, 'readwrite')
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

/**
  Retrieve one element from the DB based on the object store `keyPath` (`id`).
  @param { string } storeName
  @param { string } id
  @return { promise } a promise carrying the object
*/
function getOne(storeName, id) {
  console.log('%c start transaction to get an element from ' + storeName, 'color: blue;');

  return new Promise((resolve, reject) => {
    const getReq = db
      .transaction(storeName)
      .objectStore(storeName)
      .get(id);

    // In case of errors
    getReq.onerror = evt => console.log(
      '%c error during `get`',
      'color: red;',
      evt.target.errorCode
    ) || reject(evt);

    // In case of success return the object retrieved
    getReq.onsuccess = evt => console.log(
      '%c got data', 'color: green;'
    ) || resolve(evt.target.result);
  });
}

/**
  Change an element in the DB.
  @param { string } storeName
  @param { string } id
  @param { object } changes : the changes to apply to the data
  @return { promise }
*/
async function modifyData(storeName, id, changes) {
  console.log('%c start transaction to put data in ' + storeName, 'color: blue;');

  const data = await getOne(storeName, id);
  // Merge the old `steps` and the new ones.
  if (changes.steps) {
    if (changes.steps.remove) {
      changes.steps = data.steps.filter(stepId => stepId !== changes.steps.id);
    } else {
      changes.steps = data.steps.concat(changes.steps);
    }
  }
  const putReq = db
    .transaction(storeName, 'readwrite')
    .objectStore(storeName)
    .put(Object.assign(data, changes));

  putReq.onerror = evt => console.log(
    '%c error while updating data',
    'color: red;',
    evt.target.errorCode
  );

  putReq.onsucces = evt => console.log(
    '%c put operation success',
    'color: green;'
  );
}

/**
  Remove an object from the DB.
  @param { string } storeName
  @param { string } id
  @return { promise } promise carrying the deleted data
*/
function deleteOne(storeName, id) {
  console.log('%c starting tr to delete from ' + storeName, 'color: blue;');

  return new Promise((resolve, reject) => {
    const delReq = db
      .transaction(storeName, 'readwrite')
      .objectStore(storeName)
      .delete(id);

    delReq.onerror = evt => console.log(
      '%c error while deleting',
      'color: red;',
      evt.target.errorCode
    ) || reject(evt);

    delReq.onsuccess = evt => console.log(
      '%c delete success',
      'color: green;'
    ) || resolve(evt.target.result);
  });
}

function fetchUser() {
  console.log('%c start tr to fetch user', 'color: blue;');
  return new Promise((resolve, reject) => {
    db
      .transaction('user')
      .objectStore('user')
      .openCursor()
      .onsuccess = evt => {
        console.log('%c fetch user success', 'color: green;');
        const cursor = evt.target.result;
        if (cursor) resolve(cursor.value);
        resolve(null);
      };
  });
}

function getDB() {
  return db;
}

export { getDB, addData, retrieveData, getOne, modifyData, deleteOne, fetchUser };
export default setupDB;
