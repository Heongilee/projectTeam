import loginSaga from './loginSaga.js';
import socketSaga from './socketSaga.js';

import { all, fork } from 'redux-saga/effects';



function* rootSaga() {

    yield fork(socketSaga, 'update');
};
  
export default rootSaga;
