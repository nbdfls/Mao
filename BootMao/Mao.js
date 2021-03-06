var $activeSlide = $('.active'),
    $homeSlide = $(".slide"),
    $slideNavPrev = $("#prev"),
    $slideNavNext = $("#next"),
    jsonData,
    List ;

function init() {
    TweenMax.set($homeSlide.not($activeSlide), {autoAlpha: 0});
    console.log($homeSlide.not($activeSlide));
    $homeSlide.not($activeSlide).css('display','none');
    $(".slide:not('.active')").css("display",'none');
}


$(function ($) {

    List= $(".slide");

    $.getJSON("static/json1.json",function (json) {
        jsonData = json;

        var id = jsonData[0].id;
        var qusetion = jsonData[0].name;
        var ans = jsonData[0].ans;
        var answers = jsonData[0].content;



        $(".card-header").html(qusetion);
        console.log()
        for(let i = 0;i<3;i++){
            $(".answer").eq(i).html(answers[i]);
        }
    });

    init();
    $('.f1').click(function (e) {
        var index = $(e.currentTarget).index('button');
        var slideOut = List[index],
            slideIn = List[index+1],
            slideInAll = $(List[2]);
        moveSlide(slideOut, slideIn, slideInAll);
    })

    $('.submit').click(function (e) {
        console.log('submit');
        var index = $(e.currentTarget).index('button')-3;

        console.log("index is "+index);
        if(index<24) {
            var obj = {
                failed: false,
                id: index + 1,
                question: jsonData[index + 1].name,
                answerA: jsonData[index + 1].content[0],
                answerB: jsonData[index + 1].content[1],
                answerC: jsonData[index + 1].content[2],
            }
        }
        var answer = jsonData[index].ans;
        var choose = $(".active").find(".optionsRadios:checked").val();
        if(choose===answer){
            if(index===24){
                //跳转到成功页面
                location.href="succeed.html";
            }else {
                var slideOut = List[index + 3],
                    slideIn = List[index + 4],
                    slideInAll = $(List[2]);
                goToNextSlide(obj, slideOut, slideIn, slideInAll);
            }
        }else{
           obj.id = index+4;
           var  slideIn = List[28],
                slideOut = List[index+3];
           obj.failed = true;
           failedSlide(obj,slideOut, slideIn);
       }


    });
    $(".failbtn").click(function (e) {
        console.log('fail');
        var index = $(e.currentTarget).index('button');
        var returnIndex = $("#index").html();
        var obj={
            id:returnIndex
        }
        var slideIn = List[returnIndex],
            slideOut = List[index];
        console.log("我要回"+returnIndex);
        returnSlide(obj,slideOut,slideIn);

    })



})
function moveSlide(slideOut, slideIn, slideInAll) {
    var t1 = new TimelineLite(),
        index = $(slideIn).index(),
        size = $homeSlide.length;
    console.log(index);

    if(slideIn !== undefined) {
        t1
            .set(slideIn, {autoAlpha: 1, className: '+=active',display:'block'})
            .set(slideOut, {className: '-=active',visibility:'hidden'})
            .to(slideOut, 0.65, {backgroundPosition :'bottom', ease: Power3.easeInOut}, 0)
            .set(slideOut, {autoAlpha: 0})
            .to(slideIn, 1, {y: "-="+(index)+"00%", ease: Power3.easeInOut}, 0)
        //.fromTo(slideInContent, 0.65, {y: '+=40px'}, {y : 0, ease: Power3.easeInOut}, "-=0.7")
        //.fromTo(slideInImg, 0.65, {backgroundPosition: 'bottom'}, {backgroundPosition: 'top', ease: Power3.easeInOut}, '-=0.7')
    }

    TweenMax.set($slideNavPrev, {autoAlpha: 1});
    TweenMax.set($homeSlide.not($activeSlide), {autoAlpha: 0});

    if(index === size - 1){
        TweenMax.to($slideNavNext, 0.3, {autoAlpha: 0.2, ease:Linear.easeNone});
    }
};

