import { lazy } from 'react';
import {
  Route,
  createHashRouter,
  createRoutesFromElements,
} from 'react-router-dom';
const RootLayout = lazy(() => import('./layout/RootLayout'));
const Home = lazy(() => import('./pages/Home'));
const Contents = lazy(() => import('./pages/Contents'));
const ContentCreate = lazy(() => import('./pages/content/ContentCreate'));
const ContentEdit = lazy(() => import('./pages/content/ContentEdit'));
const ContentDetail = lazy(() => import('./pages/content/ContentDetail'));
const Join = lazy(() => import('./pages/Join'));
const Login = lazy(() => import('./pages/Login'));
const MyProfile = lazy(() => import('./pages/MyProfile'));
const TrafficInfo = lazy(() => import('./pages/TrafficInfo'));
const WeathertInfo = lazy(() => import('./pages/WeatherInfo'));

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} >
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="join" element={<Join />} />
      <Route path="profile" element={<MyProfile />} />
      <Route path="traffic" element={<TrafficInfo />} />
      <Route path="weather" element={<WeathertInfo />} />
      <Route path="content" element={<Contents />} />
      <Route path="content/create" element={<ContentCreate />} />
      <Route path="content/edit" element={<ContentEdit />} />
      <Route path="content/detail" element={<ContentDetail />} />
    </Route>
  )
);

export default router;
