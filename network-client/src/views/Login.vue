<template>
  <div class="login-page">
    <header> <h3>My Network</h3></header>
    <main class="form-group">
    <input type="text" v-model="email" placeholder="Email">
    <input type="paasword" v-model="password" placeholder="Paasword">
    <button class="login-btn" @click="login">Log In</button>
  </main>
  <footer>
    <p>Don't have an account? <router-link class="link" to="/register">Sign up</router-link></p>
    </footer>
  </div>
</template>
<script>
export default {
    name:'login',
    data ()  { 
            return {
            email:'',
            password:''
            }
    },
    methods :{
      login() {

        let api_url = "http://localhost:3000/"
        if(this.email == '' || this.password == '') return alert("please fill values")
        this.$http.post(api_url + 'user/login' , {
          email:this.email,
          password:this.password
        }).then(response =>{
          if(response.data.auth){
          localStorage.setItem('jwt', response.data.token)
          this.$router.push('/')
          

          }else{
            alert('error occured')
          }
        }).catch(err =>{
          console.log(err) 
        })
      
      }
    }
}
</script>
<style lang="scss" scoped>
.login-page{

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