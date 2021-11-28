import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/";
// axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export default function uploadImage(file: { path: string; name: string }) {
  axios({
    method: "post",
    url: "upload",
    data: file,
  })
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}

uploadImage({
  path: "https://github.com/GigaHierz/blockchain-developer-bootcamp-final-project/blob/main/client/src/assets/octopus.svg",
  name: "image",
});
