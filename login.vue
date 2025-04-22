<template>
    <div class="login-bg">
        <div class="container">
            <div class="login-container">
                <div class="login-form">
                <form @submit.prevent="loginUser">
                    <div class="login-form-items">
                        <span class="login-label">LOG IN</span>
                        <div class="text-input-container">
                        <label class="form-label">EMAIL</label>
                        <input v-model="email" type="text" name="email" class="text-style" required>
                        
                        <label class="form-label">PASSWORD</label>
                        <input v-model="password" type="password" name="password" class="text-style" required>
                        
                    </div>

                    <p style="color: red; margin-left: 15px;">{{ message }}</p>
                    
                        <button type="submit" class="login-btn">SIGN IN</button>
                        <router-link to="/register" class="login-btn">SIGN UP</router-link>
                    </div>
                </form>    
                </div>
                
        <div class="login-deco-container">
        <div class="login-deco">
        <span class="penny">MONEY <br> LOG</span>
            <img src="/LOGO.png" alt="Logo Image" class="deco-image">  
        </div>
        </div>
        </div>
        </div>
    </div>
    </template>
    
    <script>
    import { ref } from 'vue';
    import axios from 'axios';
    import { useRouter } from 'vue-router';
    
    export default {
      setup() {
        const router = useRouter();
        const email = ref('');
        const password = ref('');
        const message = ref('');
    
        const loginUser = async () => {
          message.value = ''; // Reset error message
    
          if (!email.value || !password.value) {
            message.value = 'Email and password are required!';
            return;
          }
    
          try {
            const response = await axios.post(
              'http://localhost:3000/api/users/login',
              {
                email: email.value,
                password: password.value,
              },
            );
    
            if (response.data.success === 1) {
              // Save token to localStorage (if using JWT)
              localStorage.setItem('jsontoken', response.data.token);
              
              // Redirect to dashboard/home
              router.push('/home');
            } else {
              message.value = response.data.message || 'Login failed.';
            }
          } catch (error) {
            console.error('Login error:', error);
            message.value = 'Invalid email or password.';
          }
        };
    
        return {
          email,
          password,
          message,
          loginUser,
        };
      },
    };
    </script>
