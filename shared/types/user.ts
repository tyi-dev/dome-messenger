export enum USER_STATUS {
    ACTIVE = "ACTIVE",
    NEW = "NEW",
}

export type User = {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
}