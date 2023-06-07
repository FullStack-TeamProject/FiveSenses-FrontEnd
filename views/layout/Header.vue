<template>
   <div class="flex head">
        <a href="#" class="left flex"><svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30"><path d="M220 876h150V626h220v250h150V486L480 291 220 486v390Zm-60 60V456l320-240 320 240v480H530V686H430v250H160Zm320-353Z"/></svg>대구가톨릭대학교</a>
   </div>
</template>

<script>
export default {
    data () {
        return {
        }
    },
    methods: {

    },
    watch: {

    },
    computed: {

    },
    mounted() {
        console.log('Header mounted');
    }
}
</script>
<style scoped>
.head{background: #233a53; padding: 1rem 2rem; }
.head a{color: #fff; font-size: 18px;}
.right{gap: 2rem;}
svg{fill: #fff;}
</style>