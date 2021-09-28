<template>
    <text class="error" v-if="show">
      {{ msj }}
    </text>
</template>
<script>
export default {
    props: {
        show: {
            type: Boolean,
            required: true
        },
        msj: {
            type: String,
            required:true
        }
    }
}
</script>
<style scoped>
.error{
    color:red;
    font-weight: bold;
}
</style>>