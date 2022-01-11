import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../Components";

const Landing = () => {
  return (
    <Wrapper>
      <main>
        <nav>
          <Logo />
        </nav>
        <div className="container page">
          {/*info*/}
          <div className="info">
            <h1>
              Job <span>Tracking</span>
              <p>Hello there this is a home page.</p>
            </h1>
            <button className="btn btn-hero">Login/Register</button>
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default Landing;
