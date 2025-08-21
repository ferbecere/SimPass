export type PswrdType = "readable" | "readCase" | "alphanum" | "alphaCase" | "complex";

export function sendPswrd(type: PswrdType, length: number):string{


            switch(type){

            case "readable":
                return generatePswrd(length);
            
            case "readCase":
                return genPswrdReadCase(length);
            
            
            case "alphanum":
                return genPswrdAlphanum(length);
            

            case "alphaCase":
                return genPswrdAlphaCase(length);
            

            case "complex":
                return genPswrdComplex(length);
            

            default:
                return 'ERROR feedback generatePswrd function';
}
}

function generatePswrd(length:number):string {

    let password = "";
    let vowels = ["a","e","i","o","u"];
    let consonants = ["b","c","d","f","g","j","k","l","m","n","p","r","s","t","v","w","x","z",]; // we take out H, Q and Y to evade possible homophones. 

    //let syllable = vocal.random + consonant.random;

     for (let i = 0; i < length; i++) {
        const v = vowels[Math.floor(Math.random()* vowels.length)];
        const c = consonants[Math.floor(Math.random()*consonants.length)];

        password += Math.random()> 0.5 ? v + c : c + v;

    }
     return password.slice(0, length); // length indicated by generator-pswrd-length.

    
}


function genPswrdReadCase(length:number):string {
    //lo que quiero hacer aquí es que la cantidad de mayúsuclas sean aleatorias. si es posible

    let base = generatePswrd(length);
    let result = "";

    for (let char of base){
        result += Math.random()>0.5 ?char.toUpperCase() : char;
    }

    return result;

}

function genPswrdAlphanum (length: number): string {
    // lo que queiro hacer aqui es que estas y la conosnte en la posicion 7 del array de cnosnte se cambien por los numeros indicados.

    let base = generatePswrd(length);

    // subsittuion mapping.

    const map : {[key : string] : string} = {
        a: "4",
        e: "3",
        o: "0",
        u: "4",
        l: "1",
        s: "5",
    };

    let result = "";

    for (let char of base){
        if (map[char]&& Math.random()> 0.5){
            result += map[char];
        } else {
            result += char;
        }
    }
    
    return result.slice(0,length);
}
//HERE!!
function genPswrdAlphaCase(length:number): string{

    let base = genPswrdAlphanum(length);
    let result = "";


    for(let char of base){
        result += Math.random() > 0.5 ? char.toUpperCase() : char;

    }

    return result;

}

function genPswrdComplex(length: number): string{

    const chars= "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTVWXYZ0123456789!€@#_><^&%()[]{}";
    let result = "";

    for (let i = 0; i< length; i++) {
        result += chars[Math.floor(Math.random()*chars.length)];
    }

    return result; 


}