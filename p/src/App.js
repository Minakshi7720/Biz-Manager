import logo from './logo.svg';
import react,{useState,useEffect} from 'react'
import './App.css';
import Login from './comp/login/Login'
import Project from './Project';

function App() {
  const [loginstat, setloginstat] = useState('')

  useEffect(() => {
    if(localStorage.getItem('isloggedin'))
   setloginstat(localStorage.getItem('isloggedin'))
   else
   localStorage.setItem('isloggedin','false')
  }, [loginstat])

  if(loginstat==='true')
  {
    var project=<Project loginstat={loginstat} setloginstat={setloginstat} />
  }
  else if(loginstat==='false')
  {
    var project=<Login loginstat={loginstat} setloginstat={setloginstat} />
  }

  return (
    <div className="App">
      {project}
      
      
    </div>
  );
}

export default App;
