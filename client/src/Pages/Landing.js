import Wrapper from "../assets/wrappers/LandingPage";
import{Link} from 'react-router-dom'
import  Logo  from "../Components/logo";

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
            </h1>
            <p>Hello there this is a home page.</p>
            <Link to='/register' className="btn btn-hero">
            Login/Register
            </Link>
           
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default Landing;
