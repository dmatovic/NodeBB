import { Request, Response } from 'express';
import { MessagingOptions } from 'child_process';

import api from '../../api';
import messaging from '../../messaging';
import helpers from '../../helpers';
import { MessageObject, RoomObject } from '../../types/chat';


const Chats = module.exports;

const chats: MessagingOptions[] | null = null;

export async function list(req: Request, res: Response): Promise<helpers> {
    const page: number = (isFinite(Number(req.query.page)) && parseInt(String(req.query.page), 10)) || 1 as number;
    const perPage: number = (isFinite(Number(req.query.perPage)) &&
                                parseInt(String(req.query.perPage), 10)) || 20 as number;
    const start: number = Math.max(0, page - 1) * perPage;
    const stop: number = start + perPage;
    // **********
    // *** MESSAGE OBJECT OR ROOM OBJECT???
    const rooms: RoomObject[] = await messaging.getRecentChats(req.query.uid, req.query.uid, start, stop) as RoomObject[];
    // **********
    // The next line calls a function in a module that has not been updated to TS yet
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    helpers.formatApiResponse(200, res, { rooms });
}

Chats.create = async (req: Request, res: Response) => {
    const roomObj: RoomObject = await api.chats.create(req, req.body) as RoomObject;
    // The next line calls a function in a module that has not been updated to TS yet
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    helpers.formatApiResponse(200, res, roomObj);
};

Chats.exists = async (req: Request, res: Response) => {
    // The next line calls a function in a module that has not been updated to TS yet
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    helpers.formatApiResponse(200, res);
};

Chats.get = async (req: Request, res: Response) => {
    const roomObj: RoomObject = await messaging.loadRoom(req.query.uid, {
        uid: req.query.uid,
        roomId: req.params.roomId,
    }) as RoomObject;

    // The next line calls a function in a module that has not been updated to TS yet
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    helpers.formatApiResponse(200, res, roomObj);
};

Chats.post = async (req: Request, res: Response) => {
    const messageObj: MessageObject = await api.chats.post(req, {
        ...req.body,
        roomId: req.params.roomId,
    }) as MessageObject;

    // The next line calls a function in a module that has not been updated to TS yet
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    helpers.formatApiResponse(200, res, messageObj);
};

Chats.rename = async (req: Request, res: Response) => {
    const roomObj: RoomObject = await api.chats.rename(req, {
        ...req.body,
        roomId: req.params.roomId,
    }) as RoomObject;

    // The next line calls a function in a module that has not been updated to TS yet
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    helpers.formatApiResponse(200, res, roomObj);
};

Chats.users = async (req: Request, res: Response) => {
    const users = await api.chats.users(req, {
        ...req.params,
    });
    // The next line calls a function in a module that has not been updated to TS yet
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    helpers.formatApiResponse(200, res, users);
};

Chats.invite = async (req: Request, res: Response) => {
    const users = await api.chats.invite(req, {
        ...req.body,
        roomId: req.params.roomId,
    });

    // The next line calls a function in a module that has not been updated to TS yet
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    helpers.formatApiResponse(200, res, users);
};

Chats.kick = async (req: Request, res: Response) => {
    const users = await api.chats.kick(req, {
        ...req.body,
        roomId: req.params.roomId,
    });

    // The next line calls a function in a module that has not been updated to TS yet
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    helpers.formatApiResponse(200, res, users);
};

Chats.kickUser = async (req: Request, res: Response) => {
    req.body.uids = [req.params.uid];
    const users = await api.chats.kick(req, {
        ...req.body,
        roomId: req.params.roomId,
    });

    // The next line calls a function in a module that has not been updated to TS yet
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    helpers.formatApiResponse(200, res, users);
};

Chats.messages = {};
Chats.messages.list = async (req: Request, res: Response) => {
    const messages: MessageObject[] = await messaging.getMessages({
        callerUid: req.query.uid,
        uid: req.query.uid,
        roomId: req.params.roomId,
        start: parseInt(String(req.query.start), 10) || 0,
        count: 50,
    }) as MessageObject[];

    // The next line calls a function in a module that has not been updated to TS yet
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    helpers.formatApiResponse(200, res, { messages });
};

Chats.messages.get = async (req: Request, res: Response) => {
    const messages: MessageObject[] = await messaging.getMessagesData([req.params.mid], req.query.uid, req.params.roomId, false) as MessageObject[];
    // The next line calls a function in a module that has not been updated to TS yet
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    helpers.formatApiResponse(200, res, messages.pop());
};

Chats.messages.edit = async (req: Request, res: Response) => {
    await messaging.canEdit(req.params.mid, req.query.uid);
    await messaging.editMessage(req.query.uid, req.params.mid, req.params.roomId, req.body.message);

    const messages: MessageObject[] = await messaging.getMessagesData([req.params.mid], req.query.uid, req.params.roomId, false) as MessageObject[];
    // The next line calls a function in a module that has not been updated to TS yet
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    helpers.formatApiResponse(200, res, messages.pop());
};

Chats.messages.delete = async (req: Request, res: Response) => {
    await messaging.canDelete(req.params.mid, req.query.uid);
    await messaging.deleteMessage(req.params.mid, req.query.uid);

    // The next line calls a function in a module that has not been updated to TS yet
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    helpers.formatApiResponse(200, res);
};

Chats.messages.restore = async (req: Request, res: Response) => {
    await messaging.canDelete(req.params.mid, req.query.uid);
    await messaging.restoreMessage(req.params.mid, req.query.uid);

    // The next line calls a function in a module that has not been updated to TS yet
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    helpers.formatApiResponse(200, res);
};

