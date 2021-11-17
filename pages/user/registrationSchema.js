import * as Yup from 'yup'

export const RegistrationSchema = Yup.object().shape({
  name: Yup.string().required('Champ requis'),
  email: Yup.string().required('Champ requis').email(),
  password: Yup.string().required('Champ requis').min(2, '6 caractère minimum'),
  confirm: Yup.string().required('Confirmation requise').oneOf([Yup.ref('password'), null], 'Password different' ),
  // createdOn: Yup.date().default(function () {
  //   return new Date();
  // }),
});

 
