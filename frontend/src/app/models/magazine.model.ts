export class MagazineModel {
    constructor(
    public _id: string,
    public    author: string,
    public    title: string,
    public    edition: number,
    public    description: string,
    public    frequency: string,
    public    nex:number,
    public    themes: [],
    public    clues: [],
    public    copies: number,
    public    available: number,
    public    user:[]
    ){}
}