class Base {
    number;
    symbols;
    static defaultBase = new Base(10);
    static predefinedSymbols = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    previousConversions = [];
    constructor(number, symbols = Base.predefinedSymbols) {
        this.number = number;
        this.symbols = symbols;
    }
    convert(number, base = Base.defaultBase) {
        const digits = Array.from(number.replaceAll(' ', ''), (v) => {
            return this.symbols.indexOf(v);
        });
        const convertedNumber10 = digits.reduce((acc, val, i) => {
            return acc + (val * (this.number ** (digits.length - 1 - i)));
        }, 0);
        const convertToBase = console.log(convertedNumber10);
    }
}
export { Base };
const base2 = new Base(2);
base2.convert("11101");
