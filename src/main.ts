export class Base {
    static defaultBase = new Base(10);
    static predefinedSymbols = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";


    private previousConversions: number[] = [];
    constructor(public number: number, public symbols: string = Base.predefinedSymbols) {}
    convert(number: string, base: Base = Base.defaultBase) {
        const digits = Array.from(number.replaceAll(' ', ''), (v) => {
            return this.symbols.indexOf(v);
        })
        const convertedNumber10 = digits.reduce((acc, val, i) => {
            return acc + (val * (this.number ** (digits.length-1-i)))
        }, 0);
        const convertToBase = 
        console.log(convertedNumber10)
    }
}


const base2 = new Base(2);

base2.convert("11101");