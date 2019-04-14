<style scoped>
	.box{
		position: relative;
	}
	table.bg-table{
		width:876px;
		border-collapse: collapse;
	}
	table.bg-table th.no0{
		width:50px !important;
	}
	table.bg-table th{
		height:20px;
		text-align: center !important;
		width:118px;
	}
	table.bg-table td{
		height:16px;
		width:118px;
		border: 1px solid #ccc;
	}
	table.bg-table td.tdno0{
		width:50px;
		color:#333;
		text-align: right;
	}
	.weekscheduletable{
		position: absolute;
		top: 0;
		left:0;
		width:100%;
		height:788px;
		padding-top: 20px;
		padding-left: 50px;
		box-sizing:border-box;
	}
	
	.weekscheduletable .inner{
		height: 768px;
	}
	.weekscheduletable .inner table{
		width:826px;
	}
	.weekscheduletable .inner table td{
		height: 768px;
		width:106px;
		position: relative;
		padding: 0 6px;
	}
	.weekscheduletable .inner table td .in{
		width:106px;
		position: relative;
		width:100%;
		height: 768px;
	}
	.s{
		position: absolute;
		top: 0;
		left:0;
		width:0;
		height:0;
	}
	.s.life{
		background:-webkit-linear-gradient(top,rgba(174, 213, 129, 0.49),rgba(76, 175, 80, 0.54));
	}
	.s.warning{
		background:-webkit-linear-gradient(top,darkred,red);
		color:white;
	}
	.s.work{
		background:-webkit-linear-gradient(top,rgba(255, 215, 0, 0.32),rgba(255, 165, 0, 0.61));
	}
	.s.important{
		background:-webkit-linear-gradient(top,rgba(135, 206, 235, 0.38),rgba(33, 150, 243, 0.7));
	}
	.s::after{
		content:"";
		position: absolute;
		bottom:-3px;
		left:0;
		width:100%;
		height:6px;
		background-color: orange;
		cursor: n-resize;
	}
