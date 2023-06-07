<template>
    <div class="modal" v-if="visible">
      
      <div class="modal-content">
        <slot></slot>
      </div>
      <!-- <div class="modal-overlay" @click="close"></div> -->
    </div>
  </template>
  
  <script>
  export default {
    props: {
      visible: {
        type: Boolean,
        required: true,
      },
    },
    methods: {
      close() {
        this.$emit("close");
      },
    },
  };
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }
  
  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    /* background-color: rgba(0, 0, 0, 0.5); */
  }
  
  .modal-content {
    background-color: black;
    /* padding: 20px; */
    border-radius: 5px;
    border: 1px solid black;
  }
  </style>