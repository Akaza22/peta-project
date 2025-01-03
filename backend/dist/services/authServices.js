var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
export const register = (username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt.hash(password, 10);
    const user = yield User.create({ username, email, password: hashedPassword });
    return user;
});
export const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findOne({ where: { email } });
    if (!user)
        throw new Error('Invalid email or password');
    const isMatch = yield bcrypt.compare(password, user.password);
    if (!isMatch)
        throw new Error('Invalid email or password');
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    return { token, user };
});
