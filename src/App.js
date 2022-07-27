import { useState } from "react";
import storage from "./firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function App() {
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [blobHref, setBlobHref] = useState("");

  const onFileInputChange = (e) => {
    console.log(e.target.files[0].type);
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please choose an image to upload!");
      return;
    }

    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setPercent(percent);
      },
      (err) => console.log(err),
      async () => {
        const dlUrl = await getDownloadURL(uploadTask.snapshot.ref);
        setDownloadUrl(dlUrl);
      }
    );
  };

  /**
   *
   * @param {string} url
   * @returns {string} blobHref
   *
   * fetches a file then generates a new ObjectURl from the blob
   * sets the blobHref that can be used with an anchor tag with attribute download
   */
  const fetchFileAndReturnBlob = (url) => {
    if (!url) return;
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => setBlobHref(window.URL.createObjectURL(blob)))
      .then(() => console.log(blobHref));
  };

  return (
    <>
      <h1>Image Hub</h1>
      <input type="file" accept="image/*" onChange={onFileInputChange} />
      <button onClick={() => handleUpload(setPercent)}>Upload</button>
      <p>{percent} % done.</p>
      {downloadUrl && (
        <>
          <img src={downloadUrl} alt={file?.name} style={{ maxWidth: 400 }} />
          <a
            href={blobHref}
            download={`${file.name}.${file.type.split("/")[1]}`}>
            Download
          </a>
          <button onClick={() => fetchFileAndReturnBlob(downloadUrl)}>
            GetBlob
          </button>
        </>
      )}
    </>
  );
}

export default App;
