<template>
  <div class="tab-container">
    <!-- Tab list -->
    <ul class="tab-list flex-end">
      <li v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === index }"
        @click="changeActiveTab(index)">
        {{ tab.title }}
      </li>
    </ul>

    <!-- Tab content -->
    <div class="tab-content" >
      <!-- Insert your additional content here -->
      <div class="flex m-b"></div>
      <div v-for="(tab, index) in tabs" :key="index" v-show="activeTab === index" class="name m-b">
        <div v-show="tab.content3" class="content3">
          <!-- ABC Table section -->
          <div class="flex title">
            <h2> {{ tab.title }}</h2>
            <!-- <button @click="navigatorToData">데이터 목록으로 이동</button> -->
            <!-- More content here -->
            <div>
              <button @click="loadAllCharts">Load All Charts</button>
              <div v-for="chartId in chartIds" :key="chartId">
                <img :src="getChartImage(chartId)" alt="Chart Image">
              </div>
            </div>
            <!-- <div>
              <img v-for="imageData in chartImages" :src="imageData" alt="Chart Image">
            </div> -->
            <div>
              <table style="width: 300px;">
                <tbody>
                  <tr v-for="(row, index) in chartImagesChunked" :key="index">
                    <td v-for="(imageData, subIndex) in row" :key="subIndex">
                      <img :src="imageData" alt="Chart Image" style="width: 95%;">
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button @click="clearLocalStorage">Clear Local Storage</button>
          </div>
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
      currentIndex: 0, // Index to keep track of the current button text
      showDiv: true,
      showDiv2: false,
      showDiv3: false,
      showDiv4: false,
      modalVisible: false,
      modalVisible2: false,
      imageData: null,
      chartIds: [],
      chartImages: [],
      chartData: {},  // Object to store chart image data
      activeTab: 0,
      tabs: [
        {
          title: "ABC22.Table",
          content3: "This is the content for Tab 3",
        },
      ],
    };
  },
  components: {
    Modal: Modal,
  },
  methods: {
    addNewLi() {
      const newItem = `Item ${this.listItems.length + 1}`;
      this.listItems.push(newItem);
    },
    show() {
      this.showDiv3 = !this.showDiv3;
    },
    changeButton() {
      this.currentIndex = (this.currentIndex + 1) % this.buttonTexts.length;
    },
    showModal() {
      console.log("@@@");
      this.modalVisible = true;
    },
    closeModal() {
      console.log("###");
      this.modalVisible = false;
    },
    showModal2() {
      console.log("@@@");
      this.modalVisible2 = true;
    },
    closeModal2() {
      console.log("###");
      this.modalVisible2 = false;
    },
    // 파일추가로 이동하기
    navigatorToFileInsert() {
      this.$router.push('/Tableinsert.page');
    },
    //칼럼 표준화로 이동하기
    columnStandard() {
      this.$router.push('/Filestandard.page');
    },
    navigatorToTablelist() {
      this.tab.content1 = true;
      this.$router.push('/Tablelist.page');

    },
    navigatorToBar() {
      this.$router.push('/Barchart.page/${id}');
    },
    navigatorToDoughnut() {
      this.$router.push('/Doughnutchart.page');
    },
    navigatorToLine() {
      this.$router.push('/Linechart.page');
    },
    navigatorToPie() {
      this.$router.push('/Piechart.page');
    },
    navigatorToPolararea() {
      this.$router.push('/Polarareachart.page');
    },
    navigatorToRadar() {
      this.$router.push('/Radarchart.page');
    },
    navigatorToBubble() {
      this.$router.push('/Bubblechart.page');
    },
    navigatorToData() {
      this.$router.push('/Tablelist.page');
    },
    loadAllCharts() {
      this.chartIds = Object.keys(localStorage)
        .filter(key => key.startsWith('chartImage-'))
        .map(key => key.substring(11))
        .filter(id => !!id);

      // Remove invalid or undefined chartIds from localStorage
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('chartImage-') && !this.chartIds.includes(key.substring(11))) {
          localStorage.removeItem(key);
        }
      });

      if (this.chartIds.length === 0) {
        console.log("No chart IDs found in local storage.");
      } else {
        console.log("Loaded all chart IDs:", this.chartIds);
      }
    },
    loadChartImage(chartId) {
      this.chartData[chartId] = localStorage.getItem('chartImage-' + chartId);

      if (!this.chartData[chartId]) {
        console.log("No image data found in local storage for chart ID:", chartId);
      } else {
        console.log("Loaded image data for chart ID:", chartId);
      }
    },
    getChartImage(chartId) {
      return this.chartData[chartId];
    },
    loadAllChartImages() {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('chartImage-')) {
          const imageData = localStorage.getItem(key);
          this.chartImages.push(imageData);
        }
      }
    },


    clearLocalStorage() {
      localStorage.clear();
      this.chartIds = [];
      this.chartData = {};
      console.log("Local storage cleared.");
    }

  },
  watch: {
  },
  computed: {
    buttonText() {
      return this.buttonTexts[this.currentIndex]; // Get the current button text based on the currentIndex
    },
    chartImagesChunked() {
      let result = [];
      for (let i = 0; i < this.chartImages.length; i += 2) {
        result.push(this.chartImages.slice(i, i + 2));
      }
      return result;
    }
  },
  mounted() {
    const id = this.$route.params.id;
    const data = this.$route.params.data;

    console.log("ID:", id);
    console.log("Data:", data);

    // Create a new tab object with the received id and data

    console.log("Main2 mounted");
    this.loadChartImage('myChartId');
    this.loadAllChartImages();
  },
};
</script>

