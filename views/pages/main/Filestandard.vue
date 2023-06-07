<template>
  <div class="tab-container">
    <ul class="tab-list flex-end">
      <li v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === index }" @click="activeTab = index">
        {{ tab.title }}
      </li>
    </ul>

    <div class="tab-content" style="background-color: white;">
      <div class="flex m-b"></div>
      <div v-for="(tab, index) in tabs" :key="index" v-show="activeTab === index" class="name m-b">
        <div v-show="tab.content2">
          <modal :visible="modalVisible" @close="closeModal" >
            <div class="modal_body" style="background-color: white;">
              <h2 style="margin-bottom: 1rem">Success</h2>

              <button class="button" @click="closeModal">continue</button>
            </div>
          </modal>
          <div class="table-container">
            <table class="content2 m-b">
              <thead>
                <tr>
                  <th style="width: 50%">
                    <div class="header-text center-text" style="text-align: center; margin-left: 10%;"> 칼럼 원본명 <div
                        class="arrow-right" style="margin-right: 10%;"></div>
                    </div>
                  </th>
                  <th style="width: 50%">
                    <div class="header-text center-text" style="text-align: center; margin-left: 30%;">표준화 칼럼
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(column, index) in columns" :key="index">
                  <td>
                    <div class="flex-center">
                      <label class="input-file-button flex" :for="`input-${index}`" style="width: 180px; height: 35px; margin-right: 30px;">
                        {{ column.name }}
                      </label>
                      <div class="arrow-right" style=" margin-right: 30px;"></div>
                    </div>
                  </td>
                  <td style=" transform: translateX(30px);">
                    <div class="flex-center">
                      <label class="input-file-button flex" :for="`input-${index}`">
                        <input type="text" :id="`input-${index}`" :value="column.name" /><img class="img-s"
                          src="../../../resources/image/search.png" alt="" />
                      </label>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex-end"><button class="save-button" @click="showModal">저장</button></div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import Modal from "../../pages/main/Modal.vue";

export default {
  data() {
    return {
      modalVisible: false,
      activeTab: 0,
      showTypeSelect: false,
      fileNames: [],
      columns: [
      { name: "Column 1", type: "Number" },
        { name: "Column 2", type: "Number" },
        { name: "Column 3", type: "Number" },
        { name: "Column 4", type: "Number" },
        { name: "Column 5", type: "Number" },
        { name: "Column 6", type: "Number" },
      ], // Fill this array with your column data (name and type)
      tabs: [
        {
          title: "표준화",
          content2: "This is the content for Tab 2",
        },

      ],
    };
  },
  created() {
    // TODO: Fetch your columns data here and assign to 'columns'
  },
  components: {
    Modal: Modal,
  },
  methods: {
    showModal() {
      console.log("@@@");
      this.modalVisible = true;
    },
    closeModal() {
      console.log("###");
      this.modalVisible = false;
    },
  },
  watch: {},
  computed: {},
  mounted() {
    console.log("Main2 mounted");
  },
};
</script>
<style scoped>
.bd {
  padding: 1rem;
}

.content2>div {
  border: 1px solid #eee;
  padding: 1rem;
  min-height: 64rem;
}

.button {
  padding: 5px 30px;
  border: 1px solid #ff6600;
  background: #fff;
  border-radius: 4px;
  /* color: white; */
  cursor: pointer;
  font-size: 1.5rem;
  margin-top: 3rem;
}

.modal_body {
  text-align: center;
  width: 24rem;
}

label {
  width: fit-content;
}

.input-file-button {
  padding: 5px 10px;
  border: 1px solid #ae83e2;
  background: #fff;
  border-radius: 4px;
  /* color: white; */
  cursor: pointer;
  box-shadow: 2px 2px 0px 1px #f3f3f3;
}

.table-container {
  width: 90%;
  margin: auto;
  transform: translateX(20%);
}
.header-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}

.center-text {
  text-align: center;
}

.arrow-right {
  border: solid black;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}

.popup {
  position: absolute;
  background-color: white;
  border: 1px solid black;
}

h2 {
  color: #333;
  font-size: 20px;
}

h3 {
  font-size: 18px;
  color: #eee;
}

.save-button {
  padding: 5px 30px;
  border: 1px solid #997bc7;
  background: #fff;
  border-radius: 4px;
  font-size: 1.5rem;
  margin-top: 3rem;
  cursor: pointer;
  /* 추가적인 스타일을 여기에 추가할 수 있습니다 */
}

/* 페이지를 꽉 채우는 부모 요소 */
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  padding: 0;
}

/* 테이블 스타일 */
.content2 {
  border-collapse: separate;
  border-spacing: 0 20px;
}

/* 테이블 헤더 스타일 */
.content2 thead {
  background-color: white;
  text-align: center;

}

.content2 tbody td {
    padding-top: 10px;
    padding-bottom: 1px;
  }

  .save-button {
  padding: 5px 20px;
  border: 1px solid #997bc7;
  background: #fff;
  border-radius: 4px;
  font-size: 1.5rem;
  margin-top: 3rem;
  cursor: pointer;
  /* 추가적인 스타일을 여기에 추가할 수 있습니다 */
}
</style>
  