import Navbar from "../layout/Navbar";

function PageContainer({ children, onHowToPlay, showNavbar = true }) {
  return (
    <div className="mx-auto min-h-screen w-full px-5 sm:px-8 lg:px-12 2xl:px-16">
      {showNavbar && <Navbar onHowToPlay={onHowToPlay} />}
      {children}
    </div>
  );
}

export default PageContainer;
