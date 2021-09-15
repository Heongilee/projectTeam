import { fork, take, call, put, race, takeLatest } from 'redux-saga/effects';
import createSocketChannel from "./createSocketChannel";
import { SOCKET_URL } from '../config/confing.js';
import { START_CHANNEL , STOP_CHANNEL, 
          SOCKET_MESSAGE, NOTICE_COUNT, 
          SEND_MESSAGE, GET_MESSAGE,
        } from '../_actions/types';

import { notification } from 'antd';


const option ={
  message: '메세지옴',
  description: '하이',
  placement:'bottomRight',
};

const openNotification = (type) => {
  
  
  notification[type](option);
};


function * sendMessageSaga(ws) {
  
  while (true) {
    
    const { data } = yield take(SEND_MESSAGE);
    
    ws.send(
      JSON.stringify(data))
  }

};

function * initializeWebSocketsChannel() {
  
  console.log("going to connect to WS");

  const ws = new WebSocket(SOCKET_URL);
  const channel = yield call(createSocketChannel, ws);

  yield fork(sendMessageSaga, ws);

  while (true) {

      const { data } = yield take(channel);
      
      yield put({
        type: SOCKET_MESSAGE,
        key: 'message',
        data: data
      });
      
      yield put({ // push count
        type: NOTICE_COUNT,
      });

      yield call(openNotification,'open');
  }


};


function * socketSaga() {

  while (true) {
      // yield take(START_CHANNEL);
      yield call(initializeWebSocketsChannel)
      // yield race({
      //     task: call(initializeWebSocketsChannel),
      //     cancel: take(STOP_CHANNEL),
      // });

      // ws.close();
  }
};

export default socketSaga;

