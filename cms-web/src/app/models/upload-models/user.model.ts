export class UserUploadModel {
    id!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    expiresOn: Date | undefined;
    isAdmin!: boolean;
    adminPassword: string | undefined;

    constructor(
        firstName: string,
        lastName: string,
        email: string,
        isAdmin: boolean
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.isAdmin = isAdmin;
    }
}
