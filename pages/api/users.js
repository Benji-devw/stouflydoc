import axios from 'axios';


export async function Register(payload) {
  // console.log(payload);
  await axios
  .post('http://localhost:8080/user/register', payload)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));
}