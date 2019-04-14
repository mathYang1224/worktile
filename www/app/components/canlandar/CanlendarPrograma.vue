<style scoped>
	.scoped{
		float: left;
		width:30%;
	}
 
 	.monthbtnbox span{
	    font-size: 20px;
	    font-family: "微软雅黑";
 	}
 	.monthbtnbox button{
 		font-size: 12px;
 		font-weight: bold;
 		outline: none;
 		margin: 0 10px;
 	}
 	.topbar{
 		padding-top: 20px;
 	}
</style>
<template>
	<section>
		<div class="container">
			<div class="row">
				<div class="left col-lg-3">1</div>
				<div class="right col-lg-9">
					<div class="row topbar">
						<div class="monthbtnbox col-lg-4">
							<button class="btn btn-sm" @click="gotoprevmonth"> < </button>
							<span>{{$store.state.nowshow.year}}年{{$store.state.nowshow.month}}月</span>
							<button class="btn btn-sm" @click="gotonextmonth"> > </button>
						</div>
						<div class="col-lg-8 text-right">
							<button class="btn btn-lg btn-success" data-toggle="modal" data-target="#addbox">+ 增加日程</button>

							<div class="btn-group btn-group-lg" role="group" aria-label="...">
								<button type="button" v-bind:class="['btn' ,'btn-default' , {'active' : section=='月视图'}]" @click="changesection('月视图')">月视图</button>
								<button type="button" v-bind:class="['btn' ,'btn-default' , {'active' : section=='周视图'}]" @click="changesection('周视图')">周视图</button>
								<button type="button" v-bind:class="['btn' ,'btn-default' , {'active' : section=='日视图'}]" @click="changesection('日视图')">日视图</button>
							</div>
						</div>
					</div>
					<div class="row">
						<month-canlendar v-if="section=='月视图'" ref="bigcanlendar" v-on:modify="modify"></month-canlendar>
						<week-canlendar v-if="section=='周视图'" ></week-canlendar>
						<day-canlendar v-if="section=='日视图'" ></day-canlendar>
					</div>
				</div>
			</div>
		</div>

		<!-- 弹出的“增加日程”对话框 -->
		<div class="modal fade" id="addbox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		  	<add-box v-on:closeaddbox="closeaddbox" ></add-box>
		</div>
		
		<!-- 弹出的“增加日程”对话框 -->
		<div class="modal fade" id="modifybox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
			<modify-box v-on:closemodifybox="closemodifybox" v-bind:info="info"></modify-box>
		</div>
	</section>
</template>

<script>
	import MonthCanlendar from "./MonthCanlendar.vue";
	import WeekCanlendar from "./WeekCanlendar.vue";
	import DayCanlendar from "./DayCanlendar.vue";
	import * as actions from "../../store/todo-types.js";
	import AddBox from "./AddBox.vue";
	import ModifyBox from "./ModifyBox.vue";

	export default {
		components : {
			MonthCanlendar,
			ModifyBox,
			AddBox,
			DayCanlendar,
			WeekCanlendar
		},
		data(){
			return {
				"info" : {
					 
				},
				"section" : "周视图" 
			}
		},
		methods : {
			changesection(str){
				this.section = str;
			},
			//右按钮
			gotonextmonth(){
				this.$store.commit(actions.GOTONEXTMONTH);
				//刷新：
				this.$refs.bigcanlendar.setCanlendar();
			},
			//左按钮
			gotoprevmonth(){
				this.$store.commit(actions.GOTOPREVMONTH);
				//刷新：
				this.$refs.bigcanlendar.setCanlendar();
				 
			},
			//关闭增加框
			closeaddbox(){
				$('#addbox').modal('hide');
				//刷新
				this.$refs.bigcanlendar.setCanlendar();
			},
			//修改
			modify(info){
				this.info = info;
				$('#modifybox').modal('show');
			},
			closemodifybox(){
				$('#modifybox').modal('hide');
				//刷新
				this.$refs.bigcanlendar.setCanlendar();
			},
		}
	};
</script>