import db from '../config/database.js';
import bcrypt from 'bcryptjs';

class User {
  static async create(userData) {
    const { email, password, name, role = 'artisan', phone, specialties } = userData;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = db.prepare(`
      INSERT INTO users (email, password, name, role, phone)
      VALUES (?, ?, ?, ?, ?)
    `).run(email, hashedPassword, name, role, phone || null);
    
    const userId = result.lastInsertRowid;
    
    // Add specialties
    if (specialties && Array.isArray(specialties)) {
      const insertSpecialty = db.prepare('INSERT INTO user_specialties (user_id, specialty_id) VALUES (?, ?)');
      for (const specialtyId of specialties) {
        try {
          insertSpecialty.run(userId, specialtyId);
        } catch (e) {
          console.log(`Specialty ${specialtyId} already added`);
        }
      }
    }
    
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
    
    // Get user specialties
    const userSpecialties = db.prepare(`
      SELECT s.* FROM specialties s
      JOIN user_specialties us ON s.id = us.specialty_id
      WHERE us.user_id = ?
    `).all(userId);
    
    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return { ...userWithoutPassword, specialties: userSpecialties };
  }
  
  static async findByEmail(email) {
    return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  }
  
  static async findById(id) {
    return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  }
  
  static async getAll() {
    const users = db.prepare('SELECT * FROM users').all();
    return users.map(({ password, ...user }) => user);
  }
  
  static async update(id, updates) {
    // If password is being updated, hash it
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    
    const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(updates), id];
    
    db.prepare(`UPDATE users SET ${fields}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`).run(...values);
    
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    if (!user) return null;
    
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  
  static async delete(id) {
    const result = db.prepare('DELETE FROM users WHERE id = ?').run(id);
    return result.changes > 0;
  }
  
  static async comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

export default User;
