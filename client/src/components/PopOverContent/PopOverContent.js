import React, { useCallback } from 'react';
import PerfectScrollbar from "react-perfect-scrollbar";
import useNotice from '../../hook/useNotice.js';
import InfiniteArea from '../InfiniteArea/InfiniteArea.js';
import { Link } from 'react-router-dom';

import "react-perfect-scrollbar/dist/css/styles.css";
import "./PopOverContent.css";

const noticeType = {reply:'답글', replyComment:'댓글', postComment:'댓글'};

function PopOverContent() { 

  const { NoticeState, currentPage, loadNoticeData } = useNotice();

  const { noticeData, loading } = NoticeState;

  const noticeList = useCallback(() => noticeData && 
            noticeData.map( (data, index) => {
            const type = data.type;
            return <div key={"notice"+index} className='notice_content'>
                    <Link to={`/posts/${data.postId}`}>
                      <p>{data.senderUsername.split('@')[0]+'님께서 '}
                          {localStorage.getItem('username').split('@')[0]+'님의 글에 '+ 
                            noticeType[type] + '을 다셨습니다'}.</p></Link>
                  </div>
             
        }), [noticeData, currentPage])



  return (
    <PerfectScrollbar style={{ maxHight: "350px" }}>
        <div>
          {
            noticeData && noticeList()
          }
          
        </div>

        {noticeData && 
                <InfiniteArea currentPage={currentPage} loadData={loadNoticeData}
                totalpage={noticeData.totalAmount} loading={loading}
                >
                </InfiniteArea>     
            } 

    </PerfectScrollbar>
  );
}

export default PopOverContent;