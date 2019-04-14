<style scoped>
	.dailyinfobox{
		padding: 0;
		background-color: white;
		box-shadow: 0px 0px 10px black;
		border-radius: 4px;
		overflow: hidden;
	}
	.hd{
		height:30px;
		text-align: center;
		font-weight: bold;
	}
	.bd{
		position: relative;
		padding: 10px;
		padding-left: 20px;
	}
	.inner{
		width:100%;
		height:384px;
		position: relative;
	}
	.s{
		position: absolute;
		background-color: pink;	
		font-size: 12px;
		
	}
	.keduxian div{
		height:16px;
		border-top: 1px solid #eee;
		box-sizing:border-box;
	}
	.keduxian div span{
		position: relative;
		top: -10px;
		left:-16px;
		font-size: 12px;
		color:#333;
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
</style>


<template>
	<div class="dailyinfobox">
		<div class="hd">
			{{dailyinfo.year}}年{{dailyinfo.month}}月{{dailyinfo.date}}日
		</div>
		<div class="bd">
			<div class="inner">
				<div v-for="item in dom" v-bind:style="item.style" v-bind:class="['s',item.classname]">
					{{item.title}}
				</div>

				<div class="keduxian">
					<div v-for="number in 25"><span>{{number - 1}}</span></div>
				</div>
			</div>
			
		</div>
		
	</div>
</template>

<script type="text/javascript">
	export default {
		props : ["dailyinfo"],
		computed : {
			dom(){
				//给今天的事件按照开始时间早晚排序
				this.dailyinfo.dailyschedule.sort(function(a,b){
					if(a.hour > b.hour){
						return 1;
					}else if(a.hour == b.hour){
						if(a.minutes > b.minutes){
							return 1;
						}
					}
					return -1;
				});

				//给所有的事件JSON加上两个属性bingpaishuliang（并排数量）、bingpaixuhao（并排序号）
				this.dailyinfo.dailyschedule.forEach(function(item){
					item.bingpaishuliang = 1;	//1就表示这一行就我一个，2就是两个人并排
					item.bingpaixuhao = 0;
					item.bingpaiyuansu = [];		//并排元素的序号列表，只存储自己之前的元素，目的是为了反向影响一下。
				});

				//遍历每一个事情
				for(var i = 0 ; i < this.dailyinfo.dailyschedule.length ; i++){
					//遍历后面的事情，看看有没有事情和现在这个事情重合
					for(var j = i + 1 ; j < this.dailyinfo.dailyschedule.length ; j++){
						if(this.dailyinfo.dailyschedule[j].hour < this.dailyinfo.dailyschedule[i].hour2 || (this.dailyinfo.dailyschedule[j].hour == this.dailyinfo.dailyschedule[i].hour2 && this.dailyinfo.dailyschedule[j].minutes < this.dailyinfo.dailyschedule[i].minutes2)){
							

							//改变两个元素的并排数量
							this.dailyinfo.dailyschedule[i].bingpaishuliang++;
							this.dailyinfo.dailyschedule[j].bingpaishuliang = this.dailyinfo.dailyschedule[i].bingpaishuliang;

							this.dailyinfo.dailyschedule[j].bingpaixuhao = this.dailyinfo.dailyschedule[i].bingpaixuhao + 1;

							this.dailyinfo.dailyschedule[j].bingpaiyuansu.push(i);
							//影响之前和自己重合的元素的数值
							var self = this;
							this.dailyinfo.dailyschedule[i].bingpaiyuansu.forEach(function(number){
								self.dailyinfo.dailyschedule[number].bingpaishuliang ++;
							});
						}
					}
				}
 
				//计算每个像素代表的分钟
				var ppm = 16 / 60;	//每分钟是多少像素
				var self = this;

				var domarr = [];

				//遍历每一个schedule
				this.dailyinfo.dailyschedule.forEach((item)=>{
					//计算top、height
					//top值就是自己的开始小时:开始分钟， 换算为到午夜0点的分钟数，乘以一个ppm就是top
					//height就是自己的（结束小时:结束分钟）-(开始小时:开始分钟) 之间的分钟数乘以一个ppm就是height
					var kaishi = new Date(item.year, item.month , item.date , item.hour , item.minutes);
					var jieshu = new Date(item.year, item.month , item.date , item.hour2 , item.minutes2);
					var wuye = new Date(item.year, item.month , item.date , 0 , 0);

					var top = (kaishi - wuye) / 1000 / 60 * ppm + "px";
					var height = (jieshu - kaishi) / 1000 / 60 * ppm + "px";
					var width = 100 / item.bingpaishuliang + "%";
					var left = 100 / item.bingpaishuliang * item.bingpaixuhao + "%";

					domarr.push({
						"style" : {
							"top" : top,
							"height" : height,
							"width" : width,
							"left" : left
						},
						"title" : item.title,
						"classname" : item.type
					})
				});
			 	
				return domarr;
			}
		}	
	}

</script>