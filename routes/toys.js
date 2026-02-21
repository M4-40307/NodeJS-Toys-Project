const express = require('express');
const router = express.Router();
const Toy = require('../models/toy');
const auth = require('../middlewares/auth');
const toySchemaJoi = require('../helpers/toy_validators');

const LIMIT = 10;

/* ===========================
   GET ALL TOYS (PAGE STYLE)
=========================== */
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.skip) || 1; // skip = page number
        const skip = (page - 1) * LIMIT;

        const toys = await Toy.find()
            .skip(skip)
            .limit(LIMIT);

        res.json(toys);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

/* ===========================
   GET TOYS BY SEARCH
=========================== */
router.get('/search', async (req, res) => {
    try {
        const page = parseInt(req.query.skip) || 1;
        const skip = (page - 1) * LIMIT;
        const search = req.query.s;

        let query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { info: { $regex: search, $options: 'i' } }
            ];
        }

        const toys = await Toy.find(query)
            .skip(skip)
            .limit(LIMIT);

        res.json(toys);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

/* ===========================
   GET TOYS BY CATEGORY
=========================== */
router.get('/category/:catname', async (req, res) => {
    try {
        const page = parseInt(req.query.skip) || 1;
        const skip = (page - 1) * LIMIT;

        const toys = await Toy.find({ category: req.params.catname })
            .skip(skip)
            .limit(LIMIT);

        res.json(toys);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

/* ===========================
   GET TOYS BY PRICE RANGE
=========================== */
router.get('/prices', async (req, res) => {
    try {
        const page = parseInt(req.query.skip) || 1;
        const skip = (page - 1) * LIMIT;

        const min = parseFloat(req.query.min);
        const max = parseFloat(req.query.max);

        let priceQuery = {};

        if (!isNaN(min)) priceQuery.$gte = min;
        if (!isNaN(max)) priceQuery.$lte = max;

        const filter = Object.keys(priceQuery).length
            ? { price: priceQuery }
            : {};

        const toys = await Toy.find(filter)
            .skip(skip)
            .limit(LIMIT);

        res.json(toys);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

/* ===========================
   GET SINGLE TOY
=========================== */
router.get('/single/:id', async (req, res) => {
    try {
        const toy = await Toy.findById(req.params.id);
        if (!toy) return res.status(404).json({ message: 'Toy not found' });
        res.json(toy);
    } catch (err) {
        res.status(400).json({ message: 'Invalid Toy ID' });
    }
});

/* ===========================
   GET TOYS COUNT
=========================== */
router.get('/count', async (req, res) => {
    try {
        const count = await Toy.countDocuments();
        res.json({ count });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

/* ===========================
   POST NEW TOY (AUTH)
=========================== */
router.post('/', auth, async (req, res) => {
    try {
        const { error, value } = toySchemaJoi.validate(req.body);
        if (error)
            return res.status(400).json({ message: error.details[0].message });

        const newToy = new Toy({
            ...value,
            user_id: req.user._id
        });

        const toy = await newToy.save();
        res.status(201).json(toy);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

/* ===========================
   PUT UPDATE TOY (AUTH + OWNER)
=========================== */
router.put('/:id', auth, async (req, res) => {
    try {
        const { error, value } = toySchemaJoi.validate(req.body);
        if (error)
            return res.status(400).json({ message: error.details[0].message });

        const toy = await Toy.findById(req.params.id);
        if (!toy)
            return res.status(404).json({ message: 'Toy not found' });

        if (String(toy.user_id) !== String(req.user._id))
            return res.status(403).json({ message: 'Authorization denied' });

        Object.assign(toy, value);
        await toy.save();

        res.json(toy);
    } catch (err) {
        res.status(400).json({ message: 'Invalid Toy ID' });
    }
});

/* ===========================
   DELETE TOY (AUTH + OWNER)
=========================== */
router.delete('/:id', auth, async (req, res) => {
    try {
        const toy = await Toy.findById(req.params.id);
        if (!toy)
            return res.status(404).json({ message: 'Toy not found' });

        if (String(toy.user_id) !== String(req.user._id))
            return res.status(403).json({ message: 'Authorization denied' });

        await Toy.deleteOne({ _id: req.params.id });

        res.json({ message: 'Toy removed' });
    } catch (err) {
        res.status(400).json({ message: 'Invalid Toy ID' });
    }
});

module.exports = router;