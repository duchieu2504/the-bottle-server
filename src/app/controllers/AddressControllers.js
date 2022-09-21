import express from "express";
import Address from "../model/Address.js";
class AddressControllers {
    // GET /address/:_id
    async getAddress(req, res, next) {
        try {
            const data = await Address.find({ userId: req.params.userId });
            res.json(data);
        } catch (err) {
            res.json([]);
        }
    }
    async getAddressDefault(req, res, next) {
        try {
            const data = await Address.find({
                userId: req.params.userId,
                isDefault: true,
            });
            res.json(data);
        } catch (err) {
            res.json([]);
        }
    }
    async postAddress(req, res, next) {
        try {
            const data = req.body;
            const userId = data.userId;
            if (userId) {
                const addressUser = await Address.find({ userId: userId });
                if (addressUser.length > 0) {
                    const address = new Address(data);
                    address
                        .save()
                        .then(() => res.json({ message: "Pots success" }))
                        .catch(next);
                } else {
                    const addressData = { ...data, isDefault: true };
                    const address = new Address(addressData);
                    address
                        .save()
                        .then(() => res.json({ message: "Pots success" }))
                        .catch(next);
                }
            } else {
                const address = new Address({
                    ...data,
                    userId: null,
                    isDefault: false,
                });
                address
                    .save()
                    .then(() => res.json(address))
                    .catch(next);
            }
        } catch (err) {
            res.status(404).json({ errCode: "1", message: err.message });
        }
    }
    async edit(req, res, next) {
        try {
            const data = await Address.findOne({ _id: req.params.id });
            res.json(data);
        } catch (err) {
            res.json([]);
        }
    }
    async update(req, res, next) {
        const data = req.body;
        try {
            if (data.isDefault) {
                await Address.updateOne(
                    { isDefault: true },
                    { isDefault: false }
                );
                await Address.updateOne({ _id: req.params.id }, { ...data });
                res.json({ message: "Update thanh coong" });
            } else {
                await Address.updateOne({ _id: req.params.id }, { ...data });
                res.json({ message: "Update thanh coong" });
            }
        } catch (err) {
            res.status(404).json({ errCode: 1, message: err.message });
        }
    }
}

const addressCotrollers = new AddressControllers();
export default addressCotrollers;
