"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreMessage = exports.deleteMessage = exports.editMessage = exports.getMessage = exports.listMessages = exports.kickUser = exports.kick = exports.invite = exports.users = exports.rename = exports.post = exports.get = exports.exists = exports.create = exports.list = void 0;
// import { MessagingOptions } from 'child_process';
const api_1 = __importDefault(require("../../api"));
const messaging_1 = __importDefault(require("../../messaging"));
const helpers_1 = __importDefault(require("../../helpers"));
// const Chats = module.exports;
const Chats = null;
function list(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Chats.list = async (req: Request, res: Response) => {
        const page = (isFinite(Number(req.query.page)) && parseInt(String(req.query.page), 10)) || 1;
        const perPage = (isFinite(Number(req.query.perPage)) &&
            parseInt(String(req.query.perPage), 10)) || 20;
        const start = Math.max(0, page - 1) * perPage;
        const stop = start + perPage;
        // **********
        // *** MESSAGE OBJECT OR ROOM OBJECT???
        // eslint-disable-next-line max-len
        const rooms = yield messaging_1.default.getRecentChats(req.query.uid, req.query.uid, start, stop);
        // **********
        // The next line calls a function in a module that has not been updated to TS yet
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        helpers_1.default.formatApiResponse(200, res, { rooms });
    });
}
exports.list = list;
// Chats.create = async (req: Request, res: Response) => {
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const roomObj = yield api_1.default.chats.create(req, req.body);
        // The next line calls a function in a module that has not been updated to TS yet
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        helpers_1.default.formatApiResponse(200, res, roomObj);
    });
}
exports.create = create;
// Chats.exists = async (req: Request, res: Response) => {
function exists(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // The next line calls a function in a module that has not been updated to TS yet
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        yield helpers_1.default.formatApiResponse(200, res);
    });
}
exports.exists = exists;
// Chats.get = async (req: Request, res: Response) => {
function get(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // The next line calls a function in a module that has not been updated to TS yet
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        const roomObj = yield messaging_1.default.loadRoom(req.query.uid, {
            uid: req.query.uid,
            roomId: req.params.roomId,
        });
        // The next line calls a function in a module that has not been updated to TS yet
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        helpers_1.default.formatApiResponse(200, res, roomObj);
    });
}
exports.get = get;
// Chats.post = async (req: Request, res: Response) => {
function post(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const messageObj = yield api_1.default.chats.post(req, Object.assign(Object.assign({}, req.body), { roomId: req.params.roomId }));
        // The next line calls a function in a module that has not been updated to TS yet
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        helpers_1.default.formatApiResponse(200, res, messageObj);
    });
}
exports.post = post;
// Chats.rename = async (req: Request, res: Response) => {
function rename(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const roomObj = yield api_1.default.chats.rename(req, Object.assign(Object.assign({}, req.body), { roomId: req.params.roomId }));
        // The next line calls a function in a module that has not been updated to TS yet
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        helpers_1.default.formatApiResponse(200, res, roomObj);
    });
}
exports.rename = rename;
// Chats.users = async (req: Request, res: Response) => {
function users(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield api_1.default.chats.users(req, Object.assign({}, req.params));
        // The next line calls a function in a module that has not been updated to TS yet
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        helpers_1.default.formatApiResponse(200, res, users);
    });
}
exports.users = users;
// Chats.invite = async (req: Request, res: Response) => {
function invite(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield api_1.default.chats.invite(req, Object.assign(Object.assign({}, req.body), { roomId: req.params.roomId }));
        // The next line calls a function in a module that has not been updated to TS yet
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        helpers_1.default.formatApiResponse(200, res, users);
    });
}
exports.invite = invite;
// Chats.kick = async (req: Request, res: Response) => {
function kick(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield api_1.default.chats.kick(req, Object.assign(Object.assign({}, req.body), { roomId: req.params.roomId }));
        // The next line calls a function in a module that has not been updated to TS yet
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        helpers_1.default.formatApiResponse(200, res, users);
    });
}
exports.kick = kick;
// Chats.kickUser = async (req: Request, res: Response) => {
function kickUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // The next line calls a function in a module that has not been updated to TS yet
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        req.body.uids = [req.params.uid];
        const users = yield api_1.default.chats.kick(req, Object.assign(Object.assign({}, req.body), { roomId: req.params.roomId }));
        // The next line calls a function in a module that has not been updated to TS yet
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        helpers_1.default.formatApiResponse(200, res, users);
    });
}
exports.kickUser = kickUser;
// const messages: Messages = {};
// Chats.messages.list = async (req: Request, res: Response) => {
function listMessages(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const messages = yield messaging_1.default.getMessages({
            callerUid: req.query.uid,
            uid: req.query.uid,
            roomId: req.params.roomId,
            start: parseInt(String(req.query.start), 10) || 0,
            count: 50,
        });
        // The next line calls a function in a module that has not been updated to TS yet
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        helpers_1.default.formatApiResponse(200, res, { messages });
    });
}
exports.listMessages = listMessages;
// Chats.messages.get = async (req: Request, res: Response) => {
function getMessage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // The next line calls a function in a module that has not been updated to TS yet
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, max-len
        const messages = yield messaging_1.default.getMessagesData([req.params.mid], req.query.uid, req.params.roomId, false);
        // The next line calls a function in a module that has not been updated to TS yet
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        helpers_1.default.formatApiResponse(200, res, messages.pop());
    });
}
exports.getMessage = getMessage;
// Chats.messages.edit = async (req: Request, res: Response) => {
function editMessage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // The next line calls a function in a module that has not been updated to TS yet
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        yield messaging_1.default.canEdit(req.params.mid, req.query.uid);
        // The next line calls a function in a module that has not been updated to TS yet
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        yield messaging_1.default.editMessage(req.query.uid, req.params.mid, req.params.roomId, req.body.message);
        // The next line calls a function in a module that has not been updated to TS yet
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, max-len
        const messages = yield messaging_1.default.getMessagesData([req.params.mid], req.query.uid, req.params.roomId, false);
        // The next line calls a function in a module that has not been updated to TS yet
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        helpers_1.default.formatApiResponse(200, res, messages.pop());
    });
}
exports.editMessage = editMessage;
// Chats.messages.delete = async (req: Request, res: Response) => {
function deleteMessage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // The next line calls a function in a module that has not been updated to TS yet
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        yield messaging_1.default.canDelete(req.params.mid, req.query.uid);
        // The next line calls a function in a module that has not been updated to TS yet
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        yield messaging_1.default.deleteMessage(req.params.mid, req.query.uid);
        // The next line calls a function in a module that has not been updated to TS yet
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        helpers_1.default.formatApiResponse(200, res);
    });
}
exports.deleteMessage = deleteMessage;
// Chats.messages.restore = async (req: Request, res: Response) => {
function restoreMessage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // The next line calls a function in a module that has not been updated to TS yet
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        yield messaging_1.default.canDelete(req.params.mid, req.query.uid);
        // The next line calls a function in a module that has not been updated to TS yet
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        yield messaging_1.default.restoreMessage(req.params.mid, req.query.uid);
        // The next line calls a function in a module that has not been updated to TS yet
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        helpers_1.default.formatApiResponse(200, res);
    });
}
exports.restoreMessage = restoreMessage;
