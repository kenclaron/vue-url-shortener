console.log(`[Info] [Squeeze] Loaded`);

/**
 * Squeezing links through API
 */
export class Squeeze {
  constructor() {
    this.squeezeInput = document.getElementById("squeeze") as HTMLInputElement;
  }

  squeezeInput: HTMLInputElement;

  /**
   * Checking string for correct URL Address
   * @param link URL Address for checking
   * @returns `true` for any URL or `false` for any String, but not URL
   */
  check(link: string): boolean {
    console.log(`[Info] [Squeeze/Check] Start Function`);

    let url;

    try {
      url = new URL(link);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }

  /**
   * Returns data with information about shorty link from API
   * @param link Correct URL Address
   * @returns `Promise<any>`
   */
  async squeeze(link: string) {
    console.log(`[Info] [Squeeze/Squeeze] Start Function`);

    const url = `http://79.143.31.216/squeeze?link=${link}`;
    const response = await fetch(url, {
      method: "post",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({ link: link }),
    });

    if (response.ok) {
      const json = await response.json();

      console.log(
        `[Info] [Auth/Squeeze] ${response.status} ${JSON.stringify(json)}`
      );

      return response.status;
    } else {
      console.log(
        `[Info] [Auth/Squeeze] ${response.status} ${response
          .text()
          .then((value) => console.log(value))}`
      );

      return response.status;
    }

    return;
  }
}
