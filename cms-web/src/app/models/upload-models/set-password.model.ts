export class SetPasswordUploadModel {
    passwordResetToken!: string;
    newPassword!: string;

    constructor(
        passwordResetToken: string,
        newPassword: string
    ) {
        this.passwordResetToken = passwordResetToken;
        this.newPassword = newPassword;
    }
}
