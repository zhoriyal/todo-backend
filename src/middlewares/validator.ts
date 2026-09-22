import { Request, Response, NextFunction } from 'express';

// Validasi Register
export const validateRegister = (req: Request, res: Response, next: NextFunction): void => {
  const username = req.body.username || req.body.name;
  const { email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ success: false, message: 'Username (atau name), email, dan password wajib diisi!' });
    return;
  }

  if (!req.body.username && req.body.name) {
    req.body.username = req.body.name;
  }

  next();
};

// Validasi Login
export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  const identifier = req.body.username || req.body.email;
  const { password } = req.body;

  if (!identifier || !password) {
    res.status(400).json({ success: false, message: 'Username (atau email) dan password wajib diisi!' });
    return;
  }

  if (!req.body.username && req.body.email) {
    req.body.username = req.body.email;
  }

  next();
};

// Validasi Tambah Todo Baru
export const validateTodo = (req: Request, res: Response, next: NextFunction): void => {
  const { task } = req.body;
  if (!task || typeof task !== 'string') {
    res.status(400).json({ success: false, message: 'Task wajib diisi dan harus berupa string!' });
    return;
  }
  next();
};

// Validasi untuk update todo (Langkah 3)
export const validateUpdateTodo = (req: Request, res: Response, next: NextFunction): void => {
  const { task, is_completed } = req.body;

  // Minimal salah satu harus dikirim
  if (task === undefined && is_completed === undefined) {
    res.status(400).json({ success: false, message: 'Isi minimal task atau is_completed!' });
    return;
  }

  // Jika task dikirim, harus berupa string
  if (task !== undefined && typeof task !== 'string') {
    res.status(400).json({ success: false, message: 'Task harus berupa string!' });
    return;
  }

  // Jika is_completed dikirim, harus berupa boolean
  if (is_completed !== undefined && typeof is_completed !== 'boolean') {
    res.status(400).json({ success: false, message: 'is_completed harus berupa true atau false!' });
    return;
  }

  next();
};