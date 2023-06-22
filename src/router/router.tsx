import { TeamOutlined, UserOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { RouteObject } from "react-router-dom";
import CreateSong from "../pages/createMusicOnline/CreateSong";
import LoginPage from "../pages/IntroScreen/IntroScreen";
// import AccountProfile from "../app-component/account-profile/AccountProfile";
// import CreateUser from "../app-component/users-manament/create-user/CreateUser";
// import ListUser from "../app-component/users-manament/list-user/ListUser";
// import MusicOnline from "@/app-component/music-online/MusicOnline";
// import MusicOffline from "@/app-component/music-offline/MusicOffline";

import DefaultLayout from "../pages/layout/DefaultLayout";
import MusicOnline from "../pages/music-online/ MusicOnline";
import Page404 from "../pages/result/Page404";
interface IRoute {
  path: string;
  title: string;
  icon?: any;
  children?: IRoute[];
  component?: any;
}
const navRoutes: IRoute[] = [
  {
    path: "music",
    title: "Music",
    // icon: ,
    children: [
      {
        path: "/music/online",
        title: "Nhạc Online",
        component: <MusicOnline />,
      },
      {
        path: "/music/online/create",
        title: "Thêm nhạc online",
        component: <CreateSong />,
      },
    ],
    // },
    // {
    //   path: "user",
    //   title: "Users",
    //   icon: <TeamOutlined />,
    //   children: [
    //     {
    //       path: "/user/create",
    //       title: "Create User",
    //       component: <CreateUser/>,
    //     },
    //     {
    //       path: "/user/list",
    //       title: "List Users",
    //       component: <ListUser />,
    //     },
    //   ],
    // },
    // {
    //   path: "account",
    //   title: "Account",
    //   icon: <UserOutlined />,
    //   children: [
    //     {
    //       path: "/account/profile",
    //       title: "Profile",
    //       component: <AccountProfile />,
    //     },
    //   ],
  },
  {
    path: "account",
    title: "Account",
    icon: <UserOutlined />,
    children: [
      {
        path: "/login",
        title: "Profile",
        component: <LoginPage />,
      },
    ],
  },
];
const getRoutes = function (rawRoutes: IRoute[]): RouteObject[] {
  const routes: RouteObject[] = [];
  for (let i = 0; i < rawRoutes.length; i++) {
    let rawRoute = rawRoutes[i];
    if (!rawRoute.children) {
      routes.push({
        path: rawRoute.path,
        element: rawRoute.component,
      });
    } else {
      routes.push(...getRoutes(rawRoute.children));
    }
  }
  return routes;
};
const navRouters = getRoutes(navRoutes);

const browserRouters: RouteObject[] = [
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: "Page not found",
  },
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <Page404 />,
    children: navRouters,
  },
];
type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

function GetMenu(routes: IRoute[]): MenuItem[] {
  const items: MenuItem[] = [];
  routes.map((route) => {
    if (!route.children) {
      items.push(getItem(route.title, route.path, route.icon));
    } else {
      const children = GetMenu(route.children);
      items.push(getItem(route.title, route.path, route.icon, children));
    }
  });
  return items;
}

export { navRoutes, GetMenu };
export type { IRoute };
export default browserRouters;
