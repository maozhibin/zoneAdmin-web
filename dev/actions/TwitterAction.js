import {proRes} from '../config/util';
import {browserHistory} from 'react-router';

export function getData(data) {
    return (dispatch) => {
        return getListInfo(dispatch, Object.assign({offset: 1, limit: 10}, data));
    }
}
//帖子列表
async function getListInfo(dispatch, data) {
    try {
        var json = await proRes({url: `twitter/twitterList?limit=`+data.limit+`&offset=`+data.offset,type: 'post', body: data});
        const list = [];
        if (json.code == 200) {
            const posts = json.object.page.rows;
            for (var i = 0; i < posts.length; i++) {
                if(posts[i].twitterType==`default`){
                    posts[i].twitterTypeName=`普通贴`;
                }else if(posts.twitterType==`joint-work `){
                    posts[i].twitterTypeName=`协作帖`;
                }else if(posts[i].twitterType==`activity`){
                    posts[i].twitterTypeName=`活动贴`;
                }else if(posts[i].twitterType==`vote`){
                    posts[i].twitterTypeName=`投票贴`;
                }
                if(posts[i].pushStatus==0){
                    posts[i].pushStatusValue=`已经发布`;
                }else if(posts[i].pushStatus==1){
                    posts[i].pushStatusValue=`审核中`;
                }else if(posts[i].pushStatus==2){
                    posts[i].pushStatusValue=`审核未通过`;
                }else if(posts[i].pushStatus==-1){
                    posts[i].pushStatusValue=`隐藏`;
                }
                list.push(posts[i]);
             }
        } else {
            alert(json.message)
        }
        dispatch({
            type: 'TWITTERLIST', data: {
                list: list,
                total: json.object.page.total,
            }
        });
    } catch (e) {
        console.log(e);
    }
};
//修改审核状态
export function updatePushStatus(id,pushStatus,type) {
    var data={
        id:id,
        pushStatus:pushStatus
    };

    var dataValue={}

    if(type == "default"){
        dataValue={
            twitterType:'default'
        }
    }else{
        dataValue={
            twitterType:'activity'
        }
    }

    return async (dispatch) => {
        var msg = "你确定要修改？";
        if (confirm(msg) == true) {
            try {
                const json = await proRes({
                    url: `/twitter/updatePushStatus` ,
                    type: 'post',
                    body: data
                });
                if (json.code ==200) {
                    return getListInfo(dispatch, Object.assign({offset: 1, limit: 10}, dataValue));
                } else {
                    alert(json.msg)
                }
            } catch (e) {
                console.log(e);
            }
        }else{
            return;
        }
    }
}
//删除
export function deleteInfo(id,type) {
     var dataValue={};

    if(type == "default"){
        dataValue={
            twitterType:'default'
        }
    }else{
        dataValue={
            twitterType:'activity'
        }
    }
    return async (dispatch) => {
        var msg = "你确定要删除吗?";
        if (confirm(msg) == true) {
            try {
                const json = await proRes({
                    url: `/twitter/delete?id=`+id,
                    type: 'post',
                    body:``
                });
                if (json.code ==200) {
                    return getListInfo(dispatch, Object.assign({offset: 1, limit: 10}, dataValue));
                } else {
                    alert(json.msg)
                }
            } catch (e) {
                console.log(e);
            }
        }else{
            return;
        }
    }
}

