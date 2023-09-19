import { lazy } from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import ProtectRoute from '@/components/ProtectRoute';
const RootLayout = lazy(() => import('@/layout/RootLayout'));
const Home = lazy(() => import('@/pages/Home'));
const Contents = lazy(() => import('@/pages/Contents'));
const ContentCreate = lazy(() => import('@/pages/content/ContentCreate'));
const ContentEdit = lazy(() => import('@/pages/content/ContentEdit'));
const ContentDetail = lazy(() => import('@/pages/content/ContentDetail'));
const Join = lazy(() => import('@/pages/Join'));
const Login = lazy(() => import('@/pages/Login'));
const FindId = lazy(() => import('@/pages/finduser/FindId'));
const FindPw = lazy(() => import('@/pages/finduser/FindPw'));
const PwEmail = lazy(() => import('@/components/join/PwEmail'));
const MyProfile = lazy(() => import('@/pages/MyProfile'));
const TrafficInfo = lazy(() => import('@/pages/TrafficInfo'));
const WeathertInfo = lazy(() => import('@/pages/WeatherInfo'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/">
        <Route path="login" element={<Login />} />
      </Route>
      <Route path="join" element={<Join />} />
      <Route path="findid" element={<FindId />} />
      <Route path="findpw" element={<FindPw />} />
      <Route path="pwemail" element={<PwEmail />} />
      <Route
        path="profile/:id"
        element={
          <ProtectRoute>
            <MyProfile />
          </ProtectRoute>
        }
      />
      <Route path="traffic" element={<TrafficInfo />} />
      <Route path="weather" element={<WeathertInfo />} />
      <Route path="content">
        <Route index element={<Contents />} />
        <Route path="list" element={<Contents />} />
        <Route
          path="create"
          element={
            <ProtectRoute>
              <ContentCreate />
            </ProtectRoute>
          }
        />
        <Route
          path="edit/:id"
          element={
            <ProtectRoute>
              <ContentEdit />
            </ProtectRoute>
          }
        />
        <Route path=":id" element={<ContentDetail />} />
      </Route>
    </Route>
  ),
  { basename: `/finalize-react-6/` }
);

export default router;
