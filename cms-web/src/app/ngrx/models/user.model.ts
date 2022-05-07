export class User {
    id!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    expiresOn!: Date | undefined;
    isAdmin!: boolean;
    createdOn!: Date;
    createdBy!: string;
}
