

export type ContactType = {
    id: string;
    name: string;
    lastname: string;
    img: string;
}

export type UserAuth = {
    password: string
}

export type MessageType = {
    id: string;
    recieverId: string;
    senderId: number;
    content: string
}