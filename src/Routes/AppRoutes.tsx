import { Navigate, Route, Routes } from 'react-router-dom';

import { Error404 } from './error404/Error404';

import { UserProfile } from 'components/UserProfile';
import { Home } from 'pages/Home';
import { ReturnComponentType } from 'types';

export const AppRoutes = (): ReturnComponentType => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/user/:userId" element={<UserProfile />} />
    <Route path="/404" element={<Error404 />} />
    <Route path="*" element={<Navigate to="/404" />} />
  </Routes>
);
