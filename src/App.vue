<template>
<div id="app">
  <div class="pure-menu">
    <ul class="pure-menu-list">
      <li class="pure-menu-heading"><img src="../public/bee.png" width="50px"></li>
      <li class="pure-menu-item">
        <router-link to="/" class="pure-menu-link">Home</router-link>
      </li>
      <li class="pure-menu-item">
        <router-link to="/mypage" class="pure-menu-link">My Page</router-link>
      </li>
      <li class="pure-menu-item">
        <router-link to="/admin" class="pure-menu-link">Admin</router-link>
      </li>
    </ul>
  </div>
  <div class="content">
    <img src="">
    <router-view />
  </div>
</div>
</template>

<style>
/* https://color.adobe.com/Ventana-Azul-color-theme-2159606/?showPublished=true */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 18px;
  display: flex;
  min-height: 100%;
}

.pure-menu {
  /* To limit the menu width to the content of the menu: */
  /* display: inline-block; */
  /* Or set the width explicitly: */
  text-align: left;
  background: rgba(0,0,0,0.8);
  width: 100px;
  border: 1px solid black;
}

.pure-menu-heading {
  text-align: center;
  color: black;
  font-weight: bolder;
  font-size: 1.2em;
  padding: 10px;
  background-color: rgba(255, 236, 94, 1);
  margin-bottom: 10px;
}

.pure-menu-link {
  color: #fff;
  padding: 10px;
  font-weight: 800;
}

.pure-menu-link:hover {
  background-color: rgba(255, 236, 94, 0.9);
  color: black;
}

.pure-menu-link.router-link-exact-active {
  background: #fff;
  color: black;
}

.content {
  margin: 50px 100px;
  width: 80%;
  border: 1px solid black;
  padding: 20px;
}

html {
  height: 100%;
  box-sizing: border-box;
}

body {
  height: 100%;
}

*,
*:before,
*:after {
  box-sizing: inherit;
  /* https://css-tricks.com/box-sizing/ */
}

.error {
  color: #F2385A;
}

.pure-button-primary {
  background-color: rgba(255, 236, 94, 0.8);
}

.pure-button {
  color: black !important;
  border: 1px solid black;
}

/* Modals */
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h1 {
  margin-bottom: 30px;
  font-size: 1.5em;
}

.modal-body {
  margin: 0;
}

.modal-body input {
  margin-bottom: 20px;
  height: 30px;
}

.modal-footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.modal-default-button {
  float: right;
}

/*
  * The following styles are auto-applied to elements with
  * transition="modal" when their visibility is toggled
  * by Vue.js.
  *
  * You can easily play with the modal transition by editing
  * these styles.
  */
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

@media only screen and (max-width: 600px){
  .content{
    width: 100%;
    margin: 0px;
    padding: 5px;
    border: none;
  }
  
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    font-size: 18px;
    display: block;
    min-height: 100%;
  }

  .pure-menu {
    /* To limit the menu width to the content of the menu: */
    /* display: inline-block; */
    /* Or set the width explicitly: */
    text-align: center;
    background: black;
    width: 100%;
    height: auto;
    border: 1px solid black;
  }

  .pure-menu-list {
    display: inline-flex;
  }

  .pure-menu-link {
    margin-top: 25px;
  }

  .pure-menu-heading {
    margin-top: 10px;
    margin-right: 10px;
  }
}

</style>
