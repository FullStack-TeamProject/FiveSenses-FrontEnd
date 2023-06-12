<template>
  <div class="tab-container">
    <ul class="tab-list flex-end">
      <li v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === index }" @click="activeTab = index">
        {{ tab.title }}
      </li>
    </ul>

    <div class="tab-content">
      <div class="flex m-b"></div>
      <div v-for="(tab, index) in tabs" :key="index" v-show="activeTab === index" class="name m-b">
        <div v-show="tab.content1">
          <modal :visible="modalVisible" @close="closeModal">
            <div class="modal_body">
              <h2 style="margin-bottom: 1rem">Success</h2>
              <div>
                <label for="">원본명:</label>
                <p>{{ selectedFileName }}</p>
                <label for="saved-name">저장명:</label>
                <p>{{ savedName }}</p>
              </div>
              <button class="button" @click="closeModal">ok</button>
            </div>
          </modal>

          <modal :visible="modalVisible2" @close="closeModal2">
            <div class="modal_body">
              <h2 style="margin-bottom: 1rem">Success</h2>
              <button class="button" @click="closeModal2">ok</button>
            </div>
          </modal>

          <div class="content">
            <h2 class="title">파일 넣기</h2>
            <div>
              <h3 class="m-b">
                please upload your file Assist with standardization work
              </h3>
              <div class="m-b">
                <label class="input-file-button p-l-l" for="input-file">
                  파일 추가하기 :
                  <input type="file" id="input-file" style="display: none" @change="fileReadAPI" />
                  <span>{{ selectedFileName }}</span>
                </label>
              </div>
              <div class="flex-center">
                <label class="input-file-button flex" for="input-search">
                  파일명 표준화 : <input type="text" id="input-search" v-model="datasetName" style="margin-left: 1rem" /> <img
                    class="img-s" src="../../../resources/image/search.png" alt="" />
                </label>
              </div>
            </div>
            <button style="margin-top: 5rem" @click="showModal">저장</button>
          </div>
        </div>
        <div v-show="tab.content2">
          <modal :visible="modalVisible" @close="closeModal2">
            <div class="modal_body">
              <h2 style="margin-bottom: 1rem">Success</h2>

              <button class="button" @click="closeModal2">continue</button>
            </div>
          </modal>
          <div class="table-container">
            <table class="content2 m-b">
              <thead>
                <tr>
                  <th style="width: 40%">
                    <div class="header-text center-text"> 칼럼 원본명 <div class="arrow-right"></div>
                    </div>
                  </th>
                  <th style="width: 40%">
                    <div class="header-text center-text">표준화 칼럼 <div class="arrow-right"></div>
                    </div>
                  </th>
                  <th style="width: 20% ">
                    데이터 타입
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(column, index) in columns" :key="index">
                  <td>
                    <div class="flex-center">
                      <label class="input-file-button flex" :for="`input-${index}`" style="margin-left: 1rem">
                        {{ column.name }}
                      </label>
                    </div>
                  </td>
                  <td>
                    <div class="flex-center">
                      <label class="input-file-button flex" :for="`input-${index}`">
                        {{ column.name }}<input type="text" :id="`input-${index}`" style="margin-left: 1rem" /><img
                          class="img-s" src="../../../resources/image/search.png" alt="" />
                      </label>
                    </div>
                  </td>
                  <td>
                    <p class="bd" @click="showTypeSelect = !showTypeSelect">{{ column.type }}</p>
                    <div v-if="showTypeSelect" class="popup">
                      <select v-model="column.type">
                        <option>Number</option>
                        <option>String</option>
                      </select>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="file-data-list">
            <thead>
                <td v-for="(item, key, idx) in fileReadData['columnDatas']" :key="key">{{ item['originColumnName'] }}</td>
            </thead>
            <tbody>
                <tr v-for="(items, keys, idxs) in fileReadData['rowData']" :key="keys">
                    <td v-for="(item, key, idx) in fileReadData['rowData'][keys]" :key="key">{{ item }}</td>
                </tr>
            </tbody>
        </table>
          </div>
          <div class="flex-end"><button @click="datasetInsert">저장</button></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "../../pages/main/Modal.vue";
