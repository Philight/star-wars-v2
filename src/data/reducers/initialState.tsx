export interface IState {
  pageData: {
    [key: string]: unknown;
  };
  formData: {
    [key: string]: unknown | unknown[];
  };
  formStage: 'landing' | 'signin' | 'signup' | 'recipients' | 'body' | 'pictures' | 'summary';
  tokens?: unknown;
  user: unknown;
  loading: unknown;
  error?: unknown;
}

export const initialState: IState = {
  pageData: {
    landing: {
      heading: 'Email Sender',
      subheading: 'Sign in to send emails',
      validations: null,
    },
    signin: {
      heading: 'Sign In',
      subheading: 'Log in with your email address',
      fields: {
        email: {
          label: 'Email',
          required: true,
          type: 'text',
        },
        password: {
          label: 'Password',
          required: true,
          type: 'password',
        },
      },
//      validations: signInSchema,
    },
    signup: {
      heading: 'Sign Up',
      subheading: 'Fill in your user credentials',
      fields: {
        name: {
          label: 'Name',
          required: true,
          type: 'text',
        },
        email: {
          label: 'Email',
          required: true,
          type: 'text',
        },
        password: {
          label: 'Password',
          required: true,
          type: 'password',
        },
        passwordConfirm: {
          label: 'Confirm Password',
          required: true,
          type: 'password',
        },
        photo: {
          label: 'Profile Photo',
          required: false,
          type: 'text',
        },
      },
//      validations: signUpSchema,
    },
    recipients: {
      heading: 'Recipients',
      subheading: 'Fill recipient email addresses',
      fields: {
      },
//      validations: recipientsSchema,
    },
    body: {
      heading: 'Body',
      subheading: 'Fill email text',
      fields: {
      },
//      validations: bodySchema,
    },
    attachments: {
      heading: 'Attachments',
      subheading: 'Add signature and pictures',
      fields: {
      },
    },
    summary: {
      heading: 'Summary',
      subheading: 'Email summary',
      fields: {
      },
    },
  },
  formData: {},
  formStage: 'landing',
  tokens: {},
  user: {},
  loading: false,
  error: undefined, 
};
