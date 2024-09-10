export type TokenResponce = {
   domeAccessToken: string;
};

export type LoginPayload = {
   email: string;
   password: string;
};

export type SignUpPayload = {
   firstName: string;
   lastName: string;
   email: string;
   password: string;
   phoneNumber: string;
};
