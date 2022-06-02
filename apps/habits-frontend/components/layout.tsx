import { ExclamationIcon } from "@heroicons/react/solid";
import NavBar from "./nav-bar";

interface ILayout {
  title: string;
  children: React.ReactNode;
  user?: any;
}

const Layout = ({ title, children, user }: ILayout) => {
  return (
    <div className="min-h-full">
      <NavBar user={user} />

      <div className="">{children}</div>
    </div>
  );
};

export default Layout;
