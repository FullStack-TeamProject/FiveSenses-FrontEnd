<template>
  <div class="tab-container">
    <ul class="tab-list flex-end">
      <li v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === index }" @click="activeTab = index">
        {{ tab.title }}
      </li>
      <li v-for="(item, index) in listItems" :key="index">{{ item }}</li>
    </ul>

    <div class="tab-content" style="background-color: white;">
      
      <div class="flex m-b"></div>
      <div v-for="(tab, index) in tabs" :key="index" v-show="activeTab === index" class="name m-b">
        <div v-show="tab.content1">
          <div class="flex title">
            <h1>테이블 리스트</h1>
            <div class="flex-center">
              <label class="flex" for="input-search">
                <input type="text" id="input-search" style="margin-left: 1rem" /><img class="img-s"
                  src="../../../resources/image/search.png" alt="" />
              </label>
            </div>
          </div>
          <div class="flex content3 m-b">
            <!-- 표준화 전 섹션 -->
            <div style="width: 45%">
              <div class="flex">
                <h2 class="m-b">표준화 전</h2>
                <div class="m-b">
                  <label class="input-file-button" @click="navigatorToFileInsert">
                    파일 추가하기
                  </label>
                  <input type="file" id="input-file" style="display: none" />
                </div>
              </div>
              <!-- 표준화 전 데이터 테이블 -->
              <table class="">
                <thead>
                  <tr>
                    <th>현재 등록된 데이터</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="index in files.length" :key="index">
                    <td>{{ files[index - 1]?.currentData || '-' }}
                      <button class="button-class" @click="columnStandard(files.id)">수정</button>
                    </td>
                  </tr>
                  <tr v-if="showTableRow">
                    <td>더미 파일
                      <button class="button-class" @click="hideAndRedirect">수정</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- 표준화 후 섹션 -->
            <div style="width: 45%">
              <h2 class="m-b">표준화 후</h2>
              <!-- 표준화된 데이터 테이블 -->
              <table class="">
                <thead>
                  <tr>
                    <th>표준화된 데이터</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(standardizedFile, index) in standardizedFiles" :key="index" class="bd inner">
                    <td class="flex">
                      <p>{{ standardizedFile.standardizedData }}</p>
                      <button class="button-class" @click="navigatorToFile(standardizedFile.id)">이동하기</button>
                    </td>
                  </tr>
                  <tr v-if="showTableRow1">
                    <td>더미 파일 2
                      <button class="button-class" @click="hideAndRedirect1">이동하기</button>
                    </td>
                  </tr>
                </tbody>
              </table>

            </div>

          </div>

        </div>
        <!-- 생성된 탭 -->
        <div v-for="(tab, index) in tabs" :key="index" v-show="activeTab === index" v-if="index !== 0">
          <h2>{{ tab.title }}</h2>
          <div v-html="tab.content"> </div>
          <div>
            <div class="btn-set" style="margin-bottom: 20px;" >
              <button class="save-button" @click="[show(), changeButton()]">
                {{ buttonText }}
              </button>
              <button @click="navigatorToVisual" class="save-button">메인 이동</button>
            </div>
            <div v-if="buttonText === '차트 만들기'">
              <div>
                <table class="">
                  <thead>
                    <tr>
                      <th v-for="(column, index) in tab.column" :key="index">{{ column }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(rowData, index) in tab.data" :key="index">
                      <td v-for="(data, index2) in rowData" :key="index2">{{ data }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div v-else-if="buttonText === '테이블 내용 보기'">
                <div class="layout layout1">
                  <a @click="showModal2" style="color: black; border: 1px solid black;">막대차트
                    <img src="../../../resources/image/barchart.png" alt="막대 차트">
                  </a>
                  <a @click="showModal9" style="color: black; border: 1px solid black;">
                    세로 막대 차트 <img src="../../../resources/image/y_bar.png" alt="세로 막대 차트">
                  </a>
                  <a @click="showModal3" style="color: black; border: 1px solid black;">
                    도넛 차트 <img src="../../../resources/image/doughnut.png" alt="도넛 차트">
                  </a>
                  <a @click="showModal4" style="color: black; border: 1px solid black;">
                    선형 차트 <img src="../../../resources/image/line.png" alt="선형 차트">
                  </a>
                  <a @click="showModal5" style="color: black; border: 1px solid black;">
                    파이 차트 <img src="../../../resources/image/pie.png" alt="파이 차트">
                  </a>
                  <a @click="showModal6" style="color: black; border: 1px solid black;">
                    극좌표형 차트 <img src="../../../resources/image/polararea.png" alt="극좌표형 차트">
                  </a>
                  <a @click="showModal7" style="color: black; border: 1px solid black;">
                    버블 차트 <img src="../../../resources/image/bubble.png" alt="버블 차트">
                  </a>
              </div>
            </div>
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
      buttonTexts: ["차트 만들기", "테이블 내용 보기"], // Array of button texts
      currentIndex: 0, // Index to keep track of the current button text
      files: [{ id: 2, currentData: 'Data1' },
      { id: 2, currentData: 'Data2' },],
      standardizedFiles: [{
        id: 1,
        standardizedData: 'StandardData1',
        column: ['차', '사람', '음식', '운동', '가전제품', '음악'],
        data: [
          [12, 7, 10, 10, 9, 3],
          [19, 9, 4, 3, 0, 4],
          [3, 6, 5, 12, 14, 18],
          [5, 5, 1, 7, 2, 9],
          [11, 13, 16, 2, 7],
          [1, 2, 3, 4, 5, 6],
        ]
      },
      {
        id: 2, standardizedData: 'StandardData2', 
        column: ['년도', '합계', '승용', '승합', '화물', '특수'],
        data: [
          ['2023', '1509868', '1273106', '37724', '186996', '12042'],
          ['2022', '1499503', '1262621', '38269', '186622', '11991'],
          ['2021', '1464608', '1226983', '39954', '186202', '11469'],
          ['2020', '1429040', '1189345', '42056', '186650', '10989'],
          ['2019', '1395183', '1152712', '43687', '188272', '10512'],
          ['2018', '1371172', '1125462', '45441', '190070', '10199'],
          ['2017', '1333224', '1085121', '47037', '190987', '10079'],
          ['2016', '1295316', '1044996', '49288', '191215', '9817'],
          ['2015', '1255722', '1003721', '51685', '190980', '9336'],
          ['2014', '1214175', '962093', '54004', '189022', '9056'],
          ['2013', '1183679', '931099', '56380', '187425', '8775'],
          ['2012', '1175205', '921034', '58725', '186946', '8500'],
          ['2011', '1159178', '901334', '61523', '188052', '8269'],
          ['2010', '1147311', '885945', '64531', '188731', '8104'],
          ['2009', '1116719', '851684', '68011', '189029', '7995'],
          ['2008', '1038954', '769463', '69904', '191635', '7952'],
          ['2007', '1010086', '735941', '71609', '194713', '7823'],
          ['2006', '994292', '718357', '73780', '194622', '7533'],
          ['2005', '979969', '699786', '76791', '196099', '7293'],
          ['2004', '966417', '679433', '83048', '196740', '7196'],
          ['2003', '955366', '667191', '85833', '195601', '6741'],
          ['2002', '921084', '638173', '87903', '189023', '5985'],
          ['2001', '862699', '589257', '87697', '180393', '5352'],
          ['2000', '812369', '547405', '92069', '167899', '4996'],
          ['1999', '760699', '534132', '66155', '155775', '4637'],
          ['1998', '719862', '516456', '54155', '144853', '4398'],
          ['1997', '720614', '517957', '53317', '144863', '4477'],
          ['1996', '671958', '476275', '50247', '141138', '4298'],
          ['1995', '604078', '417752', '47318', '135001', '4007'],
          ['1994', '535108', '361209', '45305', '125313', '3281'],
          ['1993', '469622', '309488', '42384', '114944', '2806'],
          ['1992', '406755', '259488', '40187', '104388', '2692'],
          ['1991', '346437', '213485', '36462', '94103', '2387'],
          ['1990', '287058', '167164', '33619', '84016', '2259'],
          ['1989', '234936', '130501', '28398', '73916', '2121'],
          ['1988', '187609', '97022', '23530', '58560', '8497'],
          ['1987', '152898', '75444', '18535', '51332', '7587'],
          ['1986', '124460', '59099', '13941', '44526', '6894'],
          ['1985', '106357', '50189', '11346', '39085', '5737'],
          ['1984', '93783', '43498', '9858', '35079', '5348'],
          ['1983', '80981', '37116', '8141', '31041', '4683'],
          ['1982', '71017', '32038', '6436', '28439', '4104'],
          ['1981', '66812', '30287', '5100', '27885', '3540'],
          ['1980', '62419', '28163', '4506', '26500', '3250'],
          ['1979', '59140', '27395', '4324', '24296', '3125'],
          ['1978', '45114', '20051', '3598', '18838', '2627'],
          ['1977', '31254', '12882', '2886', '15176', '310'],
          ['1976', '26285', '10531', '2470', '12677', '607'],
          ['1975', '23760', '9128', '2161', '11892', '579'],
          ['1974', '21581', '8188', '1919', '10909', '565'],
          ['1973', '19471', '8041', '1893', '9000', '537'],
          ['1972', '16060', '7000', '1634', '6980', '446'],
          ['1971', '15527', '6773', '1616', '6754', '384'],
          ['1970', '13793', '6086', '1526', '5915', '266'],
          ['1969', '12219', '5382', '1529', '5025', '283'],
          ['1968', '9169', '3622', '1403', '3705', '439'],
          ['1967', '6921', '2645', '1059', '2889', '328'],
          ['1966', '4531', '1806', '979', '1471', '275'],
          ['1965', '4518', '1718', '877', '1718', '205'],
          ['1964', '4057', '1589', '848', '1489', '131'],
          ['1963', '3810', '1436', '773', '1444', '157']
        ],
      },],
      showDiv: false,
      showDiv2: false,
      showDiv3: false,
      showDiv4: false,
      modalVisible: false,
      modalVisible2: false,

      showTableRow: localStorage.getItem('showTableRow') !== 'true',
      showTableRow1: localStorage.getItem('showTableRow1') === 'false',
      // showTableRow: true,
      // showTableRow1: false,
      activeTab: 0,
      tabs: [
        {
          title: "Table List",
          content1: "This is the content for Tab 1",
          column: ['Column1', 'Column2', 'Column3'],
          data: [
            ['Data11', 'Data12', 'Data13'],
            ['Data21', 'Data22', 'Data23'],
            ['Data31', 'Data32', 'Data33']],
        },
      ],
      listItems: [],
      showBarChart: false,
    };
  },
  components: {
    Modal: Modal,
  },
  methods: {
    hideAndRedirect() {
      this.showTableRow = false;
      localStorage.setItem('showTableRow', 'true');
      this.showTableRow1 = true;
      localStorage.setItem('showTableRow1', 'false');
    },
    hideAndRedirect1() {
      this.showTableRow = true;
      localStorage.setItem('showTableRow', 'false');
      this.showTableRow1 = false;
      localStorage.setItem('showTableRow1', 'true');
    },
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
    // 차트로 이동
    showModal2() {
      console.log("@@@");
      this.$router.push('/Barchart.page');
      const activeTab = this.tabs[this.activeTab]; // Get the active tab
      const id = activeTab.title; // Use the tab title as the id
      const column = activeTab.column;
      const data = activeTab.data;
      this.$router.push({ name: 'Barchart', params: { id: id, column: JSON.stringify(column), data: JSON.stringify(data) } });
    },
    showModal3() {
      console.log("@@@");
      this.$router.push('/Doughnutchart.page');
      const activeTab = this.tabs[this.activeTab]; // Get the active tab
      const id = activeTab.title; // Use the tab title as the id
      const column = activeTab.column;
      const data = activeTab.data;
      this.$router.push({ name: 'Doughnutchart', params: { id: id, column: JSON.stringify(column), data: JSON.stringify(data) } });
    },
    showModal4() {
      const activeTab = this.tabs[this.activeTab]; // Get the active tab
      const id = activeTab.title; // Use the tab title as the id
      const column = activeTab.column;
      const data = activeTab.data;
      console.log("Navigating to lineChart with id: ", id); // print the id
      console.log("column: ", column);
      console.log("Data: ", data); // print the data
      this.$router.push({ name: 'Linechart', params: { id: id, column: JSON.stringify(column), data: JSON.stringify(data) } });
      // 위에꺼 수정 해야함
    },

    showModal5() {
      console.log("@@@");
      this.$router.push('/Piechart.page');

      const activeTab = this.tabs[this.activeTab]; // Get the active tab
      const id = activeTab.title; // Use the tab title as the id
      const column = activeTab.column;
      const data = activeTab.data;
      this.$router.push({ name: 'Piechart', params: { id: id, column: JSON.stringify(column), data: JSON.stringify(data) } });
    },
    showModal6() {
      console.log("@@@");
      this.$router.push('/Polarareachart.page');
      const activeTab = this.tabs[this.activeTab]; // Get the active tab
      const id = activeTab.title; // Use the tab title as the id
      const column = activeTab.column;
      const data = activeTab.data;
      this.$router.push({ name: 'Polarareachart', params: { id: id, column: JSON.stringify(column), data: JSON.stringify(data) } });
    },
    showModal7() {
      console.log("@@@");
      const activeTab = this.tabs[this.activeTab]; // Get the active tab
      const id = activeTab.title; // Use the tab title as the id
      const column = activeTab.column;
      const data = activeTab.data;
      this.$router.push({ name: 'Bubblechart', params: { id: id, column: JSON.stringify(column), data: JSON.stringify(data) } });
    },
    showModal8() {
      console.log("@@@");
      this.$router.push('/Radarchart.page');
      const activeTab = this.tabs[this.activeTab]; // Get the active tab
      const id = activeTab.title; // Use the tab title as the id
      const column = activeTab.column;
      const data = activeTab.data;
      this.$router.push({ name: 'Radarchart', params: { id: id, column: JSON.stringify(column), data: JSON.stringify(data) } });
    },
    showModal9() {
      console.log("@@@");
      this.$router.push('/y_Barchart.page');
      const activeTab = this.tabs[this.activeTab]; // Get the active tab
      const id = activeTab.title; // Use the tab title as the id
      const column = activeTab.column;
      const data = activeTab.data;
      this.$router.push({ name: 'y_Barchart', params: { id: id, column: JSON.stringify(column), data: JSON.stringify(data) } });
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
      this.$router.push('/Filestandard.page/${id}');
    },
    navigatorToVisual() {
      this.$router.push('/');
    },
    navigatorToFile(id) {
      let standardizedFile = this.standardizedFiles.find(d => d.id === id);
      if (standardizedFile) {
        let existingTab = this.tabs.find(tab => tab.title === standardizedFile.standardizedData);
        if (existingTab) {
          this.activeTab = this.tabs.indexOf(existingTab);
        } else {
          this.tabs.push({
            title: standardizedFile.standardizedData,
            content: `This is the content for ${standardizedFile.standardizedData}`,
            column: standardizedFile.column, // Add column data to the new tab
            data: standardizedFile.data // Add row data to the new tab
          });
          this.activeTab = this.tabs.length - 1;
        }

        // Save the updated tabs array and activeTab index in the session storage
        sessionStorage.setItem('tabs', JSON.stringify(this.tabs));
        sessionStorage.setItem('activeTab', this.activeTab.toString());
      }
    },
    createTab(title) {
      // Create a new tab object and add it to the tabs array
      const newTab = {
        title: title,
        content: `This is the content for ${title}`
      };
      this.tabs.push(newTab);

      // Save the updated tabs array in the session storage
      sessionStorage.setItem('tabs', JSON.stringify(this.tabs));
      sessionStorage.setItem('activeTab', this.activeTab.toString());
    },
    retrieveTabsFromSession() {
      // Retrieve the tabs array from the session storage
      const savedTabs = sessionStorage.getItem('tabs');

      // Retrieve the activeTab index from the session storage
      const savedActiveTab = sessionStorage.getItem('activeTab');

      // Parse the JSON data if it exists
      if (savedTabs) {
        this.tabs = JSON.parse(savedTabs);
      }

      // Set the activeTab index if it exists
      if (savedActiveTab) {
        this.activeTab = parseInt(savedActiveTab);
      }
    },

  },
  watch: {},
  computed: {
    buttonText() {
      return this.buttonTexts[this.currentIndex]; // Get the current button text based on the currentIndex
    },
  },
  mounted() {
    // this.tab.content1 = true;
    this.showDiv3 = this.$route.query.showChartView;
    console.log("Main2 mounted");
    this.retrieveTabsFromSession();
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
  border: 1px solid #c892f5;
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

.button-class {
  /* 스타일을 여기에 정의합니다. */
  background-color: #fff;
  /* color: #333; */
  border: 1px solid #c892f5;
  border-radius: 4px;
  cursor: pointer;
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
