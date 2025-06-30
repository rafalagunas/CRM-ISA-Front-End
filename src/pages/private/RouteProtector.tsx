
import { Route } from 'react-router-dom'
import NotFound from '../public/NotFound'
import { lazy } from 'react'

const RootPage = lazy(() => import('./RootPage'))


const RouteProtector = () => {
  return (
    <NotFound>
      <Route path='/*' element={<RootPage />} />
    </NotFound>
  )
}

export default RouteProtector
