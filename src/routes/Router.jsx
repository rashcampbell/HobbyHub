import { createBrowserRouter } from 'react-router-dom';
import HomeLayouts from '../Layout/HomeLayouts';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AuthLayout from '../Layout/AuthLayout';
import Terms from '../pages/Terms';
import SubscriptionServices from '../Components/SubscriptionServices';
import SubscriptionServiceDetails from '../Components/SubscriptionServiceDetails';
import ErrorPage from '../pages/ErrorPage';
import Profile from '../pages/Profile';
import CreateGroup from '../pages/CreateGroup';
import MyGroup from '../pages/MyGroup';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayouts />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <SubscriptionServices />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'services/:id',
        element: <SubscriptionServiceDetails />,
      },
      {
        path: 'create-group',
        element: <PrivateRoute element={<CreateGroup />} />,
      },
      {
        path: 'my-group',
        element: <MyGroup />,
      },
    ],
  },
  {
    path: '/terms',
    element: <Terms />,
  },
  {
    path: '/profile',
    element: <Profile/>,
    errorElement: <Profile/>,
  },
]);

export default router;