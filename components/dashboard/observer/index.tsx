import Footer from "./footer";
import ObserverHome from "./home";
import ObserverNav from "./nav";

export default function Observer(): React.ReactNode {
  return (
    <>
      <ObserverNav />
      <ObserverHome />
      <Footer/>
    </>
  );
}
