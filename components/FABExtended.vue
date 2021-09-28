<template>
  <touchable-opacity :style="style.fab_extended_base" :on-press="callback">
    <text :style="{ color: '#FFF' }"> {{ label }} </text>
  </touchable-opacity>
</template>

<script>

import { style } from "../helpers/styles"

export default {
  data() {
    return {
      style
    }
  },
  props: {
    label: {
      type: String,
      requerid: true,
    },
    callback: {
      type: Function,
      requerid: true,
    },
  },
};
</script>