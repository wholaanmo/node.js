<template>
  <header :class="{ 'scrolled-nav': scrolledNav}">
  <nav>
    <div class="branding">
      <p class="title">Money Log</p>
    </div>
  <ul v-show="!mobile" class="navigation">
    <li><router-link class="link" to="/home">HOME</router-link></li>
    <li><router-link class="link" to="/personal">PERSONAL</router-link></li>
    <li><router-link class="link" to="/group">GROUP</router-link></li>
    <li><router-link class="link" to="/view">VIEW</router-link></li>
    <li><router-link class="link" to="/about">ABOUT</router-link></li>     
    <router-link to="/profile" class="profile-trigger" aria-label="Profile">
      <i class="fas fa-user-circle" style="font-size: 30px; cursor: pointer;"></i>
  </router-link>

  </ul>
  <div class="icon">
      <i @click="toggleMobileNav" v-show="mobile" class="far fa-bars" :class="{'icon-active': mobileNav }"></i>
  </div>
  <transition name="mobile-nav">
    <ul v-show="mobileNav" class="dropdown-nav">
    <li><router-link class="link" to="/home">HOME</router-link></li>
    <li><router-link class="link" to="/personal">PERSONAL</router-link></li>
    <li><router-link class="link" to="/group">GROUP</router-link></li>
    <li><router-link class="link" to="/view">VIEW</router-link></li>
    <li><router-link class="link" to="/about">ABOUT US</router-link></li>   
    <router-link to="/profile" class="user" aria-label="Profile">
      <i class="fas fa-user-circle" style="font-size: 30px; cursor: pointer;"></i>
    </router-link>


  </ul>
  </transition>
  </nav>
  </header>

  <div class="container">
    <div>
      <img src="/LOGO.png" alt="Logo Image" class="logo" />
    </div>

    <div class="content">
      <h2>Track with ease,<br /> spend with peace!</h2>
      <p>
        Money Log is a budget tracker website focused on helping users manage and track their expenses. This program allows users to record their expenses, categorize transactions, and follow their financial budget over time.
        Money Log also provides a group expense feature that allows families, roommates, and groups of friends to track their joint expenses. Users can form groups, add shared expenses and provide an overview of the group expenses.
        This feature ensures that managing personal and group finances is easy and convenient.
      </p>
    </div>
  </div>
</template>



<script scoped>
export default {
  name: "navigation",
  data() {
    return {
      scrolledNav: null,
      mobile: null,
      mobileNav: null,
      windowwidth: null,

      // 👇 Add for protected data
      userInfo: null,
      error: null
    };
  },
  created() {
    window.addEventListener('resize', this.checkScreen);
    this.checkScreen();
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);

    // 🔐 Call protected API
    fetch('http://localhost:3000/api/users/', { // Changed port from 8000 to 3000
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('jsontoken'), // Changed from authToken
      'Accept': 'application/json'
    }
  })
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(data => {
      this.userInfo = data;
    })
    .catch(err => {
      console.error("API Error:", err);
      this.error = "Failed to load user data";
    });
},
  methods: {
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
    updateScroll() {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        return;
      }
      this.scrolledNav = false;
    },
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
    },
  },
};
</script>
