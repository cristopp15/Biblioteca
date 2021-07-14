export class BookModel {
    constructor(
    public    _id: string,
    public    author: string,
    public    title: string,
    public    edition: number,
    public    clues: [],
    public    description: string,
    public    themes: [],
    public    copies: number,
    public    available: number,
    public    user:[]
   
    ){}
}