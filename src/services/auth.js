import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import { toast } from 'react-toastify';
import { auth, provider } from '../config/firebase.config';

const handleSignInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    return { result, credential };
  } catch (error) {
    // toast.error(error.message);
    throw error.message;
  }
};

export default handleSignInWithGoogle;

