import { Layout, Menu } from "antd";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { useAppSelector } from "../../redux/hooks";
import {
  TUser,
  // selectCurrentUser,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { superAdminPaths } from "../../routes/superAdmin.route";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import { adminPaths } from "../../routes/admin.routes";

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  SUPERADMIN: "superAdmin",
};

const Sidebar = () => {
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token);
  }

  let sidebarItems;

  switch ((user as TUser)!.role) {
    case userRole.SUPERADMIN:
      sidebarItems = sidebarItemsGenerator(
        superAdminPaths,
        userRole.SUPERADMIN
      );
      break;

    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
    break;

    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
    >
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Sharif Hasan</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems as MenuItemType[]}
      />
    </Sider>
  );
};

export default Sidebar;
