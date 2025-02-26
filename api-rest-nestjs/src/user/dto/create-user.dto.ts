export class CreateUserDto {
    username: string;
    hash: string;
    email: string;
    passwordResetToken: string;
    passwordResetExpires: Date;
}
