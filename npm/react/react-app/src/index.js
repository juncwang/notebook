import React from "react";
import ReactDOM from 'react-dom'

import App from './components/app/app'

ReactDOM.render(<App />, document.getElementById('root'))

/**
 * import PubSub from 'pubsub-js' //引入
 * PubSub.subscribe('delete', function(msg, data){ }); //订阅
 * PubSub.publish('delete', data) //发布消息
 */