# rrvState
A typescript state management library 
## Examples
```
export const S = new Storage({

});

export const PlayList_State = new Action(S.NewConn({
    songs : [],
    total : 0,
    now : 0,
    playType : ""
},"PlayList"));
```