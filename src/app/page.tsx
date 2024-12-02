import { NavbarAuth, SidebarAuthentification, ProductDisplay } from "./components";

export default async function Home() {

  return (
    <div>
      <NavbarAuth />
      <SidebarAuthentification />
      <ProductDisplay />
    </div>
  );
}
