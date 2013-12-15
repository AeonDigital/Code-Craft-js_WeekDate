var WeekDate=new(function(){Date.prototype.AddDays=function(d){var o=this.Clone();o.setDate(this.getDate()+d);return o};Date.prototype.Clone=function(){return new Date(this.getTime())};Date.DifferenceInDays=function(d1,d2){return Math.round(Math.abs(d1-d2)/86400000)};Date.prototype.ToWeekFormat=function(is,f){var sR='';var y=WeekDate.YearOfWeekDate(this);var n=WeekDate.WeekNumberOfDate(this);var d=this.getUTCDay();if(n.toString().length==1){n='0'+n}is=(is==undefined)?true:is;f=(f==undefined)?'week':f;if(f=='week'){sR=y+'-W'+n;if(is){if(d=='0'){d='7'}sR+='-'+d}}else if(f=='weekbr'){sR=n+'W-'+y;if(is){if(d=='0'){d='7'}sR=d+'-'+sR}}return sR};String.prototype.DateOfWeek=function(){return WeekDate.DateOfWeek(this)};var WeekMember=function(sW){var oR={year:0,week:0,day:0};if(WeekDate.IsWeek(sW)){var wF=sW.toString().toLowerCase().replace('w','').replace(/-/g,' ').split(' ');if(wF.length==2||wF.length==3){if(wF.length==2){oR.day=1}if(wF[0].length==4){oR.year=wF[0];oR.week=wF[1];if(wF.length==3){oR.day=wF[2]}}else{if(wF.length==3){oR.year=wF[2];oR.week=wF[1];oR.day=wF[0]}else{oR.year=wF[1];oR.week=wF[0]}}}}if(oR.year==0||oR.week==0||oR.day==0){oR=null}else{oR.year=parseInt(oR.year,10);oR.week=parseInt(oR.week,10);oR.day=parseInt(oR.day,10)}return oR};var static={FirstWeekOfYear:function(y){var o=new Date(y,0,1);o=o.AddDays((parseInt((11-o.getDay())%7,10)));return o.AddDays(-3)},LastWeekOfYear:function(y){var o=this.FirstWeekOfYear(y+1);return o.AddDays(-7)},WeeksInYear:function(y){var lW=this.LastWeekOfYear(y);lW=lW.AddDays(7);return(Date.DifferenceInDays(lW,this.FirstWeekOfYear(y))/7)},YearOfWeekDate:function(d){var iR=d.getFullYear();if((d.getMonth()==0&&d.getDate()<=3)||(d.getMonth()==11&&d.getDate()>=29)){var lD=this.LastWeekOfYear(iR);lD=lD.AddDays(6);if(d>lD){iR++}else{lD=this.LastWeekOfYear(iR-1);lD=lD.AddDays(6);if(d<=lD){iR--}}}return iR},WeekNumberOfDate:function(d){return parseInt(((Date.DifferenceInDays(this.FirstWeekOfYear(this.YearOfWeekDate(d)),d)/7)+1),10)},DateOfWeek:function(sW){var oD=null;if(arguments.length===1){if(this.IsWeek(sW)){var wM=WeekMember(sW);oD=this.DateOfWeek(wM.year,wM.week,wM.day)}}else{var y=(arguments[0]>9999)?9999:arguments[0];y=(y<1)?1:y;var mW=this.WeeksInYear(y);var n=arguments[1];n=(n<1)?1:((n>mW)?mW:n);var d=(arguments.length==3)?arguments[2]:1;d=(d<1)?1:((d>7)?7:d);oD=this.FirstWeekOfYear(y);oD=oD.AddDays(parseInt(((n-1)*7)+d-1,10))}return oD},IsWeek:function(sW){if(sW.length==7||sW.length==9||(sW.toLowerCase().indexOf('w')!=-1&&(sW.length==8||sW.length==10))){var wF=sW.toString().toLowerCase().replace('w','').replace(/-/g,' ').split(' ');if(wF.length==2||wF.length==3){var y=null;var n=null;var d=null;if(wF.length==2){d=1}if(wF[0].length==4){y=wF[0];n=wF[1];if(wF.length==3){d=wF[2]}}else{if(wF.length==3){y=wF[2];n=wF[1];d=wF[0]}else{y=wF[1];n=wF[0]}}if(!isNaN(y)&&!isNaN(n)&&!isNaN(d)){if(d>=1&&d<=7){if(n>=1&&n<=52||(n==53&&this.LastWeekOfYear(y)==53)){return true}}}}}return false}};return static});