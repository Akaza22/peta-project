import { Request, Response } from 'express';
import User from '../models/User'; // Sesuaikan path dengan lokasi model User Anda

// Delete user berdasarkan ID
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params; // Mengambil ID dari parameter URL

  try {
    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    await user.destroy(); // Menghapus user
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Edit user berdasarkan ID
export const editUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params; // Mengambil ID dari parameter URL
  const { username, email, role } = req.body; // Data yang akan diupdate

  try {
    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Update data user
    user.username = username || user.username;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save(); // Menyimpan perubahan
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