<style scoped>
.chart {
  position: relative;
}

.changebox {
  position: absolute;
  display: inline-table;
  left: 13%;
  top: 37%;
  background: none;
}

.changebox button {
  width: max-content;
}

.layout2 {
  padding: 1rem;
  max-height: 410px;
  overflow: scroll;
  overflow-x: hidden;
}

.modal_body2 {
  width: 49rem !important;
}

.div4 {
  width: 30rem;
  height: 30rem;
}

button {
  padding: 2px 10px;
}

.select {
  background: #fff;
  margin-top: 1rem;
  min-height: 23rem;
  max-height: 23rem;
  overflow: scroll;
  overflow-x: hidden;
}

.box {
  padding: 1rem;
}

.content3 {
  position: relative;
}

.modulelist {
  position: absolute;
  background: #ffffff;
  width: -webkit-fill-available;
  height: 65rem;
  left: 0;
  top: 5rem;
  overflow: scroll;
  overflow-x: hidden;
}

.chartview {
  position: absolute;
  background: #ffffff;
  width: -webkit-fill-available;
  height: 69rem;
  left: 0;
  top: 0rem;
}

.moduleone {
  position: absolute;
  background: #ffffff;
  width: -webkit-fill-available;
  height: 70rem;
  left: 0;
  top: 0rem;
}

.modulelist>div {
  min-height: 30rem;
  border: 1px solid #eee;
}

table {
  max-height: 58rem;
  overflow: scroll;
  overflow-x: hidden;
}

thead tr:nth-child(2) {
  background: #f6f6f6;
}

table,
td,
th {
  border: 1px solid #eee;
  width: -webkit-fill-available;
}

th {
  font-size: 18px;
  padding: 0.5rem;
}

td {
  font-size: 14px;
}

.bd {
  min-height: 48rem;
  padding: 1rem;
}

.content3 {
  padding: 0 2rem;
}

.content3 h2 {
  text-align: left;
}

.content2>div {
  border: 1px solid #eee;
  padding: 1rem;
  min-height: 61rem;
}

.tab-content {
  min-height: 76rem;
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
  min-height: 76rem;
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
</style>
  