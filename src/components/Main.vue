<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<!-- eslint-disable vue/require-v-for-key -->
<!-- This line needed for optimizing onload animation of elements -->
<template>
  <div id="service">
    <h1>URL Shortener Service</h1>
    <form id="squeeze-form">
      <input
        type="text"
        name="squeeze"
        id="squeeze"
        placeholder="Type link to squeeze"
      />
      <input type="submit" value="Squeeze now" />
      <select @change="changeLimit($event)">
        <option value="5">5</option>
        <option value="10" selected>10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option :value="data.length">All ({{ data.length }})</option>
      </select>
    </form>
    <table id="shortlinks" class="_thumbunload _unload">
      <thead>
        <tr>
          <th>
            <span>Short Link</span>
            <button
              id="mode-shortlink"
              class="mode-changer btn"
              @click="changeOrder($event)"
            >
              ▲
            </button>
          </th>
          <th>
            <span>Default Link</span>
            <button
              id="mode-defaultlink"
              class="mode-changer btn"
              @click="changeOrder($event)"
            >
              ☰
            </button>
          </th>
          <th>
            <span>Uses</span>
            <button
              id="mode-uses"
              class="mode-changer btn"
              @click="changeOrder($event)"
            >
              ☰
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in link_items">
          <td class="shortlinks-short-link" v-if="renderComponent">
            <div
              class="_tooltip"
              @click="copyURL(shorthost + item.short)"
              :data-tooltip="shorthost + item.short"
            >
              <span>{{ item.short }}</span>
            </div>
          </td>
          <td class="shortlinks-default-link" v-if="renderComponent">
            {{ item.target }}
          </td>
          <td class="shortlinks-uses" v-if="renderComponent">
            {{ item.counter }}
          </td>
        </tr>
        <tr v-if="link_items.length == 0">
          <td class="nothing-element" colspan="3">
            There seems to be nothing here... Squeeze your first link!
          </td>
        </tr>
      </tbody>
    </table>
    <div id="pagination" class="_thumbunload _unload">
      <button
        class="btn"
        @click="changePage((data.page - 1) * -1)"
        :class="{ hide: data.page == 1 }"
      >
        ◄◄
      </button>
      <button
        class="btn"
        @click="changePage(-1)"
        :class="{ hide: data.page == 1 }"
      >
        ◄
      </button>
      <span :class="{ hide: data.page >= maxPages && data.page == 1 }"
        >{{ data.page }} / {{ maxPages }}</span
      >
      <button
        class="btn"
        @click="changePage(1)"
        :class="{ hide: data.page >= maxPages }"
      >
        ►
      </button>
      <button
        class="btn"
        @click="changePage(maxPages - data.page)"
        :class="{ hide: data.page >= maxPages }"
      >
        ►►
      </button>
    </div>
    <p id="copied-text">Copied!</p>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Authentication } from "@/assets/ts/auth";
import { Squeeze } from "@/assets/ts/squeeze";
import { Statistics, Order } from "@/assets/ts/statistics";
require("@/assets/scss/main.scss");
require("@/assets/scss/animation.scss");

