<template>
    <div class="register-bg">
        <div class="container">
            <div class="login-container">
                <div class="login-form">
                    <form @submit.prevent="registerUser">
                        <div class="login-form-items">
                             <span class="login-label">REGISTER</span>
    
                        <div class="text-input-container">
                            <label class="form-label">USERNAME</label>
                            <input type="text" name="username" v-model="username" class="text-style" required />

                            <label class="form-label">EMAIL</label>
                            <input type="email" name="email" v-model="email" class="text-style" required />

                            <label class="form-label">PASSWORD</label>
                            <input type="password" name="password" v-model="password" class="text-style" required />

                            <label class="form-label">PASSWORD CONFIRMATION</label>
                            <input type="password" name="password_confirmation" v-model="password_confirmation" class="text-style" required />
                        </div>

                        <p v-if="serverMessage" class="error-message">{{ serverMessage }}</p>

                        <button type="submit" class="login-btn">SIGN UP</button>
                        <router-link to="/login" class="login-btn1">SIGN IN</router-link>
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
import { ref, inject } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const someInjectedValue = inject('key')
    
    // Form state
    const username = ref('')
    const email = ref('')
    const password = ref('')
    const password_confirmation = ref('')
    const serverMessage = ref('')
    
    // Handle registration
    const registerUser = async () => {
      // Reset the server message before starting a new registration attempt
      serverMessage.value = ''
    
      // Basic validation
      if (!username.value || !email.value || !password.value || !password_confirmation.value) {
        serverMessage.value = "All fields are required!"
        return
      }
    
      if (password.value !== password_confirmation.value) {
        serverMessage.value = "Passwords do not match!"
        return
      }
    
      try {
        const res = await axios.post('http://localhost:3000/api/users', {
          username: username.value,
          email: email.value,
          password: password.value,
        })
    
        if (res.data.success === 1) {
          serverMessage.value = "Registered successfully!"
          // Redirect to login page after short delay
          setTimeout(() => router.push('/login'), 1000)
        } else {
          serverMessage.value = res.data.message || "Something went wrong."
        }
      } catch (err) {
        console.error(err)
        serverMessage.value = "Failed to register. Check console for errors."
      }
    }
    
    return {
      someInjectedValue,
      username,
      email,
      password,
      password_confirmation,
      serverMessage,
      registerUser,
    }
  }
}
    </script>
