<template>
<div>
  <div id="logOut">
    <h1>Administration 
      <span>
        <a href="#" @click="logout">
          <i class="fas fa-sign-out-alt"></i>
        </a>
        <escape-event @escape="escape"></escape-event>
      </span>
    </h1>
  </div><hr/>
  <div v-if="user">
    <div v-if="user.rights === 'Admin'">
      <div class="adminMenu">
          <span>Seach User: <input v-model="username" type="text" value="" placeholder="Username" width="150px"><button @click="getAll">Search</button></span>
          <span><button @click="getAllUsers">Show All</button></span>
          <span><router-link to="/register" class="link"><button>Register</button></router-link></span>
      </div><br/>
      <table class="table">
        <thead>
            <th>Date</th>
            <th>Clock-In</th>
            <th>Clock-Out</th>
            <th>Username</th>
        </thead>
        <tbody v-for="row in rows">
          <tr>
              <td>{{ row.date }}</td>
              <td><input type="text" v-model="row.clockIn"></td>
              <td><input type="text" v-model="row.clockOut"></td>
              <td>{{ row.username }} | <button id="delete" @click="deleteItem(row._id)" class="btn btn-danger">X</button></td>
          </tr>
        </tbody>
      </table>
      <div id="save">
          <button @click="saveAll">Save</button>
      </div>
    </div>
    <div v-else>
      <p>This user does not have admin rights. Please, log out and login with an admin username.</p>
      <div>
        <p>
          <a href="#" @click="logout">Log Out
            <i class="fas fa-sign-out-alt"></i>
          </a>
          <escape-event @escape="escape"></escape-event>
        </p>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Please, login with a username that has admin rights. <br/><br/>
    <router-link to="/login">Login Here!</router-link></p>
  </div>
</div>
</template>

<script>
import EscapeEvent from "@/components/EscapeEvent.vue";
import axios from 'axios'

export default {
  name: "mypage",
  data() {
    return {
      show: false,
      rows: [],
      username: '',
    };
  },
   components: {
    EscapeEvent,
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  async created() {
    await this.$store.dispatch("getUser");
    this.getAllUsers()
  },
  methods: {
    async logout() {
      try {
        this.error = await this.$store.dispatch("logout");
      } catch (error) {
        console.log(error);
      }
    },
    escape() {
      this.show = false;
    },
    async getAllUsers (){
      try {
        let response = await axios.get('/api/clock/getAllUsers');
        this.rows = response.data;
      }
      catch(e){
        console.log(e)
      }
      this.username = ''
    },
    async getAll (){
      try {
        let response = await axios.get('/api/clock/getAll/' + this.username);
        this.rows = response.data;
      }
      catch(e){
        console.log(e)
      }
    },
    async saveAll(){    
        console.log(this.rows)
      try {
        let response = await axios.put('/api/clock/saveAll/' + this.username, {
          items: this.rows,
        });
        if (response.data === 'SAVED'){
          alert(response.data)
        }
        else {
          alert('SOMETHING WENT WRONG!')
        }
      }
      catch(e){
        console.log(e)
      }
      if (this.username === ''){
        this.getAllUsers()
      }
      else {
        this.getAll()
      }
    },
    async deleteItem(_id){
        let r = confirm("DO YOU WANT TO DELETE THIS ITEM?");
        if (r == true) {
          try {
            let response = await axios.delete('/api/clock/delete/' + _id);
            if (response.data === 'DELETED'){
                alert(response.data)
            }
            else {
                alert('SOMETHING WENT WRONG!')
            }
          }
          catch (e){
            console.log(e)
          }
        } 
        else {
          console.log('cancel')
        }
        this.getAllUsers()
    },
  },
}
</script>


<style scped>

#logOut h1 {
  text-align: center;
}

.adminMenu {
  width: 100%;
  text-align: center;
  height: 40px;  
}

.adminMenu span {
  padding: 15px;
}

.adminMenu button {
  margin-top: 6px;
  border-radius: 5px;
  font-weight: bold;
  background-color: rgba(255, 236, 94, 0.8);
  border: 2px solid;
  text-decoration: none;
  color: black;
}

.adminMenu input {
  width: 110px;
}

.table {
  text-align: center;
  width: 100%;
  border: 1px solid rgba(0,0,0,0.2)
}

.table th {
  background-color: rgba(255, 236, 94, 0.9);
  border-bottom: 3px solid black;
  padding: 10px;
  font-size: 20px;
}

.table td {
  border-bottom: 1px solid black;
  margin: 5px;
  padding: 10px;
  width: auto;
}

.table td input {
  background-color: rgba(255, 236, 94, 0.1);
  font-weight: bold;
  width: 110px;
}

#delete {
  border-color: rgb(110, 19, 19);
  background-color: red;
  border-radius: 5px;
}

#save {
  text-align: center;
  padding: 10px;
}

#save button {
  border: 1px solid rgb(10, 54, 10);
  background-color: rgb(113, 184, 8);
  border-radius: 5px;
  height: 30px;
  width: 100px;
  font-weight: bold;
}

@media only screen and (max-width: 600px){
  .table td {
    border-bottom: 1px solid black;
    margin: 0px;
    padding: 2px;
    width: auto;
  }

  .adminMenu {
    width: 100%;
    text-align: left;
  }

  .adminMenu span {
    padding: 3px;
  }
}

</style>