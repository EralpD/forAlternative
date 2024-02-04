class User {
    #key = "12354";
    _name = "Eralp";
    key(){
        return this.#key;
    }
    trash = "leybahi"
}

let user = new User();

user = new Proxy(user, {
    get(target, prop, receiver){
        if(prop.startsWith("_")){
            throw new ReferenceError("Access denied!");
        }else{
         let value = Reflect.get(...arguments); // ...arguments tells us that (target, prop, receiver)
         return typeof value === "function"? value.bind(target) : value; // if there is a function, do this
        }},
    set(target, prop, value, receiver){
        if(prop.startsWith("_")){
            throw new ReferenceError("Access denied!");
        }
        else{
            target[prop] = value;
            return true;
        }
    },
    deleteProperty(target, prop){
         if(prop.startsWith("_")){
            throw new ReferenceError("Access denied!");
         }
         else{
            delete target[prop];
            return true;
         }
    },
    ownKeys(target){
        return Object.keys(target).filter(key => !key.startsWith("_"));
    }
})

console.log(Object.keys(user));
try{
    console.log(user._name);
}catch(e){console.error(e)}
console.log(user.trash);
console.log(user.key());
user.trash = "yuppi";
console.log(user.trash);
delete user.trash;
console.log(user.trash);
try{
    delete user._name;
}catch(e){
    console.error(e);
}
