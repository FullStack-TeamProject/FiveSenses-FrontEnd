<template>
  <div class="tab-container">
    <ul class="tab-list flex-end">
      <li v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === index }" @click="activeTab = index">{{
        tab.title }}</li>
    </ul>
    <div class="tab-content">
      <div v-for="(tab, index) in tabs" :key="index" v-show="activeTab === index" class="name">
        <div contenteditable="true" @input="e => (tab.content = e.target.textContent)">
          {{ tab.content }}
        </div>
      </div>
      <div>
        <select name="" id="" class="m-r" v-model="selectedLayout" style="  padding: 5px 30px;
  border: 1px solid #997bc7;
  background: #fff;
  border-radius: 4px;
  font-size: 1.5rem;
  margin-top: 3rem;
  cursor: pointer;">
          <option value="layout1">2단(1*3) 레이아웃</option>
          <option value="layout2">2단(2*2) 레이아웃</option>
          <option value="layout3">2단(2*3) 레이아웃</option>
          <option value="layout4">2단(2*4) 레이아웃</option>
          <option value="layout5">2단(3*1) 레이아웃</option>
          <option value="layout6">2단(3*2) 레이아웃</option>
          <option value="layout7">2단(3*3) 레이아웃</option>
          <option value="layout8">2단(4*2) 레이아웃</option>
          <option value="layout9">2단(4*4) 레이아웃</option>
          <option value="layout10">3단(2*3*3) 레이아웃</option>
        </select>
        <button class="save-button" style="margin-top: 5rem; margin-right: 10px; margin-left: 530px;"
          @click="downloadImage">대시보드 출력</button>
        <button class="save-button" style="margin-top: 5rem" @click="uploadImage(imageData)">대시보드 저장</button>
        <Modal :visible="modalVisible1" @close="closeModal1">
          <div class="modal_body modal_body2 ">
            <h2 style="margin-bottom: 1rem">Select chart list</h2>
            <div class="layout layout00">
              <div>
                <table style="width: 300px;">
                  <tbody>
                    <tr v-for="(row, index) in chartImagesChunked" :key="index">
                      <td v-for="(imageData, subIndex) in row" :key="subIndex">
                        <img :src="imageData" @click="onImageClick1(imageData)" alt="Chart Image" style="width: 95%;">
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <button class="button" @click="closeModal1">ok</button>
          </div>
        </Modal>
        <Modal :visible="modalVisible2" @close="closeModal2">
          <div class="modal_body modal_body2">
            <h2 style="margin-bottom: 1rem">Select chart list</h2>
            <div class="layout layout00">
              <div>
                <table style="width: 300px;">
                  <tbody>
                    <tr v-for="(row, index) in chartImagesChunked" :key="index">
                      <td v-for="(imageData, subIndex) in row" :key="subIndex">
                        <img :src="imageData" @click="onImageClick2(imageData)" alt="Chart Image" style="width: 95%;">
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <button class="button" @click="closeModal2">ok</button>
          </div>
        </Modal>
        <Modal :visible="modalVisible3" @close="closeModal3">
          <div class="modal_body modal_body2">
            <h2 style="margin-bottom: 1rem">Select chart list</h2>
            <div class="layout layout00">
              <div>
                <table style="width: 300px;">
                  <tbody>
                    <tr v-for="(row, index) in chartImagesChunked" :key="index">
                      <td v-for="(imageData, subIndex) in row" :key="subIndex">
                        <img :src="imageData" @click="onImageClick3(imageData)" alt="Chart Image" style="width: 95%;">
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <button class="button" @click="closeModal3">ok</button>
          </div>
        </Modal>
        <Modal :visible="modalVisible4" @close="closeModal4">
          <div class="modal_body modal_body2" >
            <h2 style="margin-bottom: 1rem">Select chart list</h2>
            <div class="layout layout00">
              <div>
                <table style="width: 300px;">
                  <tbody>
                    <tr v-for="(row, index) in chartImagesChunked" :key="index">
                      <td v-for="(imageData, subIndex) in row" :key="subIndex">
                        <img :src="imageData" @click="onImageClick4(imageData)" alt="Chart Image" style="width: 95%;">
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <button class="button" @click="closeModal4">ok</button>
          </div>
        </Modal>
        <div v-if="selectedLayout === 'layout1'" class="layout layout1">
          <div class="col3"></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div ref="layoutRef" v-else-if="selectedLayout === 'layout2'" class="layout layout2" style="margin-top: 15px;">
          <div
            :style="{ backgroundImage: 'url(' + selectedImage1 + ')', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }"
            @click="ShowModal1"> </div>
          <div
            :style="{ backgroundImage: 'url(' + selectedImage2 + ')', backgroundSize:  '100% 100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }"
            @click="ShowModal2"> </div>
          <div
            :style="{ backgroundImage: 'url(' + selectedImage3 + ')', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }"
            @click="ShowModal3"> </div>
          <div
            :style="{ backgroundImage: 'url(' + selectedImage4 + ')', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }"
            @click="ShowModal4"> </div>

        </div>
        <div v-else-if="selectedLayout === 'layout3'" class="layout " style="margin-top: 15px;">
          <div class="layout2 layout" style="background: none;">
            <div></div>
            <div></div>
          </div>
          <div class="layout1 layout" style="background: none;">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div v-else-if="selectedLayout === 'layout4'" class="layout2 layout" style="margin-top: 15px;">
          <div class="layout " style="background: none;">
            <div class="col2"></div>
            <div></div>
            <div></div>
          </div>
          <div class="layout" style="background: none;">
            <div class="col2"></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div v-else-if="selectedLayout === 'layout5'" class="layout layout1" style="margin-top: 15px;">
          <div></div>
          <div></div>
          <div></div>
          <div class="col3"></div>
        </div>
        <div v-else-if="selectedLayout === 'layout6'" class="layout ">
          <div class="layout1 layout" style="background: none;">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div class="layout2 layout" style="background: none;">
            <div></div>
            <div></div>
          </div>
        </div>
        <div v-else-if="selectedLayout === 'layout7'" class="layout layout1" style="margin-top: 15px;">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div v-else-if="selectedLayout === 'layout8'" class="layout layout2" style="margin-top: 15px;">
          <div class="layout " style="background: none;">
            <div></div>
            <div></div>
            <div class="col2"></div>
          </div>
          <div class="layout" style="background: none;">
            <div></div>
            <div></div>
            <div class="col2"></div>
          </div>
        </div>
        <div v-else-if="selectedLayout === 'layout9'" class="layout layout4" style="margin-top: 15px;">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div v-else-if="selectedLayout === 'layout10'" class="layout layout10" style="margin-top: 15px;">
          <div class="layout2 layout" style="background: none;">
            <div></div>
            <div></div>
          </div>
          <div class="layout1 layout" style="background: none;">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue';
