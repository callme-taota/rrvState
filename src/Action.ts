export default class Action {
    subscribers: Array<SubscribeObject>;
    c: StorageReturn;
    key : String;
    action : any;
    
    constructor(c : StorageReturn){
        this.subscribers = [];
        this.c = c;
        let key = c.key;
        this.key = key;
    }

    Lock = () => {
        this.c.Lock(this.key)
    }

    UnLock = () => {
        this.c.UnLock(this.key)
    }

    get = () => {
        return this.c.Get(this.key);
    }

    set = <T>(value : T) => {
        let res = this.c.Submit(this.key,value);
        this.action = value;
        this.notifySubscribers();
        return res;
    }

    notifySubscribers = () => {
        this.subscribers.forEach(subscriber => {
            try {
                if(typeof subscriber.fn === 'function'){
                    subscriber.fn(this.action);
                }
            } catch (e) {
                console.error(e);
            }
        });
    }

    Subscribe = (fn : SubscribeFunction,key : String = "" ) => {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const randomText = characters[Math.floor(Math.random() * characters.length)] + characters[Math.floor(Math.random() * characters.length)] + characters[Math.floor(Math.random() * characters.length)] + characters[Math.floor(Math.random() * characters.length)];
        if(key === "" || key === undefined || key === null) key = "rrvS__" + new Date().getSeconds() + randomText ;
        fn.key = key;
        let obj = { fn , key };
        try{
            if(typeof fn === 'function'){
                this.subscribers.push(obj);
            }
        }catch(e){
            console.error(e);
        }
        return obj
    }

    UnSubscribe = (target : any) => {
        if(typeof target == "object"){
            let key = target.key
            this.deltObjFromArr(this.subscribers,key)
        }
        if(typeof target == "string"){
            this.deltObjFromArr(this.subscribers,target)
        }
        if(typeof target == "function"){
            this.deltObjFromArr(this.subscribers,target.key)
        }
    }

    deltObjFromArr = (list : Array<SubscribeObject>,TargetValue : String) => {
        for(let i = 0 ; i < list.length ; i++ ) {
            if(list[i].key == TargetValue) {
                list.splice(i, 1);
            }
            i -- ;
        }
        return list;
    }

}