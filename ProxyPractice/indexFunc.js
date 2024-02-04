user = {
    name: "Eralp",
}

let name2 = Reflect.get(user, "name");

console.log(name2);

// -------------

function delay(f, ms){
    return function(){
        setTimeout(() => {f.apply(this, arguments)}, ms)
    }
}

function sayHi(user){
    console.log(`Hi there ${user}`);
}

sayHi = delay(sayHi, 3000);
sayHi("Eralp");

function delay2(f, ms){
    return new Proxy(f, {
        apply(target, thisArgs, args){
            setTimeout(() => {
                target.apply(thisArgs,args)
            }, 3000);
        }
    })
}

function sayHi2(user){
    console.log(`Hi there ${user}`);
}

sayHi2 = delay2(sayHi2, 3000); 
sayHi2("Eralp2");