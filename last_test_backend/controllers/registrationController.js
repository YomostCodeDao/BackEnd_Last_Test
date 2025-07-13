import Registration from '../models/registration.js';

export const registerEvent = async (req, res) => {
    try {
        const exists = await Registration.findOne({
            event: req.params.id,
            user: req.user._id,
        });
        if (exists) return res.status(400).json({ error: 'Đã đăng ký sự kiện' });

        const registration = new Registration({
            event: req.params.id,
            user: req.user._id,
        });
        await registration.save();
        res.status(201).json({ message: 'Đăng ký thành công' });
    } catch (err) {
        res.status(500).json({ error: 'Lỗi đăng ký' });
    }
};

export const cancelRegistration = async (req, res) => {
    try {
        await Registration.findOneAndDelete({
            event: req.params.id,
            user: req.user._id,
        });
        res.json({ message: 'Hủy đăng kí thành công' });
    } catch {
        res.status(500).json({ error: 'Lỗi khi hủy đăng kí' });
    }
};

export const getRegistrations = async (req, res) => {
    try {
        const list = await Registration.find({ event: req.params.id }).populate('user', 'name email');
        res.json(list);
    } catch {
        res.status(500).json({ error: 'Ko lấy đc ds đăng kí' });
    }
};
