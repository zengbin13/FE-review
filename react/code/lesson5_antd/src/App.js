import './App.less'

import React from 'react';
import Comment from '@/pages/Comment'
import TransitionDemo from '@/pages/TransitionDemo'


class App extends React.Component {

  render() {
    
    return (
      <>
        {/* <Comment></Comment> */}
        <TransitionDemo></TransitionDemo>
      </>
    );
  }
}


export default App;
