$(function () {

    var mobile   = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
    var touchstart = mobile ? "touchstart" : "mousedown";
    var touchend = mobile ? "touchend" : "mouseup";
    var touchmove = mobile ? "touchmove" : "mousemove";

    //闃绘灞忓箷婊戝姩
    $('html,body').on(touchmove,function(e){
        e.preventDefault()
    })
    // loading S
    TweenMax.set('.load-2',{rotation:-10})
    TweenMax.set('.load-3',{rotation:10})
    TweenMax.to('.load-2',.1,{rotation:10,repeat:-1,yoyo:true,ease:Linear.easeNone})
    TweenMax.to('.load-3',.1,{delay:.1,rotation:-10,repeat:-1,yoyo:true,ease:Linear.easeNone})
    // loading E

    var TD = {
        video: document.getElementById('video'),
        videoBox: $('.video-box'),
        drum1: document.getElementById('drum-1'),
        drum2: document.getElementById('drum-2')
    }
    
    TD.a = new TimelineMax();
    TD.a.from('.p2-4',1,{y:-1300,ease:Bounce.easeOut,onStart:function () {
        setTimeout(function () {
            TD.drum2.play();
        },300)
    }})
    TD.a.to('.p2-1',1,{height:586,ease:Expo.easeOut},'-=.2')
    TD.a.from('.p2-2',.6,{delay:.5,alpha:0,scale:3,ease:Expo.easeOut},'-=.5')
    TD.a.to('.p2-2-1',1,{alpha:0,scale:1.5,ease:Expo.easeOut,onStart:function () {
        $('.p2-2-1').show();
    }},'-=.4')
    TD.a.from('.p2-3',1,{alpha:0})
    TD.a.pause();

    TD.b = new TimelineMax();
    TD.b.to('.y-1',2,{x:-640,alpha:0,ease:Linear.easeNone})
    TD.b.to('.y-2',2,{x:640,alpha:0,ease:Linear.easeNone},'-=2')
    TD.b.to('.y-3',2,{x:640,y:-640,alpha:0,ease:Linear.easeNone},'-=2')
    TD.b.to('.y-4',2,{x:640,alpha:0,ease:Linear.easeNone},'-=2')
    TD.b.to('.y-5',2,{x:-640,alpha:0,ease:Linear.easeNone},'-=2')
    TD.b.to('.y-6',2,{y:640,alpha:0,ease:Linear.easeNone},'-=2')
    TD.b.to('.p1-drum',1,{delay:.2,y:600},'-=2')
    TD.b.pause();

    TD.c = new TimelineMax();
    TD.c.from('.y-1',1,{x:-640,alpha:0,ease:Expo.easeOut})
    TD.c.from('.y-2',1,{x:640,alpha:0,ease:Expo.easeOut},'-=1')
    TD.c.from('.y-3',1,{x:640,y:-640,alpha:0,ease:Expo.easeOut},'-=1')
    TD.c.from('.y-4',1,{x:640,alpha:0,ease:Expo.easeOut},'-=1')
    TD.c.from('.y-5',1,{x:-640,alpha:0,ease:Expo.easeOut},'-=1')
    TD.c.from('.y-6',1,{y:640,alpha:0,ease:Expo.easeOut},'-=1')
    TD.c.from('.p1-drum',1,{delay:.2,y:600,ease:Expo.easeOut},'-=1')
    TD.c.pause();


    var loadingPath='images/';
    var manifest=[
        {src:loadingPath+'load-1.png'},
        {src:loadingPath+'load-1.png'},
        {src:loadingPath+'load-2.png'},
        {src:loadingPath+'load-3.png'},
        {src:loadingPath+'p1-1.png'},
        {src:loadingPath+'p1-2.png'},
        {src:loadingPath+'p1-3.png'},
        {src:loadingPath+'p1-4.png'},
        {src:loadingPath+'p2-1.jpg'},
        {src:loadingPath+'p2-2.png'},
        {src:loadingPath+'p2-3.png'},
        {src:loadingPath+'p2-4.png'},
        {src:loadingPath+'p2-bg.png'},
        {src:loadingPath+'p3-1.png'},
        {src:loadingPath+'y-1.png'},
        {src:loadingPath+'y-2.png'},
        {src:loadingPath+'y-3.png'},
        {src:loadingPath+'y-6.png'}
        // {src:loadingPath+'drum-1.mp3'},
        // {src:loadingPath+'drum-2.mp3'}

    ];

    var manifest2 = [
    	// {src:loadingPath+'drum-1.mp3'},
    	// {src:loadingPath+'drum-2.mp3'}
    ]

    //棰勫姞杞藉浘鐗囷紝闊充箰
    var queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);
    queue.on("progress", handleOverallProgress, this);
    queue.on("complete", handleComplete, this);
    queue.loadManifest(manifest);

    // var myInstance = createjs.Sound.play("./images/drum-1.mp3");

    //loading
    function handleOverallProgress(event){
        $('.loadtext').text(Math.ceil(event.loaded*100)+"%");
    }

    function handleComplete() {
        $('.loading').fadeOut(function () {
            $('.loading').remove();
        })
        initPageMotion();
    }

    function initPageMotion() {
        $('.main').fadeIn(500,function () {
            TD.c.play();

            var queue2 = new createjs.LoadQueue();
            queue2.loadManifest(manifest);
            // document.addEventListener("WeixinJSBridgeReady", function() {
            //     TD.video.play();
            // });
        })
    }

    // 鎵撻紦
    TD.sum = 0;
    TD.spend = 0;
    TD.sunBool = true;
    TD.ro = 40;
    TD.setInterBool = true;
    TD.drumTime1 = true;
    TD.drumTime2 = true;
    TD.drumTime3 = false;
    TD.drumStop = null;
    TD.drumStop2 = null;
    $('.p1-drum').on(touchstart,function () {
        if(TD.sunBool){
            if(TD.drumTime1 && TD.drumTime2 ){
                TD.drumTime1 = false;
                TD.sum++;
                TD.spend++;

                // myInstance.restart()
                if( TD.sum % 2 == 1){
                    drumAnimate('.p1-2','.p1-4',TD.ro)
                }else {
                    drumAnimate('.p1-3','.p1-5',-TD.ro)
                }
            }

            if(TD.setInterBool){
                TD.setInterBool = false;

                TD.drumStop = setInterval(function () {
                    TD.spend--
                    if( TD.spend <= 0) TD.spend = 0;
                },500);
            }
            if( TD.spend == 3 ){
                TD.sunBool = false;
                TD.drumTime3 = true;
                // 鏁查紦澹�
                TD.drum1.play();

                TD.drumStop2 = setInterval(function () {
                    if( TD.drumTime3 ){
                        console.log(333)
                        TD.sum++;
                        if( TD.sum % 2 == 1){
                            drumAnimate('.p1-2','.p1-4',TD.ro)
                        }else {
                            drumAnimate('.p1-3','.p1-5',-TD.ro)
                        }
                    }
                },100)

                setTimeout(function () {
                    console.log('xxx')
                    $('.float-video').fadeOut(2000)
                    TD.b.play()
                    TD.video.play();  //瑙嗛鎾斁
                    clearInterval(TD.drumStop);
                    clearInterval(TD.drumStop2);
                },3000)


            }
        }

    })

    var m = true;
    $('.p1-drum').on(touchend,function () {
        if(m){
            TD.drum2.play();
            TD.drum2.pause();
            $('.t-1').fadeOut();
            m = false;
            TD.video.play();
            TD.video.pause();
        }
    })
    // 榧撴鏁堟灉
    function drumAnimate(obj1,obj2,time) {
        TweenMax.to(obj1,.1,{rotationX:time,rotationY:time,onComplete:function () {
            TD.drumTime1 = true;

            drumScale(obj2);
            TweenMax.to(obj1,.1,{rotationX:0,rotationY:0,onComplete:function () {

            }})
        }})
    }
    // 榧撳嵃鏁堟灉
    function drumScale(obj) {
        TweenMax.set(obj,{alpha:1,onComplete:function () {}})
        TweenMax.to(obj,.2,{scale:2,alpha:0,onComplete:function () {
            TweenMax.set(obj,{scale:1,onComplete:function () {}})
        }})
    }

    // 鐢佃瘽
    $('.p2-3').on(touchstart,function () {
        location.href = 'tel: 67896688'
    })

    // 瑙嗛鐩戝惉
    TD.video.addEventListener('timeupdate',function (e) {
        // console.log(2)
    })

    // 瑙嗛缁撴潫
    TD.video.addEventListener('ended',function (e) {
        TD.videoBox.fadeOut(500,function () {
            $(this).remove();
        })
        $('.p1-end').fadeIn(500,function () {
            TD.a.play();
        })
    })

    //闊充箰鎸夐挳
    // $('.musicicon').on(touchstart,function(){
    //     if($(this).hasClass('musicrotate')){
    //         bg.pause();
    //         $(this).removeClass('musicrotate');
    //         $(this).addClass('mmss');
    //     }else{
    //         bg.play();
    //         $(this).addClass('musicrotate');
    //         $(this).removeClass('mmss');
    //     }
    // })

});