</style>
<template>
	<div class="box">
		<table class="bg-table">
			<thead>
				<tr>
					<th class="no0"></th>
					<th v-for="(item,index) in datearr">{{item.day}} {{item.month}} {{item.date}}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="h in 48">
					<td class="tdno0" rowspan="2" v-if="h % 2 != 0"> {{(h + 1) / 2 - 1}}时</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
			</tbody>
		</table>
	

		<div  class="weekscheduletable">
			<div class="inner">
				<table>
					<tr>
						<td v-for="(td,index) in domdata" v-bind:data-idx="index" >
							<div class="in">
								<div class="s" v-for="(s,index) in td" v-bind:class="s.classname" v-bind:style="{'width' : s.width , 'height' : s.height , 'left' : s.left , 'top' : s.top}" v-bind:data-_id="s._id" v-bind:during="s.during">
									{{s.title}}
								</div>
							</div>
								
						</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				// 背景数据
				"datearr" : [
					{
						"day" : "周日",
						"month" : 5,
						"date" : 7
					},
					{
						"day" : "周一",
						"month" : 5,
						"date" : 8
					},
					{
						"day" : "周二",
						"month" : 5,
						"date" : 9
					},
					{
						"day" : "周三",
						"month" : 5,
						"date" : 10
					},
					{
						"day" : "周四",
						"month" : 5,
						"date" : 11
					},
					{
						"day" : "周五",
						"month" : 5,
						"date" : 12
					},
					{
						"day" : "周六",
						"month" : 5,
						"date" : 13
					}
				],
				//日程数据
				"schedules" : {
					"before" : [
						{
							"year" : 2017,
							"month" : 5,
							"day" : 1,
							"title" : "上英语课",
							"hour" : 10,
							"minuts" : 0,
							"hour2" : 11,
							"minuts2" : 0,
							"influence" : 3
						}
					],
					"thisweek" : [
						{
							"day" : "20170507",
							"schedule" : [
								{"title" : "吃饭" , "hour" : 10 , "minutes" : 0 , "hour2" : 15 , "minutes2" : 0,"type" : "life" , "year" : 2017 , "month" : 5 , "date" : 7 , "_id" : "sdfgsdgfdsfasdf"},
								{"title" : "吃晚饭" , "hour" : 16 , "minutes" : 0 , "hour2" : 17 , "minutes2" : 0,"type" : "life","year" : 2017 , "month" : 5 , "date" : 7, "_id" : "sdfgsdgfdsfaertertsdf"}
							]
						},
						{
							"day" : "20170508",
							"schedule" : [
								{"title" : "事情1" , "hour" : 10 , "minutes" : 0 , "hour2" : 15 , "minutes2" : 0,"type" : "life","year" : 2017 , "month" : 5 , "date" : 8, "_id" : "sdfgsdgfdsw4w45faertertsdf"},
								{"title" : "事情2" , "hour" : 12 , "minutes" : 0 , "hour2" : 17 , "minutes2" : 0,"type" : "life","year" : 2017 , "month" : 5 , "date" : 8, "_id" : "sdfgsdgfd345345sfaertertsdf"},
								{"title" : "事情3" , "hour" : 14 , "minutes" : 0 , "hour2" : 18 , "minutes2" : 0,"type" : "life","year" : 2017 , "month" : 5 , "date" : 8, "_id" : "sdfgsdgf4545faertertsdf"}
							]
						},
						{
							"day" : "20170509",
							"schedule" : [
								{"title" : "事情1" , "hour" : 10 , "minutes" : 0 , "hour2" : 15 , "minutes2" : 0 , "during" : 3,"type" : "life","year" : 2017 , "month" : 5 , "date" : 9, "_id" : "sdfgs4545dgfdsfaertertsdf"}
							]
						},
						{
							"day" : "20170510",
							"schedule" : [

							]
						},
						{
							"day" : "20170511",
							"schedule" : [

							]
						},
						{
							"day" : "20170512",
							"schedule" : [

							]
						},
						{
							"day" : "20170513",
							"schedule" : [

							]
						}
					] 
				},
				domdata : [[],[],[],[],[],[],[]]
			}
		}, //data
		mounted : function(){
			this.setCanlendar();
		},
		methods : {
			setCanlendar(){
				var self = this;

				var ppm = 32 / 60; //每分钟是多少像素
				//主要目的是将this.schedules变为this.domdata
				for(var i = 0 ; i < 7 ; i++){
					this.schedules.thisweek[i].schedule.forEach((item,index)=>{
						var top = (new Date(item.year, item.month , item.date , item.hour , item.minutes) - 
						          new Date(item.year, item.month , item.date , 0 , 0)) / 1000 / 60 * ppm + "px";
						var left = "0px";
						if(!item.during) item.during = 1;
						var width = 106 * item.during + 6 * 2 * (item.during - 1) + "px";
						var height = (new Date(item.year, item.month , item.date , item.hour2 , item.minutes2) - 
						          new Date(item.year, item.month , item.date , item.hour , item.minutes)) / 1000 / 60 * ppm + "px";
						
						self.domdata[i].push({
							"width" : width,
							"height" : height,
							"left" : left, 
							"top" : top,
							"classname" : item.type,
							"title" : item.title ,
							"_id" : item._id,
							"during" : item.during || 1
						});
					});
				}
			} 
		},
		updated : function(){
			var self = this;
			//所有因为数据改变而试图改变了的时候
			//updated并不是数据改变、props改变、computed改变而运行，而是因为他们视图改变的时候运行。也就是说，updated必须在mounted之后的视图变化才会有效果。
			$(".s").bind("mousedown" , function(event){
				event.preventDefault();
				var $this = $(this);
				 
				//按下的时候要得到序号
				var idx0 = Number( $this.parents("td").attr("data-idx") );	//按下去的时候
				var idx1 = Number( $this.parents("td").attr("data-idx") );	//移动到的时候
				var _id = $this.attr("data-_id");
				var during = Number( $this.attr("during") );
 

				if($(this).height() - event.offsetY < 6){
					$this.parents("table").bind("mousemove",function(event){
						event.preventDefault();
						var h = event.clientY + $(window).scrollTop() - $this.offset().top;
						$this.css("height" , h);
						return false;
					});
				}else{
					//如果没在底部边缘，此时是移动DOM
 					var mousestarty = event.pageY;
 					var domy = parseFloat($this.css("top"));

 					//在大表格上移动的时候，移动DOM所在的td。实际上通知Vue这个Dom换数组了！
 					$this.parents("table").bind("mousemove",function(event){
 						//重新决定idx1
 						idx1 = Number( $(event.target).parents("td").attr("data-idx"));
 						if(idx1 > 7 - during){
 							return;
 						}
 						//函数节流
 						if(idx0 != idx1 && idx1 != undefined && idx0 != undefined){
 							if($(event.target).parents("td").attr("data-idx") != undefined){
 								//从原数组中删除自己
 							 
 								var ltt = {};
 								//用数组方法，为了让数组变化能够引发视图变化，此时要这么写：
 								self.$set(self.domdata , idx0 , self.domdata[idx0].filter(function(it){
 									if(it._id == _id){
	 									ltt = it;
 									}
	 								return it._id != _id;
 								}));

 								self.domdata[idx1].push(ltt);
 								$(".s[data-_id=" + _id +"]").css({"width" : ltt.width , "height" : ltt.height , "top" : ltt.top , "left" : ltt.left});
 
 								idx0 = idx1;
 							}
 						}
						var mousey = event.pageY;

						//防止上面的事件走了，后面的事件跟着动
						//这里不能是$this，因为jQuery是一个类数组对象，是动态的。
						var top = domy + mousey - mousestarty > 0 ? domy + mousey - mousestarty : 0;
						$(".s[data-_id=" + _id +"]").css("top", top);
					});
				}


				$(document).bind("mouseup",function(event){
					$this.parents("table").unbind("mousemove");
				});
				return false;
			});
		}
	}
</script>