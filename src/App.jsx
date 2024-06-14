import './App.css'
import Content from './components/Content'
import Signin from './components/Signin'
import {BrowserRouter,Routes,Route } from 'react-router-dom'

function App() {
  
  return(
    <BrowserRouter>
        <Routes>
{/*           added path to each component */}
          <Route path='/' Component={Signin}></Route>
          <Route path='/signin' Component={Content}></Route>
        </Routes>
    </BrowserRouter>
  )
}
export default App
