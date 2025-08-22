
export type TagResult = {
    label :string;
    color :string;
}


export function getReadableTag(style:string, length: number): TagResult{

    let label= "undetermined";
    let color = "#dbdbdafd"; 

    switch(style){
        case "readable":
            label = "easy to read";
            color = "#29ed40ff";
            break;
        case "readable-case":
        case "alphanum":
            label = "somewhat easy to read";
            color = "#95ED29";
            break;
        case "alpha-case": 
            label= "not that-easy to read";
            color = "#EDED29";
            break;
        case "complex":
            label = "hard to read";
            color = "#ED7429";
            break;
        default:
            label= "undetermined";
            color = "#dbdbdafd"
    }

    // if we get length bigger thatn 12 degrade a legibility level

    if(length>12){
        if(label === "easy to read") label = "somewhat easy to read";
        else if (label === "somewhat easy to read") label = "not-that-easy to read";
        else if (label === "not-that-easy to read") label = "hard to read";
 
    }

    return {label, color};

}

export function getSecureTag(style:string, length:number): TagResult{

    let label = "";
    let color = "";



    if(length>12){
        if(style=== "alphanum" || style === "alpha-case" || style === "complex"){
            label = "super secure";
            color = "#29ed40ff";
        }else{
            label = "secure";
            color = "#95ED29";
        }
    } else {
        if (style === "complex" || style === "alpha-case"){
            label = "somewhat-secure";
            color = "#EDED29";
        } else {
            label = "not-that-secure";
            color = "#ED7429";
        }
    }
    return {label, color};
}