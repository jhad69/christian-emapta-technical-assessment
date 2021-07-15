<template>
  <div>
    <md-snackbar
      md-position="center"
      :md-duration="3000"
      :md-active.sync="dataDeleted"
      >Successfully deleted the record.</md-snackbar
    >

    <md-dialog
      :md-close-on-esc="false"
      :md-click-outside-to-close="false"
      :md-active.sync="showDeleteDialog"
    >
      <md-card class="md-layout-item md-size-100">
        <md-card-header>
          <div class="md-title">Do you really want to delete this record?</div>
        </md-card-header>
      </md-card>

      <md-progress-bar md-mode="indeterminate" v-if="isDeleting" />

      <md-dialog-actions>
        <md-button class="md-primary" @click="close">Cancel</md-button>
        <md-button
          class="md-primary md-accent md-raised"
          :disabled="isDeleting"
          @click="deleteData"
          >Delete</md-button
        >
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import db from "../../firebase/firebaseInit";
export default {
  name: "Delete",
  props: {
    showDeleteDialog: {
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
      isDeleting: false,
      dataDeleted: false,
    };
  },
  methods: {
    close() {
      this.$emit("closeDeleteDialog", false);
    },
    deleteData() {
      if (this.isDeleting) {
        return;
      }

      this.isDeleting = true;
      const collection = this.type;
      db.collection(collection)
        .doc(this.data.id)
        .delete()
        .then(() => {
          this.dataDeleted = true;
          this.$emit("refresh", this.type);
          this.close();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isDeleting = false;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>