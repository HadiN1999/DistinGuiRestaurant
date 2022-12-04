import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/navbar';
import Admin from './pages/Admin/admin';
import Home from './pages/home/home';
import Login from './pages/login/login';

const App = () => {
  const [user, setUser] = useState(null)
  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('user')))
  },[])

  const [isHome,setIsHome] = useState(false)

  const navigateHome = () =>{
    setIsHome(!isHome)
  }
  
  const renderComponent = () => {

    if(user)
    {

      return <header>
        {
          user.role === 0 || isHome?
            <Home/>
            :
            <Admin/>
        }
      </header>

    }else return <header className="App-header"><Login setUser={setUser}/></header>

  }

  return (
    <div className="App">
        {user&&<Navbar user={user} setUser={setUser} navigateHome={navigateHome} isHome={isHome}/>}
      
        {renderComponent()}


    </div>
  );
}

export default App;
