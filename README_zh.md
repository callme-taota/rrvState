# rrvState
一个ts写的状态管理库，支持ts
## 示例
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