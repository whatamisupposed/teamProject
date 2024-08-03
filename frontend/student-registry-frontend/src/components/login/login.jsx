import Form from './form';
import Signup from './signup';

function Login({ setActiveComponent }) {

  return (
    <>
      <div className="flex w-full h-screen">
        <div className="w-full flex items-center justify-center lg:w-1/2 bg-gray-100">
          <Form setActiveComponent={setActiveComponent} />
        </div>
        <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
          <div className="w-60 h-60 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg"></div>
        </div>
      </div>
    </>
  );
}

export default Login;
