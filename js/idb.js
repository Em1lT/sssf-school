// indexedDB stuff
let indexedDB;

if (self.indexedDB) {
    indexedDB = self.indexedDB;
} else {
    indexedDB = window.indexedDB;
}

const request = indexedDB.open('greetings', 1);
let db;

request.onupgradeneeded = (event) => {
    const db = request.result;
    const outB = db.createObjectStore('outbox', {
        autoIncrement: true
    });
    const inB = db.createObjectStore('inbox', {
        autoIncrement: true
    });
};

request.onerror = (event) => {};

request.onsuccess = (event) => {
    db = request.result;
    db.onerror = (event) => {
        console.error('Database error', event.target.errorCode);
    };
};

const saveData = (name, data) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(name, 'readwrite');
        const store = transaction.objectStore(name);

        store.put(data);
        transaction.oncomplete = () => {
            resolve(true);
        };
        transaction.onerror = () => {
            reject('put error');
        };
    })
};

const loadData = (name) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(name, 'readwrite');
        const store = transaction.objectStore(name);
        const query = store.getAll();
        transaction.oncomplete = () => {
            resolve(query.result);
        };
        transaction.onerror = () => {
            reject('query error');
        };
    })
};

const clearData = (name) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(name, 'readwrite');
        const store = transaction.objectStore(name);
        store.clear();
        transaction.oncomplete = () => {
            resolve(true);
        };
        transaction.onerror = () => {
            reject('clear error');
        };
    })
};