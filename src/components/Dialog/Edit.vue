<template>
  <div>
    <md-dialog
      :md-active.sync="showEditDialog"
      :md-close-on-esc="false"
      :md-click-outside-to-close="false"
      class="edit-dialog"
    >
      <form novalidate class="md-layout" @submit.prevent="validateEditData">
        <md-card class="md-layout-item md-size-100">
          <md-card-header>
            <div class="md-title">Edit data</div>
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
                :disabled="isEditing"
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
                :disabled="isEditing"
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

          <md-progress-bar md-mode="indeterminate" v-if="isEditing" />

          <md-card-actions class="md-card-actions md-alignment-right">
            <md-button type="button" class="edit-cancel-button md-primary" @click="close()"
              >Cancel</md-button
            >
            <md-button
              type="submit"
              class="edit-submit-button md-primary md-raised"
              :disabled="isEditing"
              >Edit</md-button
            >
          </md-card-actions>
        </md-card>
      </form>
    </md-dialog>

    <md-snackbar
      class="edit-dialog-snackbar"
      md-position="center"
      :md-duration="3000"
      :md-active.sync="dataEdited"
      >Successfully updated the record.</md-snackbar
    >
  </div>
</template>

<script>
import db from "../../firebase/firebaseInit";
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "Edit",
  mixins: [validationMixin],
  props: {
    showEditDialog: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isEditing: false,
      dataEdited: false,
      formData: {
        type: "values",
        title: "",
        description: "",
      },
    };
  },
  watch: {
    data: function (newData, oldData) {
      if (newData.id != oldData.id) {
        this.formData.type = this.type;
        this.formData.title = newData.title;
        this.formData.description = newData.description;
      }
    },
    showEditDialog: function (newData) {
      if (newData) {
        this.formData.type = this.type;
        this.formData.title = this.data.title;
        this.formData.description = this.data.description;
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
    },
    async validateEditData() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        await this.editData();
      }
    },
    editData() {
      if (this.type != "values" && this.type != "principles") {
        return;
      }
      if (this.isAdding) {
        return;
      }

      this.isEditing = true;
      const collection = this.type;
      db.collection(collection)
        .doc(this.data.id)
        .update({
          title: this.formData.title,
          description: this.formData.description,
        })
        .then(() => {
          this.dataEdited = true;
          this.$emit("refresh", this.type);
          this.close();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isEditing = false;
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
  },
};
</script>

<style>
.edit-dialog .md-dialog-container {
  min-width: 40%;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>