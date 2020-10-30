import c from './colors';

export function table(){
    let width = 2;
    let lines = [];

    const t = {
        line: (text='',color1,color2)=>{
            const len = text.length;
            if(len+2 > width) width = len+2;

            if(color1) text = c[color1](text);
            if(color2) text = c[color2](text);

            lines.push([text,len]);
            return t;
        },
        print: (ident=0,color)=>{
            let margin = ' '.repeat(ident);

            let top = `${margin}╔${'═'.repeat(width)}╗`;
            let bottom = `${margin}╚${'═'.repeat(width)}╝`;
            let left = `${margin}║`;
            let right = `║`;

            if(color){
                top = c[color](top);
                bottom = c[color](bottom);
                left = c[color](left);
                right = c[color](right);
            }

            console.log(top);
            for(let line of lines){
                const l = Math.floor((width-line[1])/2);
                const r = width-line[1]-l;
                console.log(`${left}${' '.repeat(l)}${line[0]}${' '.repeat(r)}${right}`);
            }
            console.log(bottom);
            return t;
        }
    }
    
    return t;
}