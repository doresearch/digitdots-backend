<template>
  <div class="home">
    <div class="banner-content p-relative">
      <div class="banner-bg-wrap">
        <img class="banner-bg opacity-75" src="@/assets/bg1.jpg" alt="" />
      </div>
      <div class="content p-absolute text-white">
        <div class="text-4xl font-bold">Link up & Grow up</div>
        <div class="p-2 text-lg">
          where you can link up with awesome educators who <br />
          are ready to help you learn and grow!
        </div>
        <router-link class="mt-8 px-8 py-3 rounded bg-black text-white hover:bg-black/[0.8]" to="/"
          >Link Now</router-link
        >
      </div>
    </div>
    <div class="w-full h-16 pt-2 bg-black text-center text-white text-lg">First order get £30 off</div>
    <div class="flex">
      <div class="flex-1 pl-26">
        <p class="mt-40 text-2xl">What you met</p>
        <p class="text-6xl font-bold mt-12">
          “Will I be able to apply to <br />
          my dream school?”
        </p>
      </div>
      <div class="flex-1 pl-18">
        <p class="mt-120 text-2xl">What we offer</p>
        <p class="text-6xl font-bold mt-12">
          “Gives you a chance to talk <br />
          directly with educators at <br />
          your dream school.”
        </p>
      </div>
    </div>

    <div class="grid grid-rows-3 grid-cols-[100%] h-[466px] bg-slate-50">
      <p class="text-6xl font-bold mt-32 text-center">What will you get</p>
      <div class="flex mt-12">
        <div>
          <p class="text-2xl font-medium">Know more about your dream schools</p>
          <div>
            Connecting with a teacher can lead to personalized guidance tailored to your academic and career goals. They
            can help you choose the right
          </div>
        </div>
        <div>
          <p class="text-2xl font-medium">Know more about your major</p>
          <div>
            By discussing your academic and career interests with a teacher who has experience at the college, you can
            gain insights into how well the
          </div>
        </div>
        <div>
          <p class="text-2xl font-medium">Get a more professional tutorial</p>
          <div>A more professional critique of your work so that you can better improve the quality of your work.</div>
        </div>
      </div>
    </div>
    <Teacher />
  </div>
</template>

<script lang="ts" setup name="Home">
import Teacher from './Home/Teacher.vue'
</script>

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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.banner-bg-wrap {
  width: 100%;
  height: 740px;
  background: rgb(40, 26, 57);
}

.banner-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
}
</style>
