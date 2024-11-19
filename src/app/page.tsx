import { NavbarAuth } from "./components";
import { SidebarAuthentification } from './components'



export default async function Home() {

  return (
    <div>
      <NavbarAuth />
      <SidebarAuthentification />
    </div>
  );
}
