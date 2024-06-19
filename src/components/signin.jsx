import {auth, provider} from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import Cookies from 'universal-cookie'

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
        <div className='p-5 flex flex-col justify-center border border-slate-900'>
            <h1 className='text-center text-xl'>Firebase Chat App</h1>
            <p className='my-3 text-center text-xl'>Sign In with Google to continue</p>
            <div className='flex justify-center'>
            <button 
                className='p-3 my-3 border border-slate-900 rounded-lg hover:bg-slate-900 hover:text-white' 
                onClick={signInWithGoogle}
            >Sign In</button>
        </div>
        </div>
    )
}

export default SignIn
