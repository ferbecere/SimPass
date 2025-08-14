type PswrdType = "readable" | "readCase" | "alphanum" | "alphaCase" | "complex";


interface AppState{
    pswrdType: PswrdType;
    pswrdLength: number;
    pswrdGenerated: string;
}

//initial state
const initialState: Readonly<AppState> = {
  pswrdType: "readable", // readble as default
  pswrdLength: 8,        
  pswrdGenerated: ""     // when landing/refreshing will activate a new one with the default state.
}as const; //lo hacemos inmutalbe. de ahí el read only y el cosnt.

// global state

let state: AppState = {...initialState}; //el estado mutable por el usuario

// type guard

function isPswrdType(v:string): v is PswrdType{
    return ["readable","readCase","alphanum","alphaCase","complex"].includes(v as PswrdType);
}


// sincro with DOM

function initStateFromDOM():void{
    const selected = document.querySelector<HTMLInputElement>('input[name="style"]:checked');
    if (selected && isPswrdType(selected.value)){
        state.pswrdType = selected.value;
    }
}


    const slider = document.getElementById('pswrd-length-slider') as HTMLInputElement | null;
    if(slider){
        const n = parseInt(slider.value,10);
        if(!Number.isNaN(n))state.pswrdLength = n;
    }


    // setting listeners

function setupListeners():void{

    const radios = document.querySelectorAll<HTMLInputElement>('input[name="style"]');
    radios.forEach(radio =>{
        radio.addEventListener("change",()=>{
            if(isPswrdType(radio.value)){
                state.pswrdType = radio.value;
                console.log("Password type updated: ", state.pswrdType);
            }
        });    
    });

    const slider = document.getElementById('pswrd-length-slider') as HTMLInputElement | null;
    if (slider){
        slider.addEventListener("input",() =>{
            const n = parseInt(slider.value,10);
            if(!Number.isNaN(n)){
                state.pswrdLength = n;
                console.log("Passwrod length updated:", state.pswrdLength );
            }
        });
    }
}    

console.log("Initial state:",initialState);
console.log("User state:",state);
console.log(isPswrdType);
console.log(initStateFromDOM);




initStateFromDOM();
setupListeners();