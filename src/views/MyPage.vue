<template>
  <div>
    <div v-if="user">
      <div class="header">
        <div>
          <h1>{{user.name}}</h1>
          <h2>{{user.rights}}</h2>
        </div>
        <div>
          <p>
            <a href="#" @click="logout">
              <i class="fas fa-sign-out-alt"></i>
            </a>
            <escape-event @escape="escape"></escape-event>
          </p>
        </div>
      </div>
      <div id="box">
        <div class="form">
          <h1>Clock In or Out</h1>
          <p name="in" id="clock" placeholder="Current Time"></p>
          <button type="submit" @click="submitIn" id="in">Clock-In</button>
          <button type="submit" @click="submitOut" id="out">Clock-Out</button><br/>
        </div>
        <table class="table">
          <thead>
              <th>Date</th>
              <th>Clock-In</th>
              <th>Clock-Out</th>
          </thead>
          <tbody v-for="row in rows">
              <tr>
                  <td>{{ row.date }}</td>
                  <td>{{ row.clockIn }}</td>
                  <td>{{ row.clockOut }}</td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="table" v-else>
      <p>You need to log in to start reporting your time</p>
      <router-link to="/login" class="pure-button">Login</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import EscapeEvent from "@/components/EscapeEvent.vue";

export default {
  name: "mypage",
  components: {
    EscapeEvent,
  },
  data() {
    return {
      show: false,
      rows: [],
      lastAdded: [],
      lastAddedOut: [],
      date: '',
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  async created() {
    await this.$store.dispatch("getUser");
    this.getTime()
    this.getDate()
    this.getAll()
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
    async getTime(){
      setInterval (function(){
        const time = new Date();
        if (document.getElementById('clock') != null){
           document.getElementById('clock').innerHTML = time.toLocaleTimeString();
        }
      }, 1000);
    },
    async getDate(){
      let currentDate = new Date();
      let dateFormat = currentDate.toDateString();
      this.date = dateFormat;
    },
    async submitIn(){//GET ITEMS FROM DB THEN DO THE COMPARISON
      try {
        
        let inTime = document.getElementById('clock').innerHTML;
        let response = await axios.post("/api/clock/clockIn/" + inTime, {
            date: this.date,
            username: this.user.username
        })
        this.lastAdded = JSON.stringify(response.data);
        console.log(this.lastAdded);
        if (this.lastAdded === '"CLOCKED IN"'){
            alert(this.lastAdded)
            this.getAll();
        }
        else {
            alert('ERROR')
        }
      }catch (error){
        console.log(error)
      }
    },
    async submitOut(){
      try {
        let inTime = document.getElementById('clock').innerHTML;
        let response = await axios.put("/api/clock/clockOut/" + inTime, {
          date: this.date,
          username: this.user.username
        })
        this.lastAddedOut = JSON.stringify(response.data);
        if (this.lastAddedOut === '"CLOCK OUT NOT FOUND. Contact you supervisor"'){
          alert(this.lastAddedOut)
        }
        else {
          alert('CLOCKED OUT')
          this.getAll();
        }
      }catch (error){
        console.log(error)
      }
    },
    async getAll (){
      try {
        if (this.user){
          let response = await axios.get('/api/clock/getAll/' + this.user.username);
          this.rows = response.data;
        }
      }
      catch(e){
          console.log(e)
      }
    },
  }
};
</script>

<style scoped>

.table {
  border: 1px solid rgba(0,0,0,0.2);
  width: 100%;
  text-align: center;
}

.table th {
  width: 33%;
  border-bottom: 3px solid black;
  margin: 10px;
  padding: 10px;
  font-size: 18px;
  background-color: rgba(255, 236, 94, 0.8);
}

.table td {
  border-bottom: 1px solid rgba(0,0,0,0.2);
  text-align: center;
  margin: 5px;
  padding: 10px;
}

tr:hover {
  background-color: rgba(255, 236, 94, 0.8);
}

#clock {
  font-weight: bold;
  font-size: 30px;
  background-color: rgba(255, 236, 94, 0.9);
  border-radius: 10px;
  width: 50%;
  margin-left: 25%;
}

#box {
  text-align: center;
}

.form {
  padding-bottom: 50px;
  border: 2px solid black;
  width: 30%;
  margin-left: 35%;
  margin-bottom: 10px;
  border-radius: 2px;
}

#in {
  border-radius: 3px;
  border: 1px solid rgb(10, 54, 10);
  background-color: rgb(113, 184, 8);
  font-weight: bold;
  font-size: 22px;
  width: 120px;
  height: 40px;
  margin: 5px;
  transition: all 0.5s ease;
}

#in:hover, #out:hover {
  width: 140px;
  height: 50px;
}

#out {
  border-radius: 3px;
  border: 1px solid rgb(110, 19, 19);
  background-color: rgb(253, 122, 122);
  font-weight: bold;
  font-size: 22px;
  width: 120px;
  height: 40px;
  margin: 5px;
  transition: all 0.5s ease;
}

.pure-button {
  margin: 0px 20px;
}

.header {
  display: flex;
}

.header .button {
  margin-left: 50px;
  order: 2;
}

.header {
  display: flex;
}

.header a {
  padding-left: 50px;
  color: #222;
  font-size: 2em;
}

.header svg {
  margin-top: 12px;
}

@media only screen and (max-width: 1100px){
  #clock {
    font-size: 20px;
  }

  .form {
    width: 80%;
    margin-left: 10%;

  }
}

@media only screen and (max-width: 600px){
  #clock {
    font-size: 20px;
  }

  .form {
    width: 100%;
    margin: 0px 0px 10px 0px;

  }
}


</style>