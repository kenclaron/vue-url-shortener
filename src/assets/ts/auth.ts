import { Buffer } from "buffer";

console.log(`[Info] [Auth] Loaded`);

/**
 * Log in and Sign up in API. With supported functions.
 */
export class Authentication {
  constructor() {
    this.usernameInput = document.getElementById(
      "username"
    ) as HTMLInputElement;
    this.passwordInput = document.getElementById(
      "password"
    ) as HTMLInputElement;
  }

  usernameInput: HTMLInputElement;
  passwordInput: HTMLInputElement;

  /**
   * Returns accessibility for next log in functions
   * @param username Public key (as login)
   * @param password Not encoded password (as normal string)
   * @returns `Object | {status, username, password}`
   */
  check(username: string, password: string): object {
    console.log(`[Info] [Auth/Check] Start Function`);

    const information = {
      status: true,
      username: true,
      password: true,
    };

    try {
      if (username.length < 6 && !/([A-Za-z])/.test(username)) {
        information.status = false;
        information.username = false;
      }
      if (password.length < 6) {
        information.status = false;
        information.password = false;
      }
    } catch (error) {
      console.log(error);
    }

    return information;
  }

  /**
   * Returns data (access_token & type) after log in API
   * @param username Public key (as login)
   * @param password Finally client-side encoded password
   * @returns `Promise<any>`
   */
  async login(username: string, password: string) {
    console.log(`[Info] [Auth/Login] Start Function`);

    const url = "http://79.143.31.216/login";
    const response = await fetch(url, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`,
    });

    if (response.ok) {
      const json = await response.json();

      this.saveToken(json.access_token);

      /* @dev-code This code only for dev-environment and repeatable login on service!
         Use only with encoded variables on production
      */
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      localStorage.setItem("time", Date.now().toString());
      /* @end-dev-code */

      return response.status;
    } else {
      console.log(
        `[Info] [Auth/Login] ${response.status} ${response
          .text()
          .then((value) => console.log(value))}`
      );

      return response.status;
    }

    return;
  }

  /**
   * Returns data (username) after sign up API
   * @param username Public key (as login)
   * @param password Finally client-side encoded password
   * @returns `Promise<any>`
   */
  async signup(username: string, password: string) {
    console.log(`[Info] [Auth/Signup] Start Function`);

    const url = `http://79.143.31.216/register?username=${username}&password=${password}`;
    const response = await fetch(url, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });

    if (response.ok) {
      const json = await response.json();

      console.log(`[Info] [Auth/Signup] ${response.status} ${json}`);

      return response.status;
    } else {
      console.log(
        `[Info] [Auth/Signup] ${response.status} ${response
          .text()
          .then((value) => console.log(value))}`
      );

      return response.status;
    }

    return;
  }

  /**
   * Save access_token in JS LocalStorage
   * @param token access_token from API
   * @returns `true`
   */
  saveToken(token: string): boolean {
    localStorage.setItem("access_token", token);

    return true;
  }

  /**
   * Encoding string with base64
   * @param str Normal string for encoding (ex. non-encoding password)
   * @returns Encoded `string` with base64
   */
  encode(str: string): string {
    return Buffer.from(str, "binary").toString("base64");
  }
}
