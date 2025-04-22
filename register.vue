    <script>
    import { ref } from 'vue'
    import axios from 'axios'
    import { useRouter } from 'vue-router'
    
    const router = useRouter()
    
    // Form state
    const username = ref('')
    const email = ref('')
    const password = ref('')
    const password_confirmation = ref('')
    const serverMessage = ref('')
    
    // Handle registration
    const registerUser = async () => {
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
    </script>
