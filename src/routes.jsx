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
const Join = lazy(() => import('./pages/Join'));
const Login = lazy(() => import('./pages/Login'));
const MyProfile = lazy(() => import('./pages/MyProfile'));
const TrafficInfo = lazy(() => import('./pages/TrafficInfo'));
const WeathertInfo = lazy(() => import('./pages/WeatherInfo'));

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="join" element={<Join />} />
      <Route path="profile" element={<MyProfile />} />
      <Route path="traffic" element={<TrafficInfo />} />
      <Route path="weather" element={<WeathertInfo />} />
      <Route path="content" element={<Contents />}>
        <Route path="create" element={<ContentCreate />} />
        <Route path="edit" element={<ContentEdit />} />
      </Route>
    </Route>
  )
);

// const router = createHashRouter([
//   {
//     path: '/',
//     element: <RootLayout />,
//     children: [
//       { index: true, element: <Home /> },
//       {
//         path: 'content',
//         element: <Contents />,
//         children: [
//           { path: 'create', element: <ContentCreate /> },
//           { path: 'edit', element: <ContentEdit /> },
//         ],
//       },
//       { path: 'join', element: <Join /> },
//       { path: 'login', element: <Login /> },
//       { path: 'profile', element: <MyProfile /> },
//       { path: 'traffic', element: <TrafficInfo /> },
//       { path: 'weather', element: <WeathertInfo /> },
//     ],
//   },
// ]);

export default router;
