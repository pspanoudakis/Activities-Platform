import {storage} from "./firebaseConfig"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


export const handleUpload = (file,successCallback) => {
    if (!file) {
        alert("Please upload an image first!");
    }

    const storageRef = ref(storage, `/files/${file.name}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
        "state_changed",
        null,
        (err) => console.log(err),
        () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                successCallback(url);
            });
        }
    );
};

