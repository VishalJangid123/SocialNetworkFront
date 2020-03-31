<template>
 <div class="register-page">
    <header> <h3>My Network</h3></header>
    <main class="form-group">
    <input type="text" v-model="firstname" placeholder="Firstname">
    <input type="text" v-model="surname" placeholder="Lastname">
    
    <input type="text" v-model="email" placeholder="Email">
    <input type="paasword" v-model="password" placeholder="Paasword">
    <button class="login-btn" @click="register">Register</button>
    <div class="error_msg" v-if="hasError">
      {{error}}
    </div>
  </main>
  <footer>
    <p>Already a user? <router-link class="link" to="/login">Login</router-link></p>
    </footer>
  </div>
</template>
<script>
export default {
    name:'register',
    data() { return{
      firstname:"",
      surname:"",
      email:"",
      password:"",
      hasError : false,
      error:''

      }
    },
     methods :{
      register() {

        let api_url = "http://localhost:3000/"
        if(this.email == '' || this.password == '' || this.firstname == '' || this.surname == '') return alert("please fill values")
        this.$http.post(api_url + 'user/register' , {
          firstname:this.firstname,
          surname:this.surname,
          email:this.email,
          password:this.password
        }).then(response =>{
          if(response.data.auth){
          localStorage.setItem('jwt', response.data.token)
          this.$router.push('/')
          }else{
            this.error = response.data.msg
            this.hasError = true
          }
        }).catch(err =>{
          this.error = err
            this.hasError = true
        })
      
      }
    }
}
</script>

<style lang="scss" scoped>
.register-page{

  display:flex;
  height: 100%;
  flex-flow: column;
  height: 100vh;
  box-sizing: border-box;

  h3{
    text-align: center;
  }
}
.form-group{
  flex:1;
  justify-content: flex-start;
  display: flex;
  flex-flow: column;
  padding: 25px;
  input{
    width: 100%;
    height:30px;
    border: 1px solid #DDD;
    margin-bottom: 15px;
    text-indent: #EEE;
    padding: 2px 3px 4px 5px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

    &:focus{
      border: 1px solid #999;

    }
  }
  button{
    width:100%;
    height: 30px;
    background-color: #FFCE00;
    appearance: none;
    border: none;
    outline: none;
    border-radius:8px ;

    color:#171717;
    font-size:20px;
    font-weight: 700;
  }
  .error_msg{
    margin: 15px 0px;
    padding: 10px;
    background-color: rgba(255,0,0,0.2);
    color:#171717;
    font-weight: 700;
    border-radius: 8px;
  }
  
}
footer{
  //width: calc(100% - 50px);
  height:50px;
  background-color: #EEE;
  box-shadow: 0px -1px 3px rgba(0,0,0,0.2);
  padding: 15px 25px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  
  p{
    line-height: 40px;
    color:#888;
   
    font-size: 13px;
    margin:0;
    padding: 0;
  }
  .link{
    color:#E35205;
    text-decoration: none;
    font-weight: 300;
  }
}

</style>