import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { sendResetEmail } from '../utils/email.js';

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: 'Đăng ký thành công' });
    } catch (err) {
        res.status(400).json({ error: 'Email đã tồn tại hoặc lỗi hệ thống' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: 'Sai tài khoản' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: 'Sai mật khẩu' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Lỗi server r' });
    }
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    await sendResetEmail(email);
    res.json({ message: 'Email đặt lại mật khẩu đã được gửi' });
};

export const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'Ko tìm thấy user' });

        user.password = newPassword;
        await user.save();
        res.json({ message: 'Đặt lại mật khẩu thành công' });
    } catch (err) {
        res.status(500).json({ error: 'Lỗi server' });
    }
};
