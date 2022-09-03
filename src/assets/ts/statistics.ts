console.log(`[Info] [Stats] Loaded`);

export enum Order {
  none = "",
  asc_short = "asc_short",
  asc_target = "asc_target",
  asc_counter = "asc_counter",
  desc_short = "desc_short",
  desc_target = "desc_target",
  desc_counter = "desc_counter",
}

/**
 * Get statistics about shorty links through API
 */
export class Statistics {
  constructor() {}

  /**
   * Returns data with links from API
   * @param order Sorting settings in the Array<Order>
   * @param offset - Offset of receiving data
   * @param limit - Limit of receiving data
   * @returns `Promise<any>`
   */
  async get(order: Order[] = [Order.asc_short], offset = 0, limit = 0) {
    console.log(`[Info] [Stats/Get] Start Function`);

    let string_order = "";

    // string_order = "order={1}&order={2}&order={3}"
    for (let i = 0; i < order.length; i++) {
      if (i != 0) string_order += "&";
      string_order += "order=" + order[i];
    }

    const url = `http://79.143.31.216/statistics?${string_order}&offset=${offset}&limit=${limit}`;
    const response = await fetch(url, {
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        Accept: "application/json",
      },
    });

    if (response.ok) {
      const json = await response.json();

      console.log(`[Info] [Stats/Get] ${response.status}`);

      return json;
    } else {
      console.log(
        `[Info] [Stats/Get] ${response.status} ${response
          .text()
          .then((value) => console.log(value))}`
      );

      return response.status;
    }

    return;
  }
}