import Modal from "../main/Modal.vue";
import html2canvas from 'html2canvas';
import axios from 'axios';

const imageData = ref(null);
const chartIds = ref([]);
const chartImages = ref([]);
const chartData = ref({});
const selectedLayout = ref("layout2");
const activeTab = ref(0);
const modalVisible1 = ref(false);
const modalVisible2 = ref(false);
const modalVisible3 = ref(false);
const modalVisible4 = ref(false);
const selectedImage1 = ref(null);
const selectedImage2 = ref(null);
const selectedImage3 = ref(null);
const selectedImage4 = ref(null);
const layoutRef = ref(null);
const showDiv4 = ref(false);
const tabs = ref([
  {
    title: "Make DashBoard",
    content: "This is Make a DashBoard"
  },
]);

function onImageClick1(imageData) {
  selectedImage1.value = imageData;
  modalVisible1.value = false;
}

function onImageClick2(imageData) {
  selectedImage2.value = imageData;
  modalVisible2.value = false;
}

function onImageClick3(imageData) {
  selectedImage3.value = imageData;
  modalVisible3.value = false;
}

function onImageClick4(imageData) {
  selectedImage4.value = imageData;
  modalVisible4.value = false;
}

function ShowModal1() {
  modalVisible1.value = true;
}

function ShowModal2() {
  modalVisible2.value = true;
}

function ShowModal3() {
  modalVisible3.value = true;
}

function ShowModal4() {
  modalVisible4.value = true;
}

function closeModal1() {
  modalVisible1.value = false;
}

function closeModal2() {
  modalVisible2.value = false;
}

function closeModal3() {
  modalVisible3.value = false;
}

function closeModal4() {
  modalVisible4.value = false;
}

function loadChartImage(chartId) {
  chartData.value[chartId] = localStorage.getItem('chart-' + chartId);

  if (!chartData.value[chartId]) {
    console.log("No image data found in local storage for chart ID:", chartId);
  } else {
    console.log("Loaded image data for chart ID:", chartId);
  }
}

function loadAllChartImages() {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key.startsWith('chart-')) {
      let imageData = localStorage.getItem(key);
      chartImages.value.push(imageData);
      console.log("Loaded image data for key:", key);
    }
  }
}

async function downloadImage() {
  await nextTick();

  if (selectedLayout.value !== 'layout2') {
    console.log('The layout is not set to layout2');
    return;
  }

  if (layoutRef.value) {
    html2canvas(layoutRef.value).then((canvas) => {
      let link = document.createElement('a');
      link.download = `${tabs.value[activeTab.value].content}.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  } else {
    console.log('layoutRef is not connected to an element');
  }
}

async function uploadImage(imageData) {
  const formData = new FormData();
  console.log(layoutRef.value);
  console.log(selectedImage1.value);

  try {
    var mime = 'image/png';  // MIME type 설정
    var sliceSize = 1024;
    var byteChars = window.atob(selectedImage1.value.split(',')[1]);
    var byteArrays = [];

    for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
      var slice = byteChars.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const a = new Blob(byteArrays, { type: mime });

    console.log(a);


    formData.append("image", a);

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };

    console.log(formData);

    //    주석 해제하여 이미지 업로드 요청 실행
    axios.post('/upload', formData, config)
      .then(response => console.log(response.data))
      .catch(error => console.error(error));

  } catch (error) {
    console.error(error);
  }
}



const chartImagesChunked = computed(() => {
  let result = [];
  for (let i = 0; i < chartImages.value.length; i += 2) {
    result.push(chartImages.value.slice(i, i + 2));
  }
  return result;
});

onMounted(() => {
  console.log("Main2 mounted");
  loadAllChartImages();
});

</script>

<style scoped>
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

.layout00 {
  padding: 1rem;
  max-height: 410px;
  overflow: scroll;
  overflow-x: hidden;
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
}

.layout{
  height: 800px;
}

.modal_body {
  text-align: center;
  width: 24rem;
  background: transparent;
}

.modal_body2 {
  width: 49rem !important;
  background: transparent;
  background-color: white; width: 400px; height: 300px;
}

.modal {
  left: 24%;
  background: transparent;
}

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

.divItem {
  width: 45%;
  height: 100px;
  background-color: orange;
  flex-basis: 48%;
}

h2 {
  color: #333;
  font-size: 20px;
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

</style>
