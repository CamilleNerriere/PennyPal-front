import './SignIn.scss';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, FieldProps, ErrorMessage } from 'formik';
import { Input, Button } from 'antd';
import * as Yup from 'yup';
import { useAuth } from '../../Auth/AuthContext.tsx';
import { handleApiError } from '../../utils/handleApiError.ts';
import MessageApi from '../MessagesApi/MessageApi.ts';
import { logError } from '../../utils/logError.ts';

function SignIn({ messageApi }: { messageApi: any }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const initialValues = {
    Email: '',
    Password: '',
  };

  const validationSchema = Yup.object({
    Email: Yup.string().email('Email invalide').required('Mail requis'),
    Password: Yup.string().required('Mot de passe requis'),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      await login(values.Email, values.Password);
      navigate('/home');
    } catch (err) {
      const message = handleApiError(err);
      MessageApi(messageApi, message, 'error');
      logError('Login : ', err);
    }
  };
  return (
    <div className="SignIn">
      <h1 className="h1"> Connexion</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnBlur={true}
        validateOnChange={true}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="register__form">
            <div className="register__form__field">
              <label className="sr-only">Email</label>
              <Field name="Email">
                {({ field }: FieldProps<string>) => (
                  <Input {...field} placeholder={'Email'} />
                )}
              </Field>

              <ErrorMessage
                name="Email"
                component="div"
                className="register__form__field__error"
              />
            </div>

            <div className="register__form__field">
              <label className="sr-only">Mot de passe</label>
              <Field name="Password">
                {({ field }: FieldProps<string>) => (
                  <Input.Password {...field} placeholder={'Mot de passe'} />
                )}
              </Field>

              <ErrorMessage
                name="Password"
                component="div"
                className="register__form__field__error"
              />
            </div>

            <div>
              <Button
                className="button register__form__button"
                htmlType={'submit'}
                disabled={isSubmitting || !isValid || !dirty}
              >
                Connexion
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SignIn;
