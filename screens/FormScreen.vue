<template>
  <view class="container">
    <FlashMessage position="top" />

    <text>Crear Formulario</text>

    <text-input
      class="input"
      placeholder="Nombre"
      v-model="$v.form.name.$model"
      :validator="$v.form.name"
    />

    <form-error
      msj="El nombre es requerido"
      :show="!$v.form.name.required && $v.form.name.$dirty"
    />
    <form-error
      :msj="
        'El nombre tiene que tener al menos ' +
        $v.form.name.$params.minLength.min +
        ' letras'
      "
      :show="!$v.form.name.minLength"
    />

    <text-input class="input" placeholder="Apellido" v-model="form.surname" />

    <form-error
      msj="El apellido es requerido"
      :show="!$v.form.surname.required && $v.form.surname.$dirty"
    />
    <form-error
      :msj="
        'El apellido tiene que tener al menos ' +
        $v.form.surname.$params.minLength.min +
        ' letras'
      "
      :show="!$v.form.surname.minLength"
    />

    <text-input
      class="input"
      placeholder="Edad"
      keyboard-type="numeric"
      v-model="form.age"
    />

    <form-error
      msj="
        la edad es requerid
      "
      :show="!$v.form.age.required && $v.form.age.$dirty"
    />

    <text-input
      class="input input-textarea"
      placeholder="Sobre ti..."
      :multiline="true"
      v-model="form.description"
    />

    <form-error
      msj="El descripción es requerido"
      :show="!$v.form.description.required && $v.form.description.$dirty"
    />
    <form-error
      :msj="
        'El descripción tiene que tener al menos ' +
        $v.form.description.$params.minLength.min +
        ' letras'
      "
      :show="!$v.form.description.minLength"
    />

    <picker
      class="select"
      :selectedValue="form.state"
      :onValueChange="
        (val) => {
          form.state = val;
        }
      "
    >
      <item label="Sin selección" value="" />
      <item label="Soltero" value="soltero" />
      <item label="Casado" value="casado" />
      <item label="Codiciado" value="codiciado" />
    </picker>

    <form-error msj="El estado es requerido" :show="!$v.form.state.required" />

    <view :style="{ flexDirection: 'row' }">
      <text>Masculino</text>

      <switch :value="form.sex" :onValueChange="sex" />
    </view>

    <button :disabled="$v.$invalid" title="Guardar" :on-press="save"></button>
  </view>
</template>

<script>
//import { Picker } from "react-native";
import Vue from "vue-native-core";

import { Picker } from "@react-native-picker/picker";
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";

import Vuelidate from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

import { storeSetCite } from "../helpers/storage";

import FormError from "../components/FormError.vue";

Vue.use(Vuelidate);

export default {
  components: {
    Picker,
    Item: Picker.Item,
    FlashMessage,
    FormError,
  },
  props: {
    navigation: {
      Object,
    },
  },
  mounted() {
    if (this.navigation.state.params != undefined) {
      const { id, name, surname, age, description, state, sex } =
        this.navigation.state.params;

      this.form.id = id;
      this.form.name = name;
      this.form.surname = surname;
      this.form.age = age;
      this.form.description = description;
      this.form.state = state;
      this.form.sex = sex;
    }
  },
  data() {
    return {
      form: {
        id: "",
        name: "",
        surname: "",
        age: "",
        description: "",
        state: "",
        sex: true,
      },
    };
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(4),
      },
      surname: {
        required,
        minLength: minLength(4),
      },
      age: {
        required,
      },

      description: {
        required,
        minLength: minLength(4),
      },
      state: {
        required,
      },
      sex: {
        required,
      },
    },
  },
  methods: {
    sex(value) {
      this.form.sex = value;
    },
    async save() {
      if (!this.$v.$invalid) {
        showMessage({
          message: "Cita registrada exitosamente.",
          type: "info",
        });

        await storeSetCite(this.form);
        await new Promise((resolve) => setTimeout(() => resolve(true), 800));
      } else {
        return;
      }

      this.navigation.navigate("Index", { refresh: true });

      //*** guardar array de objetos */
      //  storeSetCite(JSON.stringify([
      //     this.form,
      //     this.form,
      //     this.form,
      //     this.form,
      //     {
      //       'hola' : 'mundo'
      //     }
      //   ]))
    },
  },
};
</script>
<style>
.container {
  width: 80%;
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
}
.input {
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border-color: #ccc;
  border-width: 1px;
  margin-top: 5px;
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 5px;
}
.select {
  width: 100%;
  height: 40px;
}
.input-textarea {
  height: 120px;
}
</style>