<template>
  <view class="container">
    <FlashMessage position="top" />

    <scroll-view :style="{ minHeight: '100%' }">
      <view v-for="c in cites" v-bind:key="c.id">
        <text :style="{ fontSize: 18 }"> {{ c.name }} {{ c.surname }} </text>

        <view :style="{ flexDirection: 'row-reverse' }">
          <touchable-opacity :on-press="() => remove(c)">
            <text> Eliminar </text>
          </touchable-opacity>
          <touchable-opacity :on-press="() => edit(c)">
            <text> Editar </text>
          </touchable-opacity>
        </view>
      </view>
    </scroll-view>

    <FABExtended
      :style="style.fab_dowm"
      label="Crear"
      :callback="() => navigation.navigate('Form')"
    />
  </view>
</template>

<script>
import { Alert } from "react-native";

import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";

import {
  storeGetCites,
  storeSetCite,
  storeDeleteCite,
} from "../helpers/storage";
import { style } from "../helpers/styles";
import FABExtended from "../components/FABExtended";

export default {
  async mounted() {
    this.cites = await storeGetCites();

    // TEMPORAL
    if (this.cites.length == 0) {
      await storeSetCite({
        name: "Andres",
        surname: "Cruz",
        age: "30",
        description: "Hola Mundo",
        state: "Soltero",
        sex: true,
      });
      await storeSetCite({
        name: "Maria",
        surname: "Lopez",
        age: "22",
        description: "Hola Mundo 2",
        state: "Soltero",
        sex: false,
      });
      await storeSetCite({
        name: "Juan",
        surname: "Mendoza",
        age: "24",
        description: "Otro",
        state: "Soltero",
        sex: true,
      });
      this.cites = await storeGetCites();
    }
    // FINAL TEMP

    this.navigation.addListener("didFocus", async () => {
      //alert(this.navigation.state.params)
      // this.cites = []
      this.cites = await storeGetCites();
    });
  },
  data() {
    return {
      cites: [],
      style,
    };
  },
  components: {
    FABExtended,
    FlashMessage,
  },
  props: {
    navigation: {
      Object,
    },
  },
  methods: {
    edit(cite) {
      this.navigation.navigate("Form", cite);
      console.log(cite);
    },
    async remove(cite) {
      return Alert.alert(
        "Eliminar",
        "¿Seguro que desea eliminar la cita seleccionada?",
        [
          {
            text: "Si",
            onPress: async () => {
               await storeDeleteCite(cite);

              showMessage({
                message: "Cita eliminada exitosamente.",
                type: "danger",
              });

              this.cites = await storeGetCites();
            },
          },
          {
            text: "No"
          }
        ]
      );
    },
  },
};
</script>

<style>
.container {
  width: 90%;
  margin-top: 15px;
  margin-right: auto;
  margin-left: auto;
}
</style>