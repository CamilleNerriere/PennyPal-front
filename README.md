# PennyPal – Frontend

This is the frontend interface for the PennyPal budget management application.  
It is built with React and communicates with the [PennyPal API](https://github.com/CamilleNerriere/PennyPalAPI).
You can also find the full application running through Docker [here](https://github.com/CamilleNerriere/PennyPal)


## Features

- User login and registration
- Expense tracking interface
- Category management
- Budget visualization

## Technologies

- **React/TypeScript**
- **React Router**
- **Ant Design**

## Setup

1. Clone the repository:
   ```bash
   git clone git@github.com:CamilleNerriere/PennyPal-front.git
   cd pennypal-front

2. Install dependencies: 
    ```bash
    npm install 
    ```
3. Configure the environment file: 
    ```bash
    cp .env.example .env 
    ```

    Then update the API URL in the .env file and configure demo mode. Demo mode disables registration and password change features. Use it for public deployments. Set it to false for full functionality in development.:

    ```
    VITE_API_URL=http://YourAPIUrl
    VITE_IS_DEMO=
    ```

4. Run the app:
    ```bash
    npm run dev
    ```
