const { initializeApp } = require("@firebase/app");
const { getStorage, getDownloadURL, ref, uploadBytes } = require("@firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyAVDV7IwNFi8lTC77FgfDgr9bb7PkxqKU4",
  authDomain: "feminine-care-7bda8.firebaseapp.com",
  projectId: "feminine-care-7bda8",
  storageBucket: "feminine-care-7bda8.appspot.com",
  messagingSenderId: "141594171102",
  appId: "1:141594171102:web:f8d27f288049e5f76f144f",
  measurementId: "G-GGZB5D9RND",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


const uploadFiles= (async(files)=>{
  const downloadUrls = [];
  for (const file of files) {
    const uniqueFilename = `${file.originalname}-${Date.now()}`;
    const storageRef = ref(storage, `${uniqueFilename}`);
    await uploadBytes(storageRef, file.buffer);
    const downloadUrl = await getDownloadURL(storageRef);
    downloadUrls.push(downloadUrl);
  }

return downloadUrls;
})

const uploadSingleFile = (async(file)=>{
  const uniqueFilename = `${file.originalname}-${Date.now()}`;
  const storageRef = ref(storage, `${uniqueFilename}`);
  await uploadBytes(storageRef, file.buffer);
  const result= await getDownloadURL(storageRef);
  let downloadUrl=result;
  return downloadUrl
})

const uploadSingleFile2 = (async(file)=>{
  const uniqueFilename = `${file[0].originalname}-${Date.now()}`;
  const storageRef = ref(storage, `${uniqueFilename}`);
  await uploadBytes(storageRef, file[0].buffer);
  const result= await getDownloadURL(storageRef);
  let downloadUrl=result;
  return downloadUrl
})



module.exports = {uploadFiles,uploadSingleFile,uploadSingleFile2}
