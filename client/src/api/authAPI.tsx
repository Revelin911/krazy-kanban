import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  //Makes a POST request to the login route
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userInfo),
    })

    const data = await response.json();
    if(!response.ok) {
      throw new Error('No user information available');
    }
return data;
  } catch (err) {
    console.error('Unable to login. Please try again');
    return Promise.reject('No available user login information');
  }
};

//Makes a POST request to the create new tickets
const newTicket = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/auth/createTicket', {
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
    console.error('Unable to create new ticket', err);
    return Promise.reject('Unable to create ne ticket. Please try again.');
  }
};

export { login, newTicket };
