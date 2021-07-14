export class UserModel {
    constructor(
        public _id: string,
        public cui: string,
        public name: string,
        public username: string,
        public email: string,
        public role: string,
        public password: string,
        public image: string
    ){}
}