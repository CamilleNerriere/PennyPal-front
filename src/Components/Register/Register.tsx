import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, FieldProps, ErrorMessage } from 'formik';
import { Input, Button } from 'antd';
import * as Yup from 'yup';
import useAxiosAuth from '../../Auth/useAxiosAuth.ts';
import MessageApi from '../MessagesApi/MessageApi.ts';
import { logError } from '../../utils/logError.ts';
import { handleApiError } from '../../utils/handleApiError.ts';
import './Register.scss';

function Register({ messageApi }: { messageApi: any }) {
  const initialValues = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    firstname: Yup.string()
      .required('Prénom requis')
      .min(2, 'Le prénom doit avoir au moins 2 caractères'),
    lastname: Yup.string()
      .required('Nom requis')
      .min(2, 'Le nom doit avoir au moins 2 caractères'),
    email: Yup.string().email('Email invalide').required('Mail requis'),
    password: Yup.string()
      .required('Mot de passe requis')
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
    confirmPassword: Yup.string()
      .required('Confirmation de mot de passe requise')
      .oneOf([Yup.ref('password'), 'Mot de passe différent']),
  });

  const axiosAuth = useAxiosAuth();

  const navigate = useNavigate();

  const handleSubmit = (values: typeof initialValues) => {
    axiosAuth
      .post('/Auth/Register', values)
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        const message = handleApiError(err);
        MessageApi(messageApi, message, 'error');
        logError('Register : ', err);
      });
    console.log(values);
  };

  return (
    <div className="register">
      <h1 className="h1">Inscription</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnBlur={true}
        validateOnChange={true}
      >
        {({ isSubmitting, errors, touched, isValid, dirty }) => (
          <Form className="register__form">
            <div className="register__form__field">
              <label className="sr-only">Prénom</label>
              <Field name="firstname">
                {({ field }: FieldProps<string>) => (
                  <Input {...field} placeholder={'Prénom'} />
                )}
              </Field>

              {errors.firstname && touched.firstname ? (
                <div className="register__form__field__error">
                  {errors.firstname}
                </div>
              ) : null}
              <ErrorMessage name="firstname" />
            </div>

            <div className="register__form__field">
              <label className="sr-only">Nom</label>
              <Field name="lastname">
                {({ field }: FieldProps<string>) => (
                  <Input {...field} placeholder={'Nom'} />
                )}
              </Field>

              {errors.lastname && touched.lastname ? (
                <div className="register__form__field__error">
                  {errors.lastname}
                </div>
              ) : null}
              <ErrorMessage name="lastname" />
            </div>

            <div className="register__form__field">
              <label className="sr-only">email</label>
              <Field name="email">
                {({ field }: FieldProps<string>) => (
                  <Input {...field} placeholder={'email'} />
                )}
              </Field>

              {errors.email && touched.email ? (
                <div className="register__form__field__error">
                  {errors.email}
                </div>
              ) : null}
              <ErrorMessage name="email" />
            </div>

            <div className="register__form__field">
              <label className="sr-only">Mot de passe</label>
              <Field name="password">
                {({ field }: FieldProps<string>) => (
                  <Input.Password {...field} placeholder={'Mot de passe'} />
                )}
              </Field>

              {errors.password && touched.password ? (
                <div className="register__form__field__error">
                  {errors.password}
                </div>
              ) : null}
              <ErrorMessage name="password" />
            </div>

            <div className="register__form__field">
              <label className="sr-only">Confirmation du mot de passe</label>
              <Field name="confirmPassword">
                {({ field }: FieldProps<string>) => (
                  <Input.Password
                    {...field}
                    placeholder={'Confirmation du mot de passe'}
                    visibilityToggle
                  />
                )}
              </Field>

              {errors.confirmPassword && touched.confirmPassword ? (
                <div className="register__form__field__error">
                  {errors.confirmPassword}
                </div>
              ) : null}
              <ErrorMessage name="confirmPassword" />
            </div>

            <div>
              <Button
                className="button register__form__button"
                htmlType={'submit'}
                disabled={isSubmitting || !isValid || !dirty}
              >
                S'inscrire
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Register;
