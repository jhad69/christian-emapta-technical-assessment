<template>
  <div class="the-body">
    <h1>The Agile Manifesto</h1>
    <div class="the-body-content">
      <div v-if="isFetching" class="loader">
        <md-progress-spinner
          :md-diameter="100"
          :md-stroke="5"
          md-mode="indeterminate"
        ></md-progress-spinner>
      </div>
      <div v-else>
        <div class="values">
          <h2>
            <span>Values </span>
            <md-button
              class="md-icon-button md-primary"
              @click="showAddDialog ? null() : clickShowAddDialog('values')"
            >
              <md-icon>add</md-icon>
            </md-button>
          </h2>
          <div class="the-body-content-list-container">
            <ol>
              <li v-for="value in sampleDataValues" v-bind:key="value.id">
                <h3>
                  {{ value.title }}
                  <md-button class="md-icon-button md-primary">
                    <md-icon>edit</md-icon>
                  </md-button>
                  <md-button class="md-icon-button md-accent">
                    <md-icon>delete</md-icon>
                  </md-button>
                </h3>
                <p>
                  {{ value.description }}
                </p>
              </li>
            </ol>
          </div>
        </div>
        <div class="principles">
          <h2>
            <span>Principles </span>
            <md-button
              class="md-icon-button md-primary"
              @click="showAddDialog ? null() : clickShowAddDialog('principles')"
            >
              <md-icon>add</md-icon>
            </md-button>
          </h2>
          <div class="the-body-content-list-container">
            <ol>
              <li
                v-for="principle in sampleDataPrinciples"
                v-bind:key="principle.id"
              >
                <h3>
                  {{ principle.title }}
                  <md-button class="md-icon-button md-primary">
                    <md-icon>edit</md-icon>
                  </md-button>
                  <md-button class="md-icon-button md-accent">
                    <md-icon>delete</md-icon>
                  </md-button>
                </h3>
                <p>
                  {{ principle.description }}
                </p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <AddDialog
      :showAddDialog="showAddDialog"
      :type="addDialogType"
      @close="closeAddDialog"
      @refresh="refreshData"
    />
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";
import AddDialog from "./Dialog/AddDialog.vue";
export default {
  name: "TheBody",
  components: {
    AddDialog,
  },
  data() {
    return {
      isFetching: true,
      showAddDialog: false,
      addDialogType: "values",
      sampleDataValues: [],
      sampleDataPrinciples: [],
    };
  },
  methods: {
    clickShowAddDialog(formType) {
      this.showAddDialog = true;
      this.addDialogType = formType;
    },
    closeAddDialog() {
      this.showAddDialog = false;
    },
    async refreshData(type) {
      console.log("refreshData");
      console.log(type);
      if (type == "values" || type == "all") {
        this.isRefreshingValues = true;
        await this.getDataFromCollection("values");
        this.isRefreshingValues = false;
      } else if (type == "principles" || type == "all") {
        this.isRefreshingPrinciples = true;
        await this.getDataFromCollection("principles");
        this.isRefreshingPrinciples = false;
      }
    },
    async getAllData() {
      this.isFetching = true;
      await this.getDataFromCollection("values");
      await this.getDataFromCollection("principles");
      this.isFetching = false;
    },
    async getDataFromCollection(collection) {
      if (collection != "values" && collection != "principles") {
        return;
      }

      return db
        .collection(collection)
        .orderBy("dateAdded")
        .get()
        .then((querySnapshot) => {
          let dataArr = [];
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              ...doc.data(),
            };
            dataArr.push(data);
          });
          if (collection == "values") {
            this.sampleDataValues.splice(0);
            this.sampleDataValues = this.sampleDataValues.concat(dataArr);
          } else {
            this.sampleDataPrinciples.splice(0);
            this.sampleDataPrinciples =
              this.sampleDataPrinciples.concat(dataArr);
          }
        });
    },
  },
  async created() {
    await this.getAllData();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2,
h3 {
  margin: 20px 0;
  line-height: 40px;
}
.the-body {
  width: 100%;
  max-width: 1200px;
  display: inline-block;
  min-height: calc(100vh - 128px);
}

.the-body-content {
  margin: 60px 0 0 0;
  text-align: left;
}

.the-body-content .loader {
  text-align: center;
  margin-top: calc(10vh);
}

.the-body-content p {
  margin: 0 0 0 40px;
}

.the-body-content .md-icon-button {
  width: 25px;
  min-width: 25px;
  height: 25px;
  margin: 6px 0px;
  opacity: 0.3;
}

.the-body-content .md-icon {
  font-size: 16px !important;
}

.the-body-content .md-icon-button:hover {
  opacity: 1;
}

.the-body-content-title {
  margin: 30px 0 30px 40px;
}

.the-body-content-list-container {
  margin: 30px 0 30px 40px;
}

.the-body-content-list-container p {
  margin: 10px 0 10px 40px;
}

@media (max-width: 960px) {
  .the-body {
    min-height: calc(100vh - 96px);
  }
}

@media (max-width: 600px) {
  .the-body {
    min-height: calc(100vh - 112px);
  }
}
</style>
