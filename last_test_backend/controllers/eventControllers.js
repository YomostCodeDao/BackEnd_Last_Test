import Event from '../models/event.js';

export const createEvent = async (req, res) => {
    try {
        const event = new Event({ ...req.body, createdBy: req.user._id });
        await event.save();
        res.status(201).json(event);
    } catch (err) {
        res.status(500).json({ error: 'Lỗi tạo sự kiện' });
    }
};

export const getAllEvents = async (req, res) => {
    const events = await Event.find();
    res.json(events);
};

export const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ error: 'Ko tìm thấy sự kiện' });
        res.json(event);
    } catch {
        res.status(400).json({ error: 'ID ko hợp lệ' });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const updated = await Event.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(updated);
    } catch {
        res.status(500).json({ error: 'Lỗi update sk' });
    }
};

export const deleteEvent = async (req, res) => {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Xóa sk thành công' });
};

export const lockEvent = async (req, res) => {
    await Event.findByIdAndUpdate(req.params.id, { isLocked: true });
    res.json({ message: 'Đã lock sự kiện' });
};

export const unlockEvent = async (req, res) => {
    await Event.findByIdAndUpdate(req.params.id, { isLocked: false });
    res.json({ message: 'Đã unlock sự kiện' });
};
