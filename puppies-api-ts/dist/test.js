"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./db"));
const db = () => db_1.default.map(p => ({ ...p, dob: p.dob.toISOString() }));
describe('Testing api endpoint', () => {
    test('gets one', async () => {
        const res = await (0, supertest_1.default)(app_1.default).get('/api/puppies/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(db()[0]);
    });
    test('gets all puppies', async () => {
        const res = await (0, supertest_1.default)(app_1.default).get('/api/puppies');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(db());
    });
    test('adds one puppy', async () => {
        const newPuppy = { name: 'Morti', breed: 'Darki', dob: new Date().toISOString() };
        const res = await (0, supertest_1.default)(app_1.default).post('/api/puppies').send(newPuppy);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({ ...newPuppy, id: 11 });
    });
    test('updates a puppy', async () => {
        const updatedPuppy = { name: 'Morti', breed: 'Darki', dob: new Date().toISOString() };
        const res = await (0, supertest_1.default)(app_1.default).put('/api/puppies/1').send(updatedPuppy);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ id: 1, ...updatedPuppy });
    });
    test('deletes one', async () => {
        const beforeDeleteLen = db().length;
        const beforeDeleteCopy = db()[0];
        const res = await (0, supertest_1.default)(app_1.default).delete('/api/puppies/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body[0]).toEqual(beforeDeleteCopy);
        expect(db().length).toBe(beforeDeleteLen - 1);
    });
});
//# sourceMappingURL=test.js.map