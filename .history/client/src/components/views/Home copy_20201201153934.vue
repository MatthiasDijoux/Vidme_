<template>
  <div class="col-md-12">
    <div class="card card-container">
  <div class="container">
    <header class="jumbotron">
      <h3>{{content}}</h3>
      <div class="text-center">Bienvenu sur vidme</div>
    </header>

      <form name="form" @submit.prevent="handdleRoomAccess">
        <div class="form-group">
          <label for="room">Room</label>
          <input
            v-model="room"
            v-validate="'required'"
            type="text"
            class="form-control"
            name="room"
          />
          <div
            v-if="errors.has('room')"
            class="alert alert-danger"
            role="alert"
          >Room is required!</div>
        </div>
        <div class="form-group">
          <label for="pseudo">Pseudo</label>
          <input
            v-model="pseudo"
            v-validate="'required'"
            type="texte"
            class="form-control"
            name="pseudo"
          />
          <div
            v-if="errors.has('pseudo')"
            class="alert alert-danger"
            role="alert"
          >Pseudo is required!</div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Joindre le room</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
        </div>
      </form>
  </div>
  </div>
  </div>
</template>

<script src="../js/home.js"> </script>


<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>