class Base {
    size;
    ignoreWarnings;
    symbols;
    static defaultBase = new Base(10);
    static predefinedSymbols = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@#$%^&*()_+`-={}|[];':\",./<>?";
    static hex = new Base(16);
    baseid = Base.hex?.readFrom(Math.floor(Math.random() * 10000000));
    previousConversions = [];
    constructor(size, ignoreWarnings = false, symbols = Base.predefinedSymbols) {
        this.size = size;
        this.ignoreWarnings = ignoreWarnings;
        this.symbols = symbols;
    }
    readTo(number) {
        const digits = Array.from(number.replaceAll(" ", ""), (v) => {
            const index = this.symbols.indexOf(v);
            if (index > this.size && !this.ignoreWarnings)
                generateWarning(`Number: (${v}) is too large for this base. Maximum number for this base is ${this.symbols[this.size + 1]}`, { BaseID: this.baseid });
            return index;
        });
        return digits.reduce((acc, val, i) => {
            return acc + val * this.size ** (digits.length - 1 - i);
        }, 0);
    }
    readFrom(number) {
        return this.remainderPreseder(number, this);
    }
    conversion(number, base = Base.defaultBase) {
        const base10Number = this.readTo(number);
        if (base.size == 10 && !this.ignoreWarnings)
            generateWarning(`For conversion to base10, use Base.readTo for better performance.`, { BaseID: this.baseid });
        if (this.size == 10 && !this.ignoreWarnings)
            generateWarning(`For conversion from base10, use Base.readFrom for better performance.`, { BaseID: this.baseid });
        return this.remainderPreseder(base10Number, base);
    }
    remainderPreseder(base10Number, base = Base.defaultBase) {
        let quotient = Math.floor(base10Number / base.size);
        let conversion = this.symbols[base10Number % base.size];
        while (quotient > 0) {
            conversion = this.symbols[quotient % base.size] + conversion;
            quotient = Math.floor(quotient / base.size);
        }
        return conversion;
    }
}
export { Base };
function generateWarning(text, customData = {}) {
    const data = Object.entries(customData).reduce((acc, val) => acc + `${val[0]}: ${val[1]}`, "");
    console.error(`\x1b[31mWarn [ ${data} ]: ${text}\x1b[0m`);
}
const a = new Base(12);
console.log(a.readTo("25338"));
console.log(new Base(16).readTo("FFFFFF"));
///
const data = 1234567890;
console.log("\n\n\n\n\n\n", data);
const base64data = new Base(64).readFrom(data);
console.log(base64data);
const base32from = new Base(64).conversion(base64data, new Base(32));
console.log(base32from);
console.log(new Base(64).readTo(new Base(32).conversion(base32from, new Base(64))));
