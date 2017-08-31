/**
 * Created by Administrator on 2017/5/1.
 */
//自己写的js脚本

//功能一：
//轮播图响应式布局  根据屏幕大小来确定使用什么图片展示
  $(function() {
     function resize() {
         //获取屏幕的宽度
         var clientWidth = $(window).width();
         //console.log(clientWidth);

         //和小屏幕比较
         var smWidth = clientWidth < 768;

         //循环遍历item
         $('#main_ad>.carousel-inner>.item').each(function(i,item){
             //    将js转换成jquery
             var item = $(item);
             var img = item.data(smWidth?'image-xs':'image-lg');
             //设置背景图片
             item.css('backgroundImage','url("'+img+'")');

             //item.data 是获取我们自定义的属性（data-xxx）函数参数是我们要获取的属性名称


             //当我们使用小图片的时候，宽高要等比例变化
             if(smWidth) {
                 item.html('<img src="'+img+'">');
             }
             else {
                 item.empty();
             }
         })

     }
      //链式编程 每调用一次就触发
      $(window).on('resize',resize).trigger('resize');


  //功能二
  //    产品推荐的选项卡内容 的上海和北京提示语
  //    初始化提示语  tooltips插件
      $('[data-toggle="tooltip"]').tooltip();



  //功能三
  //  产品推荐区域的滚动条
  //   给标签加一个容器
       var ul = $('.nav-tabs');

      //因为原来容器有一个padding值
      var width = 30;

      //遍历所有子元素
      ul.children().each(function (index, element) {
          //console.log($(element).width());

          //该宽度是一个总宽度(li的总和)
          width +=  $(element).width();
      })

      //将总宽度赋值给ul
      //判断屏幕宽度是否小于ul的宽度
      if(width > $(window).width()) {
          ul.css('width', width).parent().css('overflow-x','scroll');
      }


  //功能四
  //    点击注册事件  更改title属性值
      $('#news .nav-pills a').on('click', function () {
          //获取属性值
          var data = $(this).data('title');
          //设置属性值
          $('.news-title').text(data);

      })




      //功能五
      //    滑动轮播图
      //    步骤一：判断手指在轮播图滑动的方向
      //    步骤二：根据方向来设置显示上一张还是下一张图片

      //    获取轮播图的容器
      var carousel = $('.carousel');
      var startX = 0;
      var endX = 0;
      //设置滑动大于这个距离时才能滑动
      var offset = 50;

      //    记录手指一开始在轮播图上x的值
      carousel.on('touchstart', function (e) {
          startX = e.originalEvent.targetTouches[0].clientX;
          console.log(startX);
      })

      //    记录手指在轮播图上滑动x的值
      carousel.on('touchmove', function (e) {
          endX = e.originalEvent.targetTouches[0].clientX;
      })

      //    记录手指离开时在轮播图上x的值
      carousel.on('touchend', function (e) {
          console.log(endX);


  //    比较一开始和离开时在轮播图上的x值
  //        获取精度值，当大于某一个数值时滑动图片
         var distance = Math.abs(startX - endX);
       if(distance > offset) {
           //console.log(startX>endX?'向左':'向右');
           //设置向左或向右移动图片
           $(this).carousel(startX>endX?'next':'prev');
       }
      })
  });