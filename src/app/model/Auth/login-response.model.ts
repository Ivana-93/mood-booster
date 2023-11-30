import { User } from "../user.model";

export class LoginResponse {
    token: string;
    refreshToken: string;
    user: User;
}