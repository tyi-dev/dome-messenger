export type User = {
   id: number;
   userName: string;
   firstName: string;
   lastName: string;
   lastSeen: string;
   email: string;
   phoneNumber: string;
};

export type SearchUserRes = Pick<User, 'id' | 'userName'>;
