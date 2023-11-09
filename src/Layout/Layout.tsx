import { FC, ReactNode } from "react";
import SideBarrr from "./SideBar";
import Topbar from "./Topbar";

const Layout: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          width:"100%"  
        }}
      >
        <SideBarrr />
      <div style={{
        width:"100%"
      }}>
        <Topbar/>
      {children}
      </div>
      </div>
    </>
  );
};
export default Layout;
