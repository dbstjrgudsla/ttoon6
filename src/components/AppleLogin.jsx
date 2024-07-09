import { ReactComponent as Apple } from '../img/Apple.svg';

const AppleLogin = () => {
    const link = `https://ttoon.site/oauth2/authorization/apple`;
  
    const loginHandler = () => {
      window.location.href = link;
    };
  
    return (
      <button type='button' onClick={loginHandler} style = {{border:'none', padding:'0' , marginBottom:'3%'}}>
        <Apple />
      </button>
    );
  };

  export default AppleLogin;