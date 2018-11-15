<template>
    <div id="app">
        <transition name="move" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    name: "app",
    // watch: {
    //     $route() {
    //         !localStorage.getItem("loanuser") ? this.$router.push("/login") : "";
    //     }
    // }
};
</script>
