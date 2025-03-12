import { JwtPayload, jwtDecode } from 'jwt-decode';
import { UserData } from '../interfaces/UserData';

class AuthService {
  getProfile() {
    //Returns the decoded token and jwtDecode returns value
    return jwtDecode<UserData>(this.getToken());
  }

  loggedIn() {
    // Returns a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    //Returns a value that indicates if the token is expired
    try{
    const decoded = jwtDecode<JwtPayload>(token);
    if(decoded?.exp && decoded?.exp<Date.now() / 1000) {
      return true;
    }
  } catch (err) {
    return false;
  }
  }

  getToken(): string {
    // Returns the token to localStorage
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }

  login(idToken: string) {
    // Sets the token to localStorage and redirects to home page
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    // Removes the token from localStorag and redirects to login page
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
