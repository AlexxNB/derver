const color = (str,begin,end) => `\u001b[${begin}m${str}\u001b[${end}m`

export default {
    blue: str => color(str,34,39),
    red: str => color(str,31,39),
    green: str => color(str,32,39),
    yellow: str => color(str,33,39),
    magenta: str => color(str,35,39),
    cyan: str => color(str,36,39),
    gray: str => color(str,90,39),

    bold: str => color(str,1,22),
    italic: str => color(str,3,23),
}