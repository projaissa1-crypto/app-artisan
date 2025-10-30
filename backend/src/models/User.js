import db from '../db/index.js';
import bcrypt from 'bcryptjs';

class User {
  static async create(userData) {
    const { email, password, name, role = 'artisan', phone, specialty } = userData;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      email,
      password: hashedPassword,
      name,
      role, // 'admin' or 'artisan'
      phone: phone || null,
      specialty: specialty || null, // e.g., 'electrician-residential', 'electrician-commercial', 'electrician-industrial'
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    db.data.users.push(user);
    await db.write();
    
    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  
  static async findByEmail(email) {
    return db.data.users.find(u => u.email === email);
  }
  
  static async findById(id) {
    return db.data.users.find(u => u.id === id);
  }
  
  static async getAll() {
    return db.data.users.map(({ password, ...user }) => user);
  }
  
  static async update(id, updates) {
    const index = db.data.users.findIndex(u => u.id === id);
    if (index === -1) return null;
    
    // If password is being updated, hash it
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    
    db.data.users[index] = {
      ...db.data.users[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    await db.write();
    
    const { password, ...userWithoutPassword } = db.data.users[index];
    return userWithoutPassword;
  }
  
  static async delete(id) {
    const index = db.data.users.findIndex(u => u.id === id);
    if (index === -1) return false;
    
    db.data.users.splice(index, 1);
    await db.write();
    return true;
  }
  
  static async comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

export default User;