@Options({
  data() {
    return {
      shorthost: `http://79.143.31.216/s/`,
      renderComponent: true,
      link_items: [
        {
          id: 0,
          short: "short",
          target: "target",
          counter: 0,
        },
      ],
      data: {
        length: 0,
        page: 1,
        offset: 10,
        order: [],
      },
      shortlinksElement: document.getElementById("shortlinks"),
    };
  },
  mounted() {
    let statistics = new Statistics();

    this.$root.rename("URL Shortener");
    this.squeeze(new Squeeze());

    this.isEmptyToken(true);

    statistics.get().then((raw) => {
      if (raw === Number) return;

      this.data.length = raw.length;

      this.data.order = this.createOrder();

      this.changeData(
        statistics,
        this.createOrder(),
        (this.data.page - 1) * this.data.offset,
        this.data.offset
      );

      this.forceLogin(
        statistics,
        this.createOrder(),
        (this.data.page - 1) * this.data.offset,
        this.data.offset
      );
    });
  },
  methods: {
    squeeze(squeeze) {
      document
        .getElementById("squeeze-form")
        .addEventListener("submit", (e) => {
          e.preventDefault();

          let link = squeeze.squeezeInput.value;

          document.getElementById("squeeze")?.classList.remove("_unavailable");

          if (squeeze.check(link)) {
            let status = squeeze.squeeze(link);

            status.then((result) => {
              if (result == 200) {
                squeeze.squeezeInput.value = "";

                this.data.length += 1;

                this.changeData(
                  new Statistics(),
                  this.createOrder(),
                  (this.data.page - 1) * this.data.offset,
                  this.data.offset
                );
              } else if (result == 401) {
                this.$router.push("/");
              }
            });
          } else {
            document.getElementById("squeeze")?.classList.add("_unavailable");
          }

          return false;
        });
    },
    changeData(statistics, order = [Order.asc_short], offset = 0, limit = 0) {
      document.getElementById("shortlinks")?.classList.add("_unload");
      document.getElementById("pagination")?.classList.add("_unload");

      this.forceLogin(statistics, order, offset, limit);

      this.isEmptyToken(true);

      if (limit > this.data.length - offset) limit = this.data.length - offset;

      statistics.get(order, offset, limit).then((json) => {
        if (json === Number) return;

        this.link_items = [];

        for (let i = 0; i < json.length; i++) {
          this.link_items[i] = json[i];
        }

        document.getElementById("shortlinks")?.classList.remove("_unload");
        document.getElementById("pagination")?.classList.remove("_unload");

        this.unindexizeButtons();

        this.forceRerender();
      });
    },
    changePage(plus = 1) {
      this.data.page += plus;

      this.changeData(
        new Statistics(),
        this.data.order,
        (this.data.page - 1) * this.data.offset,
        this.data.offset
      );

      return;
    },
    createOrder() {
      let mode = {
        shortlink: null,
        defaultlink: null,
        uses: null,
      };

      try {
        mode.shortlink = document.getElementById("mode-shortlink").textContent;
        mode.defaultlink =
          document.getElementById("mode-defaultlink").textContent;
        mode.uses = document.getElementById("mode-uses").textContent;
      } catch (error) {
        return false;
      }

      if (!mode.shortlink && !mode.defaultlink && !mode.uses) {
        return false;
      }

      let result = [];

      if (mode.uses.includes("▲")) result.push(Order.asc_counter);
      else if (mode.uses.includes("▼")) result.push(Order.desc_counter);

      if (mode.defaultlink.includes("▲")) result.push(Order.asc_target);
      else if (mode.defaultlink.includes("▼")) result.push(Order.desc_target);

      if (mode.shortlink.includes("▲")) result.push(Order.asc_short);
      else if (mode.shortlink.includes("▼")) result.push(Order.desc_short);

      return result;
    },
    changeOrder(event) {
      if (event.target.textContent.includes("▲"))
        event.target.textContent = "▼";
      else if (event.target.textContent.includes("▼"))
        event.target.textContent = "☰";
      else event.target.textContent = "▲";

      this.data.order = this.createOrder();

      this.changeData(
        new Statistics(),
        this.data.order,
        (this.data.page - 1) * this.data.offset,
        this.data.offset
      );
    },
    changeLimit(event) {
      this.data.offset = event.target.value;

      this.data.page = 1;

      this.changeData(
        new Statistics(),
        this.createOrder(),
        (this.data.page - 1) * this.data.offset,
        this.data.offset
      );
    },
    unindexizeButtons() {
      let buttons = document.querySelectorAll("button");
      let hidden_elements = document.getElementsByClassName("hide");

      for (let element of buttons) {
        element.removeAttribute("tabIndex");
      }

      for (let element of hidden_elements) {
        element.setAttribute("tabIndex", "-1");
      }
    },
    isEmptyToken(strong = false) {
      let isEmpty = localStorage.getItem("access_token") == null;

      if (strong && isEmpty) {
        this.$router.push("/");
      }

      return isEmpty;
    },
    async copyURL(url) {
      try {
        await navigator.clipboard.writeText(url);
        document.getElementById("copied-text").style.animation =
          "AnimationCopiedElement 1s ease-in-out";
        setTimeout(() => {
          document.getElementById("copied-text").style.animation = "";
        }, 1000 * 1);
      } catch ($e) {
        alert("Cannot copy");
      }
    },
    forceLogin(statistics, order, offset, limit) {
      /* @dev-code This code only for dev-environment and repeatable login on service!
         Use only with encoded variables on production
      */
      if (Number(localStorage.getItem("time")) < Date.now() - 1000 * 60 * 60) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        localStorage.removeItem("time");

        this.$router.push("/");
      } else if (
        Number(localStorage.getItem("time")) <
        Date.now() - 1000 * 60 * 4
      ) {
        let status = new Authentication().login(
          localStorage.getItem("username"),
          localStorage.getItem("password")
        );
        status.then((result) => {
          if (result == 200) {
            localStorage.setItem("time", Date.now().toString());

            this.changeData(statistics, order, offset, limit);

            this.$router.go();

            return;
          }
        });
      }
      /* @end-dev-code */
    },
    forceRerender() {
      this.renderComponent = false;

      this.$nextTick(() => {
        this.renderComponent = true;
      });
    },
  },
  computed: {
    maxPages: function () {
      return Math.ceil(this.data.length / this.data.offset);
    },
  },
})
export default class Main extends Vue {}
</script>
