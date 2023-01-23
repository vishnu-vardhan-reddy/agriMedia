import handleSignInWithGoogle from '../services';

const loginWithGoogle = async () => {
  try {
    const result = await handleSignInWithGoogle();
    return result;
  } catch (error) {
    return error;
  }
};

export default loginWithGoogle;
