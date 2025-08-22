import { type PswrdType , sendPswrd} from "./utils/pswrdLogic";
import { getReadableTag,getSecureTag } from "./utils/tags";



//type PswrdType = "readable" | "readCase" | "alphanum" | "alphaCase" | "complex";


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

// function initStateFromDOM():void{
//     const selected = document.querySelector<HTMLInputElement>('input[name="style"]:checked');
//     if (selected && isPswrdType(selected.value)){
//         state.pswrdType = selected.value;
//     }
// }

    function initStateFromDOM():void{

        const radio = document.querySelector<HTMLInputElement>(`input[name="style"][value="${state.pswrdType}"]`);
        if(radio) radio.checked = true;

        const selected = document.querySelector<HTMLInputElement>('input[name="style"]:checked');
        if (selected && isPswrdType(selected.value)){
            state.pswrdType = selected.value;
        }


    }


    // const slider = document.getElementById('pswrd-length-slider') as HTMLInputElement | null;
    // if(slider){
    //     const n = parseInt(slider.value,10);
    //     if(!Number.isNaN(n))state.pswrdLength = n;
    // }

function syncSliderWithState(): void{
    const slider = document.getElementById('pswrd-length-slider') as HTMLInputElement | null;
    const output = document.getElementById('pswrd-length-output') as HTMLInputElement | null;

    if(!slider || !output) return;

    slider.value = state.pswrdLength.toString();
    output.value = state.pswrdLength.toString();
 
    

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
                console.log("Password length updated:", state.pswrdLength );

                const output = document.getElementById('pswrd-length-output') as HTMLInputElement | null;
                if (output) output.value = n.toString();

                updatePswrd();
                updateTags();


            }
        });
    }
}    

// setting interaction areas

const pswrdArea = document.querySelector<HTMLDivElement>('.pswrd-area');
//generate new pssword
function updatePswrd(): void {
    if(!pswrdArea) return; 

    const newPswrd = sendPswrd(state.pswrdType, state.pswrdLength);
    state.pswrdGenerated = newPswrd;
    pswrdArea.textContent = newPswrd;
}


const generateBtn = document.querySelector<HTMLButtonElement>('.btn-new-pswrd');
generateBtn?.addEventListener('click', () => {
    updatePswrd();
    updateTags();
})


// tags readabilty and secure getters

function updateTags(): void{
    const readability = getReadableTag(state.pswrdType, state.pswrdLength);
    const security = getSecureTag(state.pswrdType, state.pswrdLength);

    const readabilityElem = document.getElementById("tag_readable");
    const securityElem = document.getElementById("tag_secure");


    if(readabilityElem){
        readabilityElem.textContent = readability.label;
        readabilityElem.style.backgroundColor = readability.color;
    }

    if (securityElem){
        securityElem.textContent = security.label;
        securityElem.style.backgroundColor = security.color;
    }
}


//refreshbutton

const refreshBtn = document.querySelector<HTMLButtonElement>('.btn-refresh');
refreshBtn?.addEventListener('click', updatePswrd);


// console.log("Initial state:",initialState);
// console.log("User state:",state);
// console.log(isPswrdType);
// console.log(initStateFromDOM);

// console.log(sendPswrd("readable", 10));
// console.log(sendPswrd("readCase", 8));
// console.log(sendPswrd("alphanum", 14));
// console.log(sendPswrd("alphaCase", 11));
// console.log(sendPswrd("complex", 20));
// console.log(sendPswrd("readable", 4));




initStateFromDOM();
syncSliderWithState();
updatePswrd();
updateTags();
setupListeners();
