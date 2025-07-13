import User from '../models/user.js';

export const getAllUsers = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const users = await User.find()
            .select('-password')
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Lỗi khi lấy danh sách người dùng' });
    }
};

export const getMe = async (req, res) => {
    res.json(req.user);
};

export const updateMe = async (req, res) => {
    const { name, email } = req.body;
    try {
        const updated = await User.findByIdAndUpdate(
            req.user._id,
            { name, email },
            { new: true }
        ).select('-password');
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Lỗi cập nhật thông tin cá nhân' });
    }
};

export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'Xóa người dùng thành công' });
    } catch (err) {
        res.status(500).json({ error: 'Lỗi khi xóa người dùng' });
    }
};
