import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import Input from '../components/Input/Input';

const Auth = () => {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const [variant, setVariant] = useState('login');

const toggleVariant = useCallback(() => {
setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');

}, []);

const login = useCallback(async () => {
  try {
    await signIn('credentials', {
      email,
      password,
      callbackUrl: '/profiles'
    });
  } catch (error) {
    console.log(error);
  }
}, [email, password]);

const register = useCallback(async () => {
  try{
   await axios.post('/api/register',{
   email,
   name,
   password
   });
   
   login();
  } catch(error) {
    console.log(error);
  }
}, [email, name, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/background.avif')] bg-no-repeat bg-center- bg-fixed bg-cover">
      <div className='bg-black w-full h-full lg:bg-opacity-20'>
        <nav className='absolute px-16 py-12'>
          
          <img src="/images/logo.jpeg" alt="Logo" className='h-16'/>
        </nav>
        <div className='flex justify-center'>
          <div className='bg-black bg-opacity-30 px-16 py-16 self-center mt-24 lg:w-2/5 lg:max-w-md rounded-md w-full'>
            <h2 className='text-white text-4xl mb-8 font-semibold opacity-90'>
              {variant === 'login' ? 'Sign In' : 'Register'}
            </h2>
              <div className='flex flex-col gap-4'>  
            {variant === 'register' && (
            <Input
              label='Username'
              onChange={(event: any) => setName(event.target.value)}
              id='name'
              type='email'
              value={name}
            />
            )}
            
            <Input
              label='Email'
              onChange={(event: any) => setEmail(event.target.value)}
              id='email'
              type='email'
              value={email}
            />
            
            <Input
              label='Password'
              onChange={(event: any) => setPassword(event.target.value)}
              id='password'
              type='password'
              value={password}
            />
            
              </div>
             <button onClick={variant === 'login' ? login : register}  className='bg-yellow-600 py-3 text-white rounded-md w-full mt-10 hover:bg-green-600 color-yellow transition' >
                {variant === 'login' ? 'Login' : 'Sign Up'}
             </button>
                <div className='flex flex-row items-center gap-4 mt-8 justify-center'>
                    
                    <div 
                      onClick={() => signIn('google', { callbackUrl: '/profiles' })}
                      className='
                        w-10
                        h-10
                        bg-white
                        rounded-full
                        flex
                        items-center
                        justify-center
                        cursor-pointer
                        hover-opacity-80
                        transition
                        '
                     >
                     <FcGoogle size={30}/>
                    </div>  
                    
                    <div 
                      onClick={() => signIn('github', { callbackUrl: '/' })}
                      className='
                        w-10
                        h-10
                        bg-white
                        rounded-full
                        flex
                        items-center
                        justify-center
                        cursor-pointer
                        hover-opacity-80
                        transition
                        '
                     >
                     <FaGithub size={30}/>
                    </div>  
                    
                </div>
             <p className='text-neutral-500 mt-12'>
             {variant === 'login' ? 'First time using our site ?' : 'Already have an account ?'}
             
             <span onClick={toggleVariant} className='text-white ml-1 hover:underline cursor-pointer'>
             {variant === 'login' ? 'Create an account' : 'Login'}
             </span>
             
             </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Auth;


