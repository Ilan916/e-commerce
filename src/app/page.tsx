import { NavbarAuth, SidebarAuthentification, NavbarClient, BannerHero, ServicesInfos, Footer, Newsletter, Testimonials, Tips, AIPromo } from "./components";

export default async function Home() {

  return (
    <div>
      <NavbarAuth />
      <SidebarAuthentification />
      <NavbarClient />
      <BannerHero />
      <ServicesInfos />
      <AIPromo />
      <Tips/>
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
}
