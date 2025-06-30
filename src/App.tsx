import { BrowserRouter as Router, Route } from 'react-router-dom';
import NotFound from './pages/public/NotFound';
import RouteProtector from './pages/private/RouteProtector';
import AuthGuard from './guards/auth.guard';
import './App.css'

function App() {

  return (

    <Router>
      <NotFound>
        {/* <Route path={PublicRoutes.LOGIN} element={<Login />} /> */}
        <Route element={<AuthGuard privateValidation={true} />}>
          <Route path={`/*`} element={<RouteProtector />} />
        </Route>
      </NotFound>
    </Router>


  )
}

export default App
