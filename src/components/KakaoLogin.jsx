import { ReactComponent as Kakao} from '../img/Kakao.svg'

const KakaoLogin = () => {
    const link = `https://ttoon.site/oauth2/authorization/kakao`;
  
    const loginHandler = () => {
      window.location.href = link;
    };
  
    return (
      <button type='button' onClick={loginHandler} style = {{border:'none', padding:'0' , marginBottom:'3%'}}>
        <Kakao />
      </button>
    );
  };

  export default KakaoLogin;