export default class Data {
    id: number | undefined;
    name : string;
    date: string;
    value: number;

    constructor(name: string, date: string, value: number){
        this.name = name;
        this.date = date;
        this.value = value;
    }
}