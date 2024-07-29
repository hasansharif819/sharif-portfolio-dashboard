import CreateProject from '../pages/admin/adminManagementCreate/CreateProject';
import Projects from "../pages/admin/adminManagementView/Projects";
import CreateSkill from "../pages/admin/adminManagementCreate/CreateSkill";
import Skills from "../pages/admin/adminManagementView/Skills";
import Experiences from "../pages/admin/adminManagementView/Experience";
import CreateExperience from "../pages/admin/adminManagementCreate/CreateExperience";
import Blogs from "../pages/admin/adminManagementView/Blogs";
import CreateBlog from "../pages/admin/adminManagementCreate/CreateBlog";
import CreateAdmin from "../pages/admin/adminManagementCreate/CreateAdmin";
import AdminLists from "../pages/admin/adminManagementView/adminLists";
import Contact from '../pages/admin/adminManagementView/Contact';

export const adminPaths = [
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
      {
        name: "Experiences",
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
