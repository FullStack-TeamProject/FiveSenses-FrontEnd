<template>
  <div style="margin-top: 3rem; display: flex; flex-wrap: wrap; justify-content: center;">
    <router-link to="/">
      <h2 style="margin-right: 100px; margin-top: 18px;"><img style="margin-right: 2rem;" class="img-s" src="../../resources/image/home.png" alt="" />메인</h2>
    </router-link>

    <div v-for="(item, index) in items" :key="index" class="m-b" style="margin-top: 1rem; margin-right: 100px; margin-top: 20px;">
      <div @click="item.showContent = !item.showContent" class="flex">
        <div class="flex" >
          <div v-show="item.icon1">
            <img class="img-s" src="../../resources/image/database.png" alt="" />
          </div>
          <div v-show="item.icon2">
            <img class="img-s" src="../../resources/image/schema.png" alt="" />
          </div>
          <h2>{{ item.title }}</h2>
        </div>
      </div>

      <div style="display: flex; flex-direction: row; margin-left: -30px;">
        <router-link to="/Tableinsert.page"> 
          <p v-show="item.content1">파일 관리</p>
        </router-link>
        <router-link to="/Tablelist.page"> 
          <p v-show="item.content1" style="margin-left: -15px;">테이블 리스트</p>
        </router-link>
        <router-link to="/Dashboard.page"> 
          <p v-show="item.content2">대시보드</p>
        </router-link>   
        <router-link to="/Dashboardlist.page"> 
          <p v-show="item.content2" style="margin-left: -15px;">대시보드 목록</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: "데이터 관리",
          content1: "Content for item 1.",
          showContent: false,
          icon1: "d",
        },
        {
          title: "데이터 활용",
          content2: "Content for item 2.",
          showContent: false,
          icon2: "d",
        },
      ],
    };
  },
  methods: {},
  watch: {},
  computed: {},
  mounted() {
    console.log("Menu mounted");
  },
};
</script>
<style>
.local {
  position: absolute;
  font-size: 23px;
  top: 0;
  left: 32rem;
  width: 50%;
  background-color: #25253D; /* 배경색 변경 */
  color: white; /* 글자색 변경 */
}

h2 {
  color: #ffffff;
  font-size: 1.5rem;
}

p {
  padding: 1rem 0 0 3rem;
  font-size: 18px;
}
</style>