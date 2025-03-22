import './SignIn.scss';
import { Formik, Form, Field, FieldProps, ErrorMessage } from 'formik';
import { Input, Button } from 'antd';
import * as Yup from 'yup';

function SignIn() {
  const initialValues = {
    Email: '',
    Password: '',
  };

  const validationSchema = Yup.object({
    Email: Yup.string().email('Email invalide').required('Mail requis'),
    Password: Yup.string().required('Mot de passe requis'),
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log(values);
  };
  return (
    <div className="SignIn">
      <h1> Connexion</h1>
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
              <label className="sr-only">Email</label>
              <Field name="Email">
                {({ field }: FieldProps<string>) => (
                  <Input {...field} placeholder={'Email'} />
                )}
              </Field>

              {errors.Email && touched.Email ? (
                <div className="register__form__field__error">
                  {errors.Email}
                </div>
              ) : null}
              <ErrorMessage name="Email" />
            </div>

            <div className="register__form__field">
              <label className="sr-only">Mot de passe</label>
              <Field name="Password">
                {({ field }: FieldProps<string>) => (
                  <Input.Password {...field} placeholder={'Mot de passe'} />
                )}
              </Field>

              {errors.Password && touched.Password ? (
                <div className="register__form__field__error">
                  {errors.Password}
                </div>
              ) : null}
              <ErrorMessage name="Password" />
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
