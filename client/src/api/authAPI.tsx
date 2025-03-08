import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify(userInfo),
    })

    const data = await response.json();
    if(!response.ok) {
      throw new Error('No user information available');
    }
return data;
  } catch (err) {
    console.error('Unable to login. Please try again');
  }
};

const signup = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/auth/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
body: JSON.stringify(userInfo),
    });

    const data = await response.json();
if (!response.ok) {
  throw new Error('Invalid user info');
}
return data;
  } catch (err) {
    console.error('Sign up invalid', err);
    return Promise.reject('Unable to create user. Please try again.');
  }
};

export { login };
