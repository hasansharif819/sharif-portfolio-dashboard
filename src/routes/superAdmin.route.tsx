import CreateAdmin from "../pages/admin/adminManagementCreate/CreateAdmin";
import CreateBlog from "../pages/admin/adminManagementCreate/CreateBlog";
import CreateExperience from "../pages/admin/adminManagementCreate/CreateExperience";
import CreateProject from "../pages/admin/adminManagementCreate/CreateProject";
import CreateSkill from "../pages/admin/adminManagementCreate/CreateSkill";
import AdminLists from "../pages/admin/adminManagementView/adminLists";
import Blogs from "../pages/admin/adminManagementView/Blogs";
import Contact from "../pages/admin/adminManagementView/Contact";
import Experiences from "../pages/admin/adminManagementView/Experience";
import Projects from "../pages/admin/adminManagementView/Projects";
import Skills from "../pages/admin/adminManagementView/Skills";

export const superAdminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <Projects />,
  },
  {
    name: "Admin Management",
    children: [

      {
        name: "Projects",
        path: "projects",
        element: <Projects />,
      },
      {
        name: "Create Project",
        path: "create-project",
        element: <CreateProject />,
      },
      {
        name: "Contacts",
        path: "contacts",
        element: <Contact />,
      },
      {
        name: "Skills",
        path: "skills",
        element: <Skills />,
      },
      {
        name: "Create Skill",
        path: "create-skill",
        element: <CreateSkill />,
      },
      
      // {
      //   path: "product/:productId",
      //   element: <ProductDetails />,
      // },
      {
        name: "Experience",
        path: "experiences",
        element: <Experiences />,
      },
      {
        name: "Create Experience",
        path: "create-experience",
        element: <CreateExperience />,
      },
      {
        name: "Blogs",
        path: "blogs",
        element: <Blogs />,
      },
      {
        name: "Create Blog",
        path: "create-blog",
        element: <CreateBlog />,
      },
      {
        name: "Admin",
        path: "admin-list",
        element: <AdminLists />,
      },
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
    ],
  },
];
