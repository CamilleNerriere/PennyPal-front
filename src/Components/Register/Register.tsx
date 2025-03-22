import './Register.scss';
import { Formik, Form, Field, FieldProps, ErrorMessage } from 'formik';
import { Input, Button } from 'antd';
import * as Yup from 'yup';

function Register() {
  const initialValues = {
    Firstname: '',
    Lastname: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
  };

  const validationSchema = Yup.object({
    Firstname: Yup.string()
      .required('Prénom requis')
      .min(2, 'Le prénom doit avoir au moins 2 caractères'),
    Lastname: Yup.string()
      .required('Nom requis')
      .min(2, 'Le nom doit avoir au moins 2 caractères'),
    Email: Yup.string().email('Email invalide').required('Mail requis'),
    Password: Yup.string()
      .required('Mot de passe requis')
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
    ConfirmPassword: Yup.string()
      .required('Confirmation de mot de passe requise')
      .oneOf([Yup.ref('Password'), 'Mot de passe différent']),
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log(values);
  };

  return (
    <div className="register">
      <h1>Inscription</h1>
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
              <Field name="Firstname">
                {({ field }: FieldProps<string>) => (
                  <Input {...field} placeholder={'Prénom'} />
                )}
              </Field>

              {errors.Firstname && touched.Firstname ? (
                <div className="register__form__field__error">
                  {errors.Firstname}
                </div>
              ) : null}
              <ErrorMessage name="Firstname" />
            </div>

            <div className="register__form__field">
              <label className="sr-only">Nom</label>
              <Field name="Lastname">
                {({ field }: FieldProps<string>) => (
                  <Input {...field} placeholder={'Nom'} />
                )}
              </Field>

              {errors.Lastname && touched.Lastname ? (
                <div className="register__form__field__error">
                  {errors.Lastname}
                </div>
              ) : null}
              <ErrorMessage name="Lastname" />
            </div>

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

            <div className="register__form__field">
              <label className="sr-only">Confirmation du mot de passe</label>
              <Field name="ConfirmPassword">
                {({ field }: FieldProps<string>) => (
                  <Input.Password
                    {...field}
                    placeholder={'Confirmation du mot de passe'}
                    visibilityToggle
                  />
                )}
              </Field>

              {errors.ConfirmPassword && touched.ConfirmPassword ? (
                <div className="register__form__field__error">
                  {errors.ConfirmPassword}
                </div>
              ) : null}
              <ErrorMessage name="ConfirmPassword" />
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
