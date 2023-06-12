<template>
  <div class="tab-container">
    <ul class="tab-list flex-end">
      <li v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === index }" @click="activeTab = index">
        {{ tab.title }}
      </li>
    </ul>
    <div class="tab-content" style="background-color: white;">
      <div class="flex m-b">
        <!-- <div>
          <p class="m-b-1">현재 등록된 데이터 수: 0개</p>
          <p>표준화가 완료된 데이터 수: 0개</p>
        </div> -->
        <div>
          <!-- <label class="input-file-button m-r" for="input-file"> -->
          <!-- <label class="input-file-button m-r" @click="navigatorToFileInsert">
            파일 추가하기
          </label> -->
          <input type="file" id="input-file" style="display: none" />
          <!-- <button class="input-file-button" @click="navigatorToDataList">데이터 조회</button>
          <button @click="clearLocalStorage">차트 전부 삭제</button> -->
        </div>
      </div>
      <div v-for="(tab, index) in tabs" :key="index" v-show="activeTab === index" class="name m-b">
        {{ tab.content }}
      </div>

      <div class="layout" style="
          width: 100%;
          height: 700px;
          overflow: auto;
          background-color: white;
        ">
        <!-- 모든 차트리스트 생성 -->
        <div>
          <table style="width: 100%; background-color: white; table-layout: fixed">
            <tbody style="background-color: white">
              <tr v-for="(row, rowIndex) in chartImagesChunked" :key="rowIndex">
                <td v-for="(imageData, subIndex) in row" :key="subIndex" style="padding: 10px">
                  <div style="
                      width: 100%;
                      height: 300px;
                      padding: 10px;
                      border: 1px solid blue;
                      border-radius: 10px;
                      background-color: white;
                    ">
                    <div v-if="rowIndex === 0 && subIndex === 0" style=" background-color: white; display: flex; flex-direction: column; justify-content: center; align-items: center; ">
                      <p style="margin-bottom: 30px;">현재 저장된 차트 수: {{ chartImagesCount }}</p>
                      <button class="clear-button" @click="clearLocalStorage">
                        차트 전부 삭제
                      </button>
                    </div>

                    <div v-else style="width: 100%; height: 100%; background-color: white">
                      <p>{{ imageData.key }}</p>
                      <img :src="imageData.image" alt="Chart Image" style="
                          width: 100%;
                          height: 90%;
                          padding: 10px;
                          border-radius: 10px;
                        " />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "../main/Modal.vue";
export default {
  data() {
    return {
      activeTab: 0,
      imageData: null,
      chartIds: [],
      chartImages: [],
      chartData: {}, // Object to store chart image data
      tabs: [
        {
          title: "Main",
          // content: "This is Main Page. Check All The Files.",
        },
      ],
    };
  },
  methods: {
    // 데이터 목록 조회로 이동하기
    navigatorToDataList() {
      this.$router.push("/Datalist.page");
    },
    // 파일추가로 이동하기
    navigatorToFileInsert() {
      this.$router.push("/Tableinsert.page");
    },
    // 저장된 차트 불러오기
    loadChartImage(chartId) {
      this.chartData[chartId] = localStorage.getItem("chart-" + chartId);

      if (!this.chartData[chartId]) {
        console.log(
          "No image data found in local storage for chart ID:",
          chartId
        );
      } else {
        console.log("Loaded image data for chart ID:", chartId);
      }
    },
    // 모든차트를 보이게 하기
    loadAllChartImages() {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("chart-")) {
          const imageData = localStorage.getItem(key);
          this.chartImages.push({ image: imageData, key: key });
          console.log("Loaded image data for key:", key);
        }
      }
    },

    //차트 전부 삭제
    clearLocalStorage() {
      localStorage.clear();
      this.chartIds = [];
      this.chartData = {};
      console.log("Local storage cleared.");
      // 페이지 새로고침
      location.reload();
    },
  },
  watch: {},
  computed: {
    chartImagesChunked() {
      let result = [];
      let temp = [...this.chartImages]; // 차트 이미지 복사본을 만듭니다.

      // 첫 번째 열에는 '안녕'과 '삭제' 버튼을 위한 더미 데이터를 삽입합니다.
      temp.unshift({ key: "안녕", image: null });

      for (let i = 0; i < temp.length; i += 4) {
        result.push(temp.slice(i, i + 4));
      }

      return result;
    },
    chartImagesCount() {
      return this.chartImages.length;
    },
  },
  mounted() {
    console.log("Main2 mounted");
    this.loadAllChartImages();
  },
};
</script>

<style scoped>
.input-file-button {
  padding: 5px 10px;
  border: 1px solid #25253d;
  background: #fff;
  border-radius: 4px;
  /* color: white; */
  cursor: pointer;
  box-shadow: 2px 2px 0px 1px #f3f3f3;
}

h2 {
  text-align: center;
  padding: 1rem;
  color: #171616;
}

p {
  font-size: 14px;
}

p::before {
  content: "";
  border-left: 13px solid #25253d;
  font-size: 1px;
  margin-right: 1rem;
}

.clear-button {
  padding: 8px 16px;
  background-color: #ffffff;
  color: rgb(133, 118, 197);
  border: 1px solid #25253d;
  border-radius: 2px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.clear-button:hover {
  background-color: #ffffff;
}
</style>
