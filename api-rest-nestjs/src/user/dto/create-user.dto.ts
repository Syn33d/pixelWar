import { Role } from "../enums/role.enum";

export class CreateUserDto {
    username: string;
    email: string;
    password: string;
    role: Role;
}
