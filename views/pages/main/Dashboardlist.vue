<template>
  <div class="tab-container">
    <ul class="tab-list flex-end">
      <li v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === index }" @click="activeTab = index">{{
        tab.title }}</li>
    </ul>

    <div class="tab-content" style="background-color: white; height: 500px;">

      <div v-for="(tab, index) in tabs" :key="index" v-show="activeTab === index" class="name">
        <div v-show="tab.content1">
          <div class="flex title">
            <h1>대시보드 리스트</h1>
            <div class="flex-center">
              <label class="flex" for="input-search">
                <input type="text" id="input-search" style="margin-left: 1rem" /><img class="img-s"
                  src="../../../resources/image/search.png" alt="" />
              </label>
            </div>
          </div>

          <div style="">
            <div v-for="(dashboard, index) in dashboards" :key="index" class="bd inner">
              <div class="flex">
                <p>{{ dashboard.name }}</p>
                <button class="button-class" @click="navigateToDashboard(dashboard.id)">이동하기</button>
              </div>
            </div>
          </div>
          <button class="save-button" type="submit" @click="makeToDashboard">대시보드 만들기</button>

        </div>
        <div v-for="(tab, index) in tabs" :key="index" v-show="activeTab === index">
          <h2>{{ tab.title }}</h2>
          <div v-html="tab.content">
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedLayout: "",
      activeTab: 0,
      dashboards: [
        { id: 1, name: 'Dashboard 1' },
        { id: 2, name: 'Dashboard 2' },
      ],
      tabs: [
        {
          title: "Dash Board List",
          content1: "This is the content for Tab 1"
        },

      ]
    };
  },
  methods: {
    // 대시보드 만들기로 이동하기
    makeToDashboard() {
      this.$router.push('/Dashboard.page');
    },
    navigateToDashboard(id) {
      // 해당 대시보드로 이동하는 로직을 여기에 작성합니다.
      // 예를 들어, Vue Router를 사용하고 있다면 다음과 같이 작성할 수 있습니다:
      // this.$router.push(`/dashboard/${id}`);

      // 대시보드 이름을 찾아서 새로운 탭을 생성합니다.
      let dashboard = this.dashboards.find(d => d.id === id);
      if (dashboard) {
        // 이미 동일한 대시보드 이름으로 생성된 탭이 있는지 확인합니다.
        let existingTab = this.tabs.find(tab => tab.title === dashboard.name);
        if (existingTab) {
          // 이미 존재하는 탭이 있다면, 해당 탭으로 이동합니다.
          this.activeTab = this.tabs.indexOf(existingTab);
        } else {
          // 존재하지 않는다면 새 탭을 생성하고, 해당 탭으로 이동합니다.
          this.tabs.push({
            title: dashboard.name,
            content: `This is the content for ${dashboard.name}`
          });
          this.activeTab = this.tabs.length - 1;
        }
      }
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
h1 {
  font-size: 2rem;
}

.inner {
  padding: 1rem;
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

.button-class {
  /* 스타일을 여기에 정의합니다. */
  background-color: #fff;
  /* color: #333; */
  border: 1px solid #c892f5;
  border-radius: 4px;
  cursor: pointer;
}
</style>
