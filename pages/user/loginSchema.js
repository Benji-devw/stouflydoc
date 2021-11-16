import * as Yup from 'yup'

export const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Champ requis').email(),
  password: Yup.string().required('Champ requis'),
});

 
