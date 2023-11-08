export default class Storage {
    LockList: Array<String>;
    subscribers : Array<SubscribeObject>
    s: Record<string, any>;
    proxyObj: any;
    action: any;


    constructor(s : Object) {
        this.LockList = [];
        this.subscribers = [];
        if(typeof s == 'object'){
            this.s = s;
        }else{
            this.s = {};
            return;
        }
        this.proxyObj = new Proxy(this.s,{
            get(target: Record<string, any>, key: string) {
                const res: Record<string, any> = target[key];
                return res;
              },
            set(target,key,value){
                return Reflect.set(target,key,value);
            }
        })
    }

    NewConn = (obj: Record<string, any>, key: string) => {
        if(!this.Check(key)){
            let s = this.s;
            s[key] = obj;
            let Get = this.Get;
            let Submit = this.Submit;
            return {
                key,
                Get,
                Submit,
                Lock,
            };
        }
    }
    Submit = (key: string, value: any) => {
        let flag = this.LockList.indexOf(key);
        if(flag !== -1){
            this.proxyObj[key] = value;
            this.action = { [key] : value };
            return this.proxyObj[key];
        }
    }
    Get = (key:string) => {
        let r = JSON.parse(JSON.stringify(this.s[key]));
        return r;
    }
    Check = (key :string) => {
        try{
            let r = this.s[key];
            if(r === undefined){
                return false;
            }else{
                return true;
            }
        }catch(e){
            return false;
        }
    }
    Lock = (key : string) => {
        let index = this.LockList.indexOf(key);
        if(index === -1){
            this.LockList.push(key);
        }
    }
    Unlock = (key :string) => {
        let list = this.LockList
        let index = list.indexOf(key)
        if(index !== -1) list.splice(index,1)
        this.LockList = list 
    }
}