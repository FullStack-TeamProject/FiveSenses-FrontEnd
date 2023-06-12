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
        <div v-show="tab.content3" class="content3">
          <div class="flex title">
            <h2>Bubble Chart</h2>
          </div>
          <div class="flex content2 m-b">
            <div style="width: 50%; height: 50%;">
              <canvas ref="bubbleChart" width="100%" height="100%"></canvas>
            </div>
          </div>
          <button class="btn" @click="saveChartAsImage">저장하기</button>
          <button class="btn" @click="downloadChart">차트 출력</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject } from 'vue';
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)
// 전역 변수로 chartId를 선언합니다.
let chartId = 1;

export default {
  name: 'bubblechart',
  data() {
    return {
      activeTab: 0,
      tabs: [
        {
          title: "ABC.Table",
          content3: "This is the content for Tab 3",
        },
      ],
      id: null,
      column: null,
      chartData: null,
      chartId: 0,
      columnStatus: {},
      options: {
        animation: {
          easing: 'spring'
      },
          indexAxis: "x",
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
      chartInstance: null
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.column = JSON.parse(this.$route.params.column);
    this.chartData = JSON.parse(this.$route.params.data);
    console.log("Received column: ", this.$route.params.column);
    console.log("Received data: ", this.$route.params.data);

    console.log("Received id: ", this.id);
    console.log("Received column: ", this.column);
    console.log("Received data: ", this.chartData);
    this.column.forEach(column => {
      this.columnStatus[column] = true;
    });
    this.tabs[0].title = this.id;
  },
  mounted() {
    this.createChart()
  },
  methods: {
    createChart() {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      let chartDataset = {
        labels: this.column,
        datasets: [
          {
            label: 'Bubble Chart',
            data: [
              { x: 10, y: 20, r: 5 },
              { x: 15, y: 25, r: 10 },
              { x: 1, y: 2, r: 3 },
              { x: 4, y: 5, r: 6 },
              { x: 7, y: 8, r: 9 },
              { x: 10, y: 11, r: 12 },
              { x: 13, y: 14, r: 15 },
              { x: 16, y: 17, r: 18 },
              // Add more data points...
            ],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      };

      this.chartInstance = new Chart(this.$refs.bubbleChart, {
        type: 'bubble',
        data: chartDataset,
        options: this.options
      });
    },
    toggleColumn(column) {
      this.columnStatus[column] = !this.columnStatus[column];
    },
    downloadChart() {
      // chart.js에서 이미지 데이터를 얻습니다.
      let imageData = this.chartInstance.toBase64Image();

      // 새로운 a 엘리먼트를 생성하고, href 속성에 이미지 데이터를 설정합니다.
      let dummyLink = document.createElement('a');

      // 탭의 제목을 사용하여 이미지의 이름을 설정합니다.
      dummyLink.download = this.tabs[this.activeTab].title + '.png';

      dummyLink.href = imageData;
      dummyLink.dataset.downloadurl = ['image/png', dummyLink.download, dummyLink.href].join(':');

      // a 엘리먼트를 클릭하여 이미지를 다운로드합니다.
      dummyLink.click();
    },
    saveChartAsImage() {
      // chart.js에서 이미지 데이터를 얻습니다.
      let imageData = this.chartInstance.toBase64Image();

      // 로컬 스토리지에서 해당 이름의 이미지를 가져옵니다.
      let storedImage = localStorage.getItem('chart-' + this.tabs[this.activeTab].title);

      // 중복되는 이름이 있을 경우에만 이름 뒤에 _1, _2 등을 붙입니다.
      let suffix = '';
      let count = 1;
      while (storedImage !== null) {
        suffix = '_' + count;
        storedImage = localStorage.getItem('chart-' + this.tabs[this.activeTab].title + suffix);
        count++;
      }

      // 로컬 스토리지에 이미지를 저장합니다. 탭의 제목을 키 값에 추가합니다.
      localStorage.setItem('chart-' + this.tabs[this.activeTab].title + suffix, imageData);

      // 로그 생성: 차트 이름을 확인합니다.
      console.log(`Chart Name: ${this.tabs[this.activeTab].title}`);
    }
  },
}
</script>

<style scoped>
.tab-content {
  min-height: 76rem;
}

.content3 {
  position: relative;
}

.content2>div {
  border: 1px solid #eee;
  padding: 1rem;
  min-height: 61rem;
}

.select {
  background: #fff;
  margin-top: 1rem;
  min-height: 23rem;
  max-height: 23rem;
  overflow: scroll;
  overflow-x: hidden;
}

h2 {
  color: #333;
  font-size: 20px;
}

/* canvas {
    max-width: 300px;
    max-height: 300px;
  } */
.box {
  padding: 1rem;
}
.btn {
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