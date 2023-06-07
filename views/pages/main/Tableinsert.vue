<template>
  <div class="tab-container">
    <ul class="tab-list flex-end" >
      <li v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === index }"  @click="activeTab = index">
        {{ tab.title }}
      </li>
    </ul>

    <div class="tab-content" style="background-color: white;">
      <div class="flex m-b"></div>
      <div v-for="(tab, index) in tabs" :key="index" v-show="activeTab === index" class="name m-b">
        <div v-show="tab.content1">
          <modal :visible="modalVisible" @close="closeModal"  style="transform: translateX(-180px);">
            <div class="modal_body" style="background-color: white; width: 400px; height: 300px; ">
              <h2 style="margin-bottom: 1rem">Success</h2>
              <div>
                <label for="">원본명:</label>
                <p>{{ selectedFileName }}</p>
                <label  for="saved-name">저장명:</label>
                <p>{{ savedName }}</p>
              </div>
              <button class="button" @click="closeModal">ok</button>
            </div>
          </modal>

          <modal :visible="modalVisible2" @close="closeModal2">
            <div class="modal_body" style="background-color: white; width: 400px; height: 300px; ">
              <h2 style="margin-bottom: 1rem">Success</h2>
              <button class="button" @click="closeModal2">ok</button>
            </div>
          </modal>

          <div class="content">
            <h2 class="title">파일 넣기</h2>
            <div>
              <div class="m-b">
                <label class="input-file-button p-l-l" for="input-file">
                  파일 추가하기 :
                <input type="file" id="input-file" style="display: none" @change="handleFileChange" />
                <span>{{ selectedFileName }}</span>
              </label>
              </div>
              <div class="flex-center">
                <label class="input-file-button flex" for="input-search">
                  파일명 표준화 : <input type="text" id="input-search"  v-model="inputText" style="margin-left: 1rem" /> <img class="img-s"
                    src="../../../resources/image/search.png" alt="" />
                </label>
              </div>
            </div>
            <button style="margin-top: 5rem" class="save-button" @click="showModal">저장</button>
          </div>
        </div>
        <div v-show="tab.content2">
          <modal :visible="modalVisible" @close="closeModal2">
            <div class="modal_body"  style="background-color: white;">
              <h2 style="margin-bottom: 1rem">Success</h2>

              <button class="button" @click="closeModal2">continue</button>
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
          <div class="flex-end"><button @click="showModal">저장</button></div>
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
      inputText: '',
      savedName: '',
      selectedFileName: '',
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
          title: "파일넣기",
          content1: "This is the content for Tab 1",
        },
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
    handleFileChange(event) {
    const file = event.target.files[0];
    this.selectedFileName = file ? file.name : '';
  },
    showModal() {
      console.log("@@@");
      this.modalVisible = true;
    },
    closeModal() {
      console.log("###");
      this.modalVisible = false;
    },
    closeModal2() {
      console.log("###");
      this.modalVisible = false;
      this.$router.push('/Tablelist.page');
    },
  },
  watch: {
    inputText: function(newValue) {
        this.savedName = newValue;
      }
  },
  computed: {},
  mounted() {
    console.log("Main2 mounted");
  },
};
</script>

<style scoped>
.center-text {
  text-align: center;
}

td {
  padding: 30px;
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

.arrow-right {
  border: solid black;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}

.bd {
  padding: 1rem;
}

.content3 {
  padding: 0 2rem;
}

.content3 h2 {
  text-align: left;
}

.content2>div {
  /* 이 스타일은 메인 div 요소에 적용됩니다. */
  border: 1px solid #eee;
  padding: 1rem;
  min-height: 64rem;
}

.button {
  padding: 5px 30px;
  border: 1px solid #6600ff;
  background: #fff;
  border-radius: 4px;
  /* color: white; */
  cursor: pointer;
  font-size: 1.5rem;
  margin-top: 3rem;
}

.modal {
  left: 24%;
}

.modal_body {
  text-align: center;
  width: 24rem;
}

.p-l-l {
  padding: 7px 20.2rem 7px 10px !important;
}

.content input {
  width: inherit;
}

.content {
  min-height: 67rem;
}

label {
  width: fit-content;
}

.input-file-button {
  padding: 5px 10px;
  border: 1px solid #9c74d9;
  background: #fff;
  border-radius: 4px;
  /* color: white; */
  cursor: pointer;
  box-shadow: 2px 2px 0px 1px #f3f3f3;
}

h2 {
  color: #333;
  font-size: 20px;
}

h3 {
  font-size: 18px;
  color: #eee;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  padding: 0;
}

.popup {
  position: absolute;
  background-color: white;
  border: 1px solid black;
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
.save-button:hover {
  background: #997bc7;
  color: #fff;
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
