import storage from '../config/firebase.config';
import {
  ref as storageReff,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';

function fileUpload(file, fileName) {
  const handleSubmit = async () => {
    if (!file) return;
    const storageRef = storageReff(storage, `files/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          return downloadURL;
        });
      }
    );
  };

  return handleSubmit();
}
export default fileUpload;
