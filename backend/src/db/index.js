import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Database schema
const defaultData = {
  users: [],
  categories: [],
  materials: [],
  projects: []
};

// Initialize database
const file = join(__dirname, '../../data/db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter, defaultData);

// Read data from JSON file, this will set db.data content
await db.read();

// If file.json doesn't exist, db.data will be null
// Set default data
if (!db.data) {
  db.data = defaultData;
  await db.write();
}

export default db;
