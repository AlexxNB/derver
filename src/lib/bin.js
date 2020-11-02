import params from './params.json';

export function retrieveParams(){
    const result = {
        dir:'.',
        params:{}
      }

    let cli = process.argv.slice(2);

    if(cli.length == 0) return result;
    if(!cli[cli.length-1].startsWith('-')) result.dir = cli.pop();
    
    for(let part of cli){
        const pair = part.split('=');

        const name = pair[0].replace(/^\-{1,2}/,'');
        const value = pair[1] || true;
        const exists = name in result.params;
       
        let param = params.params.find( e => e.name == name );
        if(!param) return false;

        if(param.multiple){
            if(!exists) result.params[name] = [];
            result.params[name].push(value);
        }else{
            if(exists) return false;
            result.params[name] = value;
        }
    }

    return result;
}

export function exit(code=0){
    process.exit(code);
}

export function getUsageText(){
    
return `${params.description}

Usage:
    ${params.name} ${params.usage}

Parameters:
${params.params.map(p => `  ${p.name.padEnd(15)} ${p.help}`).join('\n')}

Examples:
${params.examples.map(ex => `  ${params.name} ${ex}`).join('\n')}
`
}