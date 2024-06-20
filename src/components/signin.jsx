import {auth, provider} from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import Cookies from 'universal-cookie'
import { FcGoogle } from "react-icons/fc";

const cookies = new Cookies();

function SignIn(props) {
    const {setIsAuth} = props;

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            cookies.set('auth-token', result.user.refreshToken);
            setIsAuth(true);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='py-20 px-10 text-white flex flex-col justify-center border-2 rounded-xl border-slate-300 shadow-lg'>
            <h1 className='py-5 text-center text-3xl'>Chat App</h1>
            <div className='flex my-5'>
                <FcGoogle className='flex text-3xl self-center w-auto px-3' />
                <p className='flex my-3 text-center text-xl'>Sign In with Google to continue</p>
            </div>
            <div className='flex justify-center'>
            <button 
                className='p-3 my-3 border-2 border-slate-300 rounded-lg hover:bg-blue-700' 
                onClick={signInWithGoogle}
            >Sign In</button>
        </div>
        </div>
    )
}

export default SignIn
