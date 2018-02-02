import {proRes} from '../config/util';
import {browserHistory} from 'react-router';

export function getData(data) {
    return (dispatch) => {
        return getListInfo(dispatch, Object.assign({offset: 1, limit: 10}, data));
    }
}
//用户列表
async function getListInfo(dispatch, data) {
    try {
        var json = await proRes(
            {
                url: `user/userList?limit=`+data.limit+`&offset=`+data.offset,
                type: 'post',
                body: data});
        const list = [];
        if (json.code == 200) {
            const posts = json.object.page.rows;
            for (var i = 0; i < posts.length; i++) {
                    var userType = posts[i].userType;
                    var status = posts[i].status;
                    if(userType==1){
                        posts[i].userTypeValue = `游客`;
                    }else if(userType==2){
                        posts[i].userTypeValue = `验证客户`;
                    }else if(userType==3){
                        posts[i].userTypeValue = `付费会员`;
                    }
                list.push(posts[i]);
             }
        } else {
            alert(json.message)
        }
        dispatch({
            type: 'USERLIST', data: {
                list: list,
                total: json.object.page.total,
            }
        });
    } catch (e) {
        console.log(e);
    }
};

export function ApplyLists(data) {
    return (dispatch) => {
        return getApplyList(dispatch, Object.assign({offset: 1, limit: 10}, data));
    }
}
//申请会员列表
async function getApplyList(dispatch, data) {
    try {
        var json = await proRes({url: `user/userList?limit=`+data.limit+`&offset=`+data.offset, type: 'post', body: data});
        const list = [];
        if (json.code == 200) {
            const posts = json.object.page.rows; 
            for (var i = 0; i < posts.length; i++) {
                if(posts[i].status ==2 || posts[i].status ==3 ){
                    list.push(posts[i]);
                }
             }
        } else {
            alert(json.message)
        }
        dispatch({
            type: 'APPLIYLIST', data: {
                list: list,
                total: list.length,
            }
        });
    } catch (e) {
        console.log(e);
    }
};






//修改用户状态
export function updateSattus(id,type) {
    const data=JSON.stringify({
        id:id,
        status:type
    });
    var msg = "";
    if(type==0){
        msg = "你确定要将用户设置为正常状态";
    }else if(type==1){
        msg = "你确定要将用户设置为删除状态";
    }else if(type==2){
        msg = "你确定要将用户设置为冻结状态";
    }else if(type==3){
        msg = "你确定要将用户设置为禁言状态";
    }
    return async (dispatch) => {
        if (confirm(msg) == true) {
                try {
                    const json = await proRes({
                        url: `/user/updateSattus`,
                        type: 'post',
                        body: JSON.parse(data),
                    });
                    if (json.code ==200) {
                        return getListInfo(dispatch, Object.assign({offset: 0, limit: 10}));
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

/**
 * 修改用户类型
 */
export function updateUserType(id,type) {
    const data=JSON.stringify({
        id:id,
        status:type
    });
    var msg = "";
    if(type==1){
        msg = "你确定要拒绝用户申请";
    }else if(type==3){
        msg = "你确定要同意用户申请";
    }
    return async (dispatch) => {
        if (confirm(msg) == true) {
                try {
                    const json = await proRes({
                        url: `/user/updateUserType`,
                        type: 'post',
                        body: JSON.parse(data),
                    });
                    if (json.code ==200) {
                        return getApplyList(dispatch, Object.assign({offset: 0, limit: 10}));
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




export function editInfo(data) {
    return async (dispatch) => {
        var Data = {
            id:data.id,
            uid:data.uid,
            nickName:data.nickName,
            userAvatar :data.userAvatar,
            userSign:data.userSign,
            userMobile :data.userMobile,
            userType :data.userType,
            wcUserName :data.wcUserName,
            wcNickName :data.wcNickName,
            inviteUid :data.inviteUid,
            wcQrCode :data.wcQrCode,
            lastLoginTime :data.lastLoginTime,
            createdTime :data.createdTime,
            updateTime :data.updateTime,
            status:data.status,
            aliUserName :data.aliUserName,
            aliNickName :data.aliNickName,
            aliUserid :data.aliUserid,
            vipLevel :data.vipLevel,
            cyScoreCount :data.cyScoreCount,
            cyScoreBalance :data.cyScoreBalance,
            balance : data.balance,
            name :data.name,
            cid :data.cid,
            isRealName :data.isRealName,
            isRealName :data.isRealName
        };
        var path = {
            pathname:'/public/module1/UserEdit',
            state:Data,
        }
        browserHistory.push(path);
    }
}

export function addInfo(data) {
    return async (dispatch) => {
        var Data = {
            id:``,
            uid:``,
            nickName:``,
            userAvatar :``,
            userSign:``,
            userMobile :``,
            userType :``,
            wcUserName :``,
            wcNickName :``,
            inviteUid :``,
            wcQrCode :``,
            lastLoginTime :``,
            createdTime :``,
            updateTime :``,
            status:``,
            aliUserName :``,
            aliNickName :``,
            aliUserid :``,
            vipLevel :``,
            cyScoreCount :``,
            cyScoreBalance :``,
            balance : ``,
            name :``,
            cid :``,
            isRealName :``,
            isRealName :``
        };
        var path = {
            pathname:'/public/module1/UserEdit',
            state:Data,
        }
        browserHistory.push(path);
    }
}

//保存数据
export function saveInfo(data) {
    return async (dispatch) => {
        try {
            const json = await proRes({
                url: `/user/editOrUpdateUser` ,
                type: 'post',
                body: data
            });
            if (json.code ==200) {
                browserHistory.push({
                    pathname:'/public/module1/userList',
                })
            } else {
                alert(json.msg)
            }
            // return true;
        } catch (e) {
            console.log(e);
        }
    }
}

//审核信息页面
export function VerifyPage(id) {
    return async (dispatch) => {
        try {
            const json = await proRes({
                url: `/user/editOrUpdateUser` ,
                type: 'post',
                body: data
            });
            if (json.code ==200) {
                browserHistory.push({
                    pathname:'/public/module1/userList',
                })
            } else {
                alert(json.msg)
            }
            // return true;

            
        } catch (e) {
            console.log(e);
        }
    }
}