function goToNextSlide(obj,slideOut, slideIn, slideInAll) {

    console.log(obj);

    var t1 = new TimelineLite(),
        slideOutContent = $(slideOut).find('.card-content'),
        slideInContent = $(slideIn).find('.card-content'),
        slideOutImg = $(slideOut).find('.card-img'),
        slideInImg = $(slideIn).find('.card-img'),
        index = $(slideIn).index(),
        size = $homeSlide.length;

    console.log(index);
    var imgId = "asserts/"+(obj.id+1)+".jpg";

    $(slideIn).find('.answer').eq(0).html(obj.answerA);
    $(slideIn).find('.answer').eq(1).html(obj.answerB);
    $(slideIn).find('.answer').eq(2).html(obj.answerC);
    $(slideIn).find('.card-header').html(obj.question);
    $(slideIn).find('.card-theme').html('事件'+(obj.id+1));
    $(slideIn).find('.card-img').css("background-image",'url('+imgId+')');


    if(slideIn !== undefined) {
        t1
            .set(slideIn, {autoAlpha: 1, className: '+=active',display:'block'})
            .set(slideOut, {className: '-=active',visibility:'hidden'})
            .to(slideOutContent, 0.65, {y: "+=100px", ease: Power3.easeInOut}, 0)
            .to(slideOut, 0.65, {backgroundPosition :'bottom', ease: Power3.easeInOut}, 0)
            .set(slideOut, {autoAlpha: 0})
             .to(slideIn, 1, {y: "-="+(obj.id+3)+"00%", ease: Power3.easeInOut}, 0)
            // .fromTo(slideInContent, 0.65, {y: '-=0px'}, {y : "-=200%", ease: Power3.easeInOut}, "-=0.5")
            // .fromTo(slideInImg, 0.65, {y: '-=0px'}, {y : "-=200%", ease: Power3.easeInOut}, '-=0.5')
    }

    TweenMax.set($slideNavPrev, {autoAlpha: 1});
    TweenMax.set($homeSlide.not($activeSlide), {autoAlpha: 0});

    if(index === size - 1){
        TweenMax.to($slideNavNext, 0.3, {autoAlpha: 0.2, ease:Linear.easeNone});
    }
};

function failedSlide(obj,slideOut,slideIn){
    var t1 = new TimelineLite(),
        slideOutContent = $(slideOut).find('.card-content'),
        index = $(slideIn).index(),
        size = $homeSlide.length;
    console.log(index);
    $('#index').html(obj.id-1);
    $('#index').css('display','none');
    if(slideIn !== null) {
        t1
            .set(slideIn, {autoAlpha: 1, className: '+=active',display:'block'})
            .set(slideOut, {className: '-=active',visibility:'hidden'})
            .to(slideOutContent, 0.65, { ease: Power3.easeInOut}, 0)
            .to(slideOut, 0.65, {backgroundPosition :'bottom', ease: Power3.easeInOut}, 0)
            .set(slideOut, {autoAlpha: 0})
            .to(slideIn, 1, {y: "-"+obj.id+"00%", ease: Power3.easeInOut}, 0)
        // .fromTo(slideInContent, 0.65, {y: '-=0px'}, {y : "-=200%", ease: Power3.easeInOut}, "-=0.5")
        // .fromTo(slideInImg, 0.65, {y: '-=0px'}, {y : "-=200%", ease: Power3.easeInOut}, '-=0.5')
    }




}

function returnSlide(obj,slideOut,slideIn){
    var t1 = new TimelineLite(),
        slideOutContent = $(slideOut).find('.card-content'),
        slideInContent = $(slideIn).find('.card-content'),
        slideOutImg = $(slideOut).find('.card-img'),
        slideInImg = $(slideIn).find('.card-img'),
        index = $(slideIn).index(),
        size = $homeSlide.length;
//var returnIndex = ("#index").html();
    console.log(obj);

    if(slideIn !== undefined) {
        t1
            .set(slideIn, {autoAlpha: 1, className: '+=active',display:'block'})
            .set(slideOut, {className: '-=active',visibility:'hidden'})
            .to(slideOutContent, 0.65, { ease: Power3.easeInOut}, 0)
            .to(slideOut, 0.65, {backgroundPosition :'bottom', ease: Power3.easeInOut}, 0)
            .set(slideOut, {autoAlpha: 0})
            .to(slideIn, 1, { ease: Power3.easeInOut}, 0)
        // .fromTo(slideInContent, 0.65, {y: '-=0px'}, {y : "-=200%", ease: Power3.easeInOut}, "-=0.5")
        // .fromTo(slideInImg, 0.65, {y: '-=0px'}, {y : "-=200%", ease: Power3.easeInOut}, '-=0.5')
    }

}


function goToPrevSlide(slideOut, slideIn, slideInAll) {
    var t1 = new TimelineLite(),
        slideOutContent = slideOut.find('.card-content'),
        slideInContent = slideIn.find('.card-content'),
        slideOutImg = slideOut.find('.card-img'),
        slideInImg = slideIn.find('.card-img'),
        index = slideIn.index(),
        size = $homeSlide.length;

    if(slideIn.length !== 0) {
        t1
            .set(slideIn, {autoAlpha: 1, className: '+=active'})
            .set(slideOut, {className: '-=active'})
            .to(slideOutContent, 0.65, {y: "-=40px", ease: Power3.easeInOut}, 0)
            .to(slideOutImg, 0.65, {backgroundPosition :'top', ease: Power3.easeInOut}, 0)
            .to(slideInAll, 1, {y: "+=100%", ease: Power3.easeInOut}, 0)
            .fromTo(slideInContent, 0.65, {y: '+=40px'}, {y : 0, ease: Power3.easeInOut}, "-=0.7")
            .fromTo(slideInImg, 0.65, {backgroundPosition: 'bottom'}, {backgroundPosition: 'top', ease: Power3.easeInOut}, '-=0.7')
    }

    TweenMax.set($slideNavPrev, {autoAlpha: 1});

    if(index === 0){
        TweenMax.to($slideNavPrev, 0.3, {autoAlpha: 0.2, ease:Linear.easeNone});
    }
};


