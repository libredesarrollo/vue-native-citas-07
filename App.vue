<template>
  <app-navigator></app-navigator>
</template>

<script>
import {
  createAppContainer,
  createStackNavigator,
} from "vue-native-router";

import IndexScreen from "./screens/IndexScreen.vue";
import DetailsScreen from "./screens/DetailsScreen.vue";
import FormScreen from "./screens/FormScreen.vue";

const StackNavigator = createStackNavigator(
  {
    Index: IndexScreen,
    Details: DetailsScreen,
    Form: FormScreen,
  },
  {
    initialRouteName: 'Index',
  }
);

const AppNavigator = createAppContainer(StackNavigator);

export default {
  components: { AppNavigator },
}
</script>