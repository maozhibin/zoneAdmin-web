import {proRes} from '../config/util';
import {browserHistory} from 'react-router';

export function getData(data) {
    return (dispatch) => {
        return getListInfo(dispatch, Object.assign({pageNo: 1, pageSize: 10}, data));
    }
}
//帖子列表
async function getListInfo(dispatch, data) {
    try {
        var json = await proRes({url: `twitter/twitterList`, type: 'post', body: data});
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
                    posts[i].pushStatusValue=`已结发布`;
                }else if(posts[i].pushStatus==1){
                    posts[i].pushStatusValue=`隐藏`;
                }else if(posts[i].pushStatus==2){
                    posts[i].pushStatusValue=`草稿`;
                }else if(posts[i].pushStatus==3){
                    posts[i].pushStatusValue=`删除`;
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

