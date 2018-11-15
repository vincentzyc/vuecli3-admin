<template>
    <div id="app">
        <Layout />
    </div>
</template>

<script>
import Layout from "@/components/layout";

export default {
    name: "app",
    components: {
        Layout
    },
    // watch: {
    //     $route() {
    //         if (!localStorage.getItem("loanuser")) {
    //             this.$router.push("/login");
    //         }
    //     }
    // }
};
</script>
