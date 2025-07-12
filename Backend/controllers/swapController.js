const Swap = require("../models/Swap");

exports.sendSwap = async (req, res) => {
    try {
        const { toUser, skillOffered, skillWanted, message } = req.body;
        const swap = await Swap.create({
            fromUser: req.user.id,
            toUser,
            skillOffered,
            skillWanted,
            message
        });
        res.status(201).json(swap);
    } catch (err) {
        res.status(400).json({ error: "Swap request failed" });
    }
};

exports.getMySwaps = async (req, res) => {
    try {
        const sent = await Swap.find({ fromUser: req.user.id }).populate("toUser", "name email");
        const received = await Swap.find({ toUser: req.user.id }).populate("fromUser", "name email");
        res.json({ sent, received });
    } catch (err) {
        res.status(500).json({ error: "Could not fetch swaps" });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updated = await Swap.findByIdAndUpdate(id, { status }, { new: true });
        res.json(updated);
    } catch {
        res.status(400).json({ error: "Could not update status" });
    }
};
