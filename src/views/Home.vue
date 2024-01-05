<template>
    
<p>hello</p>
<p>test</p>
<button type="button" @click="this.go()">去登入</button>

</template>

<style scoped lang="scss">

</style>

<script>
export default {
    data(){
        return{ 
            
        }
    },
    methods:{
        go(){
            this.$router.push('/LoginPage')
        }
  },
  mounted(){
    
  }
}
</script>