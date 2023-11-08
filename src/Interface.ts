interface StorageReturn {
    key : String,
    Get : Function,
    Submit : Function,
    Lock : Function,
    UnLock : Function
}
interface SubscribeFunction { 
    key : String,
    (args : any ) : any
}
interface SubscribeObject { 
    key : String,
    fn : SubscribeFunction
}
