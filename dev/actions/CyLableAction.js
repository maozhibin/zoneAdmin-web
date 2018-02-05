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
                url: `lable/lableList?limit=`+data.limit+`&offset=`+data.offset,
                type: 'post',
                body: ``
            });
        const list = [];
        if (json.code == 200) {
            const posts = json.object.page.rows;
            for (var i = 0; i < posts.length; i++) {
                list.push(posts[i]);
             }
        } else {
            alert(json.message)
        }
        dispatch({
            type: 'CYLABLEALL', data: {
                list: list,
                total: json.object.page.total,
            }
        });
    } catch (e) {
        console.log(e);
    }
};

//删除
export function deleteInfo(data) {
    var dataValue={
        id:data
    }
    return async (dispatch) => {
        var msg = "你确定要进行删除吗?";
        if (confirm(msg) == true) {
            try {
                const json = await proRes({
                    url: `/lable/delete` ,
                    type: 'post',
                    body: dataValue
                });
                if (json.code ==200) {
                    return getListInfo(dispatch, Object.assign({offset: 1, limit: 10}, data));
                } else {
                    alert(json.msg)
                }
                // return true;
            } catch (e) {
                console.log(e);
            }
        }else{
            return;
        }
       
    }
}

//保存数据
export function saveInfo(data) {
    return async (dispatch) => {
        try {
            const json = await proRes({
                url: `/lable/editOrUpdateLable` ,
                type: 'post',
                body: data
            });
            if (json.code ==200) {
                return getListInfo(dispatch, Object.assign({offset: 1, limit: 10}, data));
            } else {
                alert(json.msg)
            }
            // return true;
        } catch (e) {
            console.log(e);
        }
    }
}