<template>
  <div class="home">
    <div class="banner-content p-relative">
      <img class="banner-bg" src="@/assets/bg1.jpg" alt="" />
      <div class="content p-absolute">
        <div class="text-4xl font-bold">Link up & Grow up</div>
        <div>
          where you can link up with awesome educators who <br />
          are ready to help you learn and grow!
        </div>
        <router-link to="/">Link Now</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="Home"></script>

<style lang="scss" scoped>
.home {
  width: 100%;
  min-width: 980px;
  margin: 0 auto;
}
.banner-content {
  width: 100%;
  height: 740px;

  .content {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

.banner-bg {
  width: 100%;
  height: 740px;
  object-fit: cover;
  object-position: 50% 50%;
}
</style>
