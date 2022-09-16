"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// - GET: `api/puppies`. This should return a list of all puppies in JSON-format.
app.get('/api/puppies', (_req, res) => {
    return res.json(db_1.default);
});
// - GET: `api/puppies/:id`. This should return one puppy in JSON-format.
app.get('/api/puppies/:id', (req, res) => {
    return res.json(db_1.default.find(puppy => `${puppy.id}` === req.params.id));
});
// - POST: `api/puppies`. This should create and return the newly added puppy.
app.post('/api/puppies', (req, res) => {
    const puppy = {
        id: db_1.default.reduce((a, b) => b.id > a.id ? b : a).id + 1,
        breed: req.body.breed,
        name: req.body.name,
        dob: new Date(req.body.dob),
    };
    db_1.default.push(puppy);
    return res.status(201).json(puppy);
});
// - PUT: `api/puppies/:id`. This should put one puppy down (jk, just update the specific puppy).
app.put("/api/puppies/:id", (req, res) => {
    const puppyIndex = db_1.default.findIndex(puppy => `${puppy.id}` === req.params.id);
    const { name, dob, breed } = req.body;
    db_1.default[puppyIndex] = { id: Number(req.params.id), name, dob: new Date(dob), breed };
    return res.json(db_1.default[puppyIndex]);
});
// - DELETE: `api/puppies/:id`. This should actually put one puppy down aka delete it.
app.delete('/api/puppies/:id', (req, res) => {
    const puppyIndex = db_1.default.findIndex(puppy => `${puppy.id}` === req.params.id);
    if (puppyIndex > -1) {
        return res.json(db_1.default.splice(puppyIndex, 1));
    }
    else {
        return res.status(404).json({ message: "Not found" });
    }
});
exports.default = app;
//# sourceMappingURL=app.js.map