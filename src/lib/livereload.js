export function lrServer(){

}

// Must be a calen function. Will be injected in browser client in <script> tag.
export function lrClient(){
    return (() => {

        console.log(window.EventSource);

    }).toString().replace(/^\(\)=>\{|\}$/g,''); 
};
