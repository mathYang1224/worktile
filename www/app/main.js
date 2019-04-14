import Vue from "vue";
import Vuex from "vuex";
import App from "./components/App.vue";

//全局store
import store from "./store/index.js";


Vue.filter("time",function(value){
	return value.length == 1 ? "0" + value : value;
});
 
new Vue({
	el : "#app",
	store,
	components : {
		App
	}
});
