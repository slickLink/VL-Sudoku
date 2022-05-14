
import './App.css';
import Info from './components/Info';
import React from 'react'

class App extends React.Component {
  
  render(){
    const {min_type, max_type} = this.props;

    return (
      <div className='app'>
        <Info 
          minT={min_type}
          maxT={max_type}/>
      </div>
    )
  }
}

export default App;
