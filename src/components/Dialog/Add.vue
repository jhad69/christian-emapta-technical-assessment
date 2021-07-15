<template>
  <div>
    <md-dialog
      :md-active.sync="showAddDialog"
      :md-close-on-esc="false"
      :md-click-outside-to-close="false"
      class="add-dialog"
    >
      <form novalidate class="md-layout" @submit.prevent="validateAddData">
        <md-card class="md-layout-item md-size-100">
          <md-card-header>
            <div class="md-title">Add data</div>
          </md-card-header>

          <md-card-content>
            <md-field :class="getValidationClass('type')">
              <label for="type">Type</label>
              <md-select
                name="type"
                id="type"
                v-model="formData.type"
                md-dense
                disabled
              >
                <md-option></md-option>
                <md-option value="values">Values</md-option>
                <md-option value="principles">Principles</md-option>
              </md-select>
              <span class="md-error">The type is required</span>
            </md-field>

            <md-field :md-counter="false" :class="getValidationClass('title')">
              <label for="title">Title</label>
              <md-input
                name="title"
                id="title"
                v-model="formData.title"
                :disabled="isAdding"
                maxlength="100"
              />
              <span class="md-error" v-if="!$v.formData.title.required"
                >The title is required</span
              >
              <span class="md-error" v-else-if="!$v.formData.title.minlength"
                >Invalid title</span
              >
            </md-field>

            <md-field :class="getValidationClass('description')">
              <label for="description">Description</label>
              <md-textarea
                name="description"
                id="description"
                v-model="formData.description"
                md-counter="500"
                :disabled="isAdding"
              />
              <span class="md-error" v-if="!$v.formData.description.required"
                >The description is required</span
              >
              <span
                class="md-error"
                v-else-if="!$v.formData.description.minlength"
                >Invalid description</span
              >
            </md-field>
          </md-card-content>

          <md-progress-bar md-mode="indeterminate" v-if="isAdding" />

          <md-card-actions class="md-card-actions md-alignment-right">
            <md-button type="submit" class="md-primary" @click="close()"
              >Cancel</md-button
            >
            <md-button
              type="submit"
              class="md-primary md-raised"
              :disabled="isAdding"
              >Add</md-button
            >
          </md-card-actions>
        </md-card>
      </form>
    </md-dialog>

    <md-snackbar
      md-position="center"
      :md-duration="3000"
      :md-active.sync="dataAdded"
      >Successfully added into {{ formData.type }}.</md-snackbar
    >
  </div>
</template>

<script>
import db from "../../firebase/firebaseInit";
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "AddDialog",
  mixins: [validationMixin],
  props: {
    showAddDialog: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isAdding: false,
      dataAdded: false,
      formData: {
        type: "values",
        title: "",
        description: "",
      },
    };
  },
  watch: {
    type: function (newType) {
      if (newType != this.formData.type) {
        this.formData.type = newType;
      }
    },
  },
  validations: {
    formData: {
      title: {
        required,
        minLength: minLength(3),
      },
      description: {
        required,
        minLength: minLength(3),
      },
      type: {
        required,
      },
    },
  },
  methods: {
    close() {
      this.$emit("close", false);
      this.clearForm();
    },
    async validateAddData() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        await this.addData();
      }
    },
    addData() {
      if (this.type != "values" && this.type != "principles") {
        return;
      }
      if(this.isAdding) {
        return;
      }

      this.isAdding=true;
      const collection = this.type;
      db.collection(collection)
        .add({
          title: this.formData.title,
          description: this.formData.description,
          dateAdded: new Date(),
        })
        .then(() => {
          this.dataAdded = true;
          this.$emit("refresh", this.type);
          this.close();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isAdding = false;
        });
    },
    getValidationClass(fieldName) {
      const field = this.$v.formData[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.formData.title = "";
      this.formData.description = "";
    },
  },
};
</script>

<style>
.add-dialog .md-dialog-container {
  min-width: 40%;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>