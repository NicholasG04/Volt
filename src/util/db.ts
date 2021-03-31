import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const adapter = new FileSync('storage/april2021.json');
const db = low(adapter);

db.defaults({ servers: {} })
  .write();

export default db;
