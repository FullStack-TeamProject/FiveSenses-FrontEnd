<template>
  <div class="content">
    <table class="">
      <thead>
        <tr>
          <th>현재 등록된 데이터 수: {{files.length}}개</th>
          <th>표준화가 완료된 데이터 수: {{standardizedFiles.length}}개</th>
        </tr>
        <tr>
          <th>현재 등록된 데이터</th>
          <th>표준화된 데이터</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="index in Math.max(files.length, standardizedFiles.length)" :key="index">
          <td>{{files[index - 1]?.currentData || '-'}}</td>
          <td>{{standardizedFiles[index - 1]?.standardizedData || '-'}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      files: [
       { currentData: 'Data1' },
       { currentData: 'Data2' }, 
     ],
     standardizedFiles: [
       { standardizedData: 'StandardData1' },
       { standardizedData: 'StandardData2' },
       { standardizedData: 'StandardData3' },
       { standardizedData: 'StandardData4' },
     ],
    };
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
  },
  created() {
    // TODO: Fetch your files data and standardized files data here and assign to 'files' and 'standardizedFiles'
  },
  watch: {},
  computed: {},
  mounted() {
    console.log("Main2 mounted");
  },
};
</script>
<style scoped>
table{   
     max-height: 76rem;
    overflow: scroll;
    overflow-x: none;
}
thead tr:nth-child(2){background: #f6f6f6;}
table,
td,
th {
  border: 1px solid #eee;
  width: -webkit-fill-available;
 }
th{font-size: 18px;  padding: 0.5rem ;
}
td{font-size: 14px;}
</style>
