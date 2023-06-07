<template>
  <div v-cloak>
    <!-- <Header></Header> -->
    <!-- <div class="navhead">
    </div> -->
    <!-- nav inner-->
    <div class="nav" v-bind:style="{ display: displayStyle }">
      <div><Menu></Menu></div>
    </div>
    <div :class="divClass">
      <router-view />
    </div>
  </div>
</template>

<script>
import Modal from "../pages/main/Modal.vue";
// import Header from "../layout/Header.vue";
import Menu from "../layout/Menu.vue";
import Footer from "../layout/Footer.vue";

const App = {
  data: () => {
    return {
      modalVisible: false,
      showDiv: false,
      displayStyle: "block",
      divClass: "mainwrap expand",
    };
  },
  methods: {
    showModal() {
      this.modalVisible = true;
    },
    closeModal() {
      this.modalVisible = false;
    },
    hide() {
      this.displayStyle = this.displayStyle === "none" ? "block" : "none";
      this.divClass =
        this.divClass === "mainwrap" ? "mainwrap expand" : "mainwrap";
    },
  },
  watch: {},
  computed: {},
  components: {
    // Header: Header,
    Menu: Menu,
    Footer: Footer,
    Modal: Modal,
  },
  mounted: () => {
    console.log("Vue mounted");
  },
};

export default App;
</script>

<style scoped>
[v-cloak] {
  display: none;
}

.mainwrap {
  padding: 1.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
}
.mainwrap.expand {
  width: calc(100% - 300px);
  margin-left: 150px;
  margin-top: 150px;
}
</style>