import axios from 'axios';

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
        { name: "Column 2", type: "Number" },
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
      // 선택한 파일 원본 정보
      fileSelectDefaultData: [],
      // 서버로 보낼 선택한 파일 데이터
      fileSelectData: {
        // 원본 파일 명
        fileName: null,
        // 원본 파일 확장자
        fileType: null,
      },

      // 읽은 파일 정보
      fileReadData: [],
      // 데이터셋 명
      datasetName: null,

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
      const vm = this;

      axios({
        url: '/dataset/datasetInsertOnly.json',
        method: 'post',
        headers: {
          'Content-Type': "application/json; charset=UTF-8",
        },
        data: {
          'fileOrigin': vm.fileSelectDefaultData[0]['name'], // 원본 파일 명
          'fileSaveName': vm.datasetName, // 저장시 파일 명 (현재는 임시로 테이블 명 사용)
          'fileSavedirection': null, // 원본 파일 저장 경로
          'fileSize': vm.fileSelectDefaultData[0]['size'], // 원본 파일 크기
          'fileType': vm.fileType, // 원본 파일 타입
          'tableName': vm.datasetName, // 테이블 명
          'columnDatas': vm.fileReadData['columnDatas'], // 컬럼 데이터
          'rowData': vm.fileReadData['rowData'] // row 데이터
        }
      }).then(function (response) {
        console.log("datasetInsert - response : ", response.data);
        let result = response.data;
        if (result > 0) {
          alert('데이터셋 등록에 성공하였습니다.');

          // 등록 성공 시 선택한 파일, 입력받은 테이블 명 등 모두 초기화
          vm.datasetName = null;
          vm.fileSelectDefaultData = [];
          vm.fileSelectData = {};

        } else {
          alert('데이터셋 등록에 실패하였습니다.');
        }
      }).catch(function (error) {
        console.log("datasetInsert - error : ", error);
        alert('데이터셋 등록 오류');
      });
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
    // 파일 데이터(xlsx) 읽기 API
    fileReadAPI: function () {
      const vm = this;
      this.fileSelectDefaultData = [];
      const file = event.target.files[0];
      this.selectedFileName = file ? file.name : '';

      console.log("document.getElementById('input-file').files : ", document.getElementById("input-file").files);

      const files = document.getElementById("input-file").files;
      this.fileSelectDefaultData = files;
      // 파일 명을 구분자로 구분
      let fileSplit = files[0]['name'].split('.', 2);
      // 원본 파일 이름
      this.fileName = fileSplit[0];
      // 원본 파일 타입
      this.fileType = fileSplit[1];

      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }

      //fetch post
      // fetch("http://165.229.169.112:8000/file/datasetFileRead.ajax", {
      fetch("http://165.229.169.139:8000/file/datasetFileRead.ajax", {
        method: "POST",
         headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }, 
        body: formData
      }).then((response) => response.json()).then((data) => {
        console.log('fileReadAPI response : ', data);

        // 선택한 파일명과 읽은 파일명이 같을 경우
        if (vm.fileName == data[`${this.fileName}`]['title']) {
          // 컬럼 데이터
          vm.fileReadData['columnDatas'] = data[`${this.fileName}`]['columnDatas'];
          // row 데이터
          vm.fileReadData['rowData'] = data[`${this.fileName}`]['rowData'];
        }
      }).catch((error) => {
        console.log('fileReadAPI error : ', error);
      });
    },
    datasetInsert: function () {
      const vm = this;
      const fileInput = this.$refs.fileInput;
      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append('file', file);

      axios({
        url: '/dataset/datasetInsert.json',
        method: 'post',
        headers: {
          'Content-Type': "application/json; charset=UTF-8",
        },
        data: {
          'fileOrigin': vm.fileSelectDefaultData[0]['name'], // 원본 파일 명
          'fileSaveName': vm.datasetName, // 저장시 파일 명 (현재는 임시로 테이블 명 사용)
          'fileSavedirection': null, // 원본 파일 저장 경로
          'fileSize': vm.fileSelectDefaultData[0]['size'], // 원본 파일 크기
          'fileType': vm.fileType, // 원본 파일 타입
          'tableName': vm.datasetName, // 테이블 명
          'columnDatas': vm.fileReadData['columnDatas'], // 컬럼 데이터
          'rowData': vm.fileReadData['rowData'] // row 데이터
        }
      }).then(function (response) {
        console.log("datasetInsert - response : ", response.data);
        let result = response.data;
        if (result > 0) {
          alert('데이터셋 등록에 성공하였습니다.');

          // 등록 성공 시 선택한 파일, 입력받은 테이블 명 등 모두 초기화
          vm.datasetName = null;
          vm.fileSelectDefaultData = [];
          vm.fileSelectData = {};

        } else {
          alert('데이터셋 등록에 실패하였습니다.');
        }
      }).catch(function (error) {
        console.log("datasetInsert - error : ", error);
        alert('데이터셋 등록 오류');
      });
    }
  },
  watch: {
    inputText: function (newValue) {
      this.savedName = newValue;
    }
  },
  computed: {},
  mounted() {
    console.log("Main2 mounted");
    this.fileReadAPI();
    this.datasetInsert();
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
  border: 1px solid #ff6600;
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
  border: 1px solid #ff6600;
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

.popup {
  position: absolute;
  background-color: white;
  border: 1px solid black;
}
</style>
