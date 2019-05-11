window.onload = function(){
    
    var yyy = document.getElementById('xxx');
    var context = yyy.getContext('2d');
    var lineWidth = 5;

    autoSetCanvasSize(yyy);

    listenToUser(yyy);

    /************************************/

    var eraserEnabled = false;
    brush.onclick = function(){
        eraserEnabled = false;
        brush.classList.add('active');
        eraser.classList.remove('active');
    }
    eraser.onclick = function(){
        eraserEnabled = true;
        eraser.classList.add('active');
        brush.classList.remove('active');
    }
    // eraser.onclick = function(){

    //     eraserEnabled = true;
    //     actions.className = 'actions x';   
    // }
    // brush.onclick = function(){
    //     eraserEnabled = false;
    //     actions.className = 'actions';
    // }
    

    //不同颜色区块功能
    black.onclick = function(){
        context.fillStyle = 'black';
        context.strokeStyle = 'black';
        black.classList.add('active');
        red.classList.remove('active');
        green.classList.remove('active');
        blue.classList.remove('active');
    }
    red.onclick = function(){
        context.fillStyle = 'red';
        context.strokeStyle = 'red';
        red.classList.add('active');
        black.classList.remove('active');
        green.classList.remove('active');
        blue.classList.remove('active');
    }
    green.onclick = function(){
        context.fillStyle = 'green';
        context.strokeStyle = 'green';
        green.classList.add('active');
        black.classList.remove('active');
        red.classList.remove('active');
        blue.classList.remove('active');
    }
    blue.onclick = function(){
        context.fillStyle = 'blue';
        context.strokeStyle = 'blue';
        blue.classList.add('active');
        black.classList.remove('active');
        green.classList.remove('active');
        red.classList.remove('active');
    }
    //粗细画笔功能
    thin.onclick = function(){
        lineWidth = 5;
    }
    thick.onclick = function(){
        lineWidth = 10;
    }
    //清除全屏功能
    clear.onclick = function(){
        context.clearRect(0, 0, yyy.width, yyy.height);
    }
    //下载保存图片功能
    download.onclick = function(){
        var url = yyy.toDataURL('image/png');//拿到画面数据
        var a = document.createElement('a');
        document.body.appendChild(a);

        a.href = url;
        a.download = "我的作品";
        a.target = '_blank';
        a.click();
    }

    /********************************/

    function autoSetCanvasSize(canvas){
        setCanvasSize();

        //监听页面窗口，获取实时宽高
        window.onresize = function(){
            setCanvasSize();
        }
    
        function setCanvasSize(){
            //获取页面宽高
            var pageWidth = document.documentElement.clientWidth;
            var pageHeight = document.documentElement.clientHeight;
            canvas.width = pageWidth;
            canvas.height = pageHeight;
        }
    }



    function listenToUser(canvas){
        
        var using = false;
        var lastPoint = {x: undefined, y: undefined};

        //特性检测
        if(document.body.ontouchstart !== undefined){
            //触屏设备
            canvas.ontouchstart = function(event){
                //console.log('开始触摸')
                //console.log(event)
                var x = event.touches[0].clientX;
                var y = event.touches[0].clientY;
                //console.log(x,y)
                using = true;
        
                if(eraserEnabled){
                    context.clearRect(x-5, y-5, 10, 10);
                }else{
                    lastPoint = {'x': x,'y': y};
                    drawCircle(x, y, 1);
                }
            }
            canvas.ontouchmove = function(){
                //console.log('触摸移动')
                var x = event.touches[0].clientX;
                var y = event.touches[0].clientY;
                
                if(!using){return;}//判断提前
                
        
                if(eraserEnabled){
                    
                    context.clearRect(x-5, y-5, 10, 10);
                   
                    
                }else{
                    
                    var newPoint = {'x': x,'y': y};
                    drawCircle(x, y, 1);
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
            
                    //不停更新当前点，防止出现每个点都只和第一点连接
                    lastPoint = newPoint;
                    
                }
            }
            canvas.ontouchend = function(){
                //console.log('完毕')
                using = false;
            }
        }else{
            //非触屏设备
            canvas.onmousedown = function(event){
           
            
                var x = event.clientX;
                var y = event.clientY;
                using = true;
        
                if(eraserEnabled){
                    context.clearRect(x-5, y-5, 10, 10);
                }else{
                    lastPoint = {'x': x,'y': y};
                    drawCircle(x, y, 1);
                }
        
            }
          
            canvas.onmousemove = function(event){
                var x = event.clientX;
                var y = event.clientY;
                
                if(!using){return;}//判断提前
                
        
                if(eraserEnabled){
                    
                    context.clearRect(x-5, y-5, 10, 10);
                   
                    
                }else{
                    
                    var newPoint = {'x': x,'y': y};
                    drawCircle(x, y, 1);
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
            
                    //不停更新当前点，防止出现每个点都只和第一点连接
                    lastPoint = newPoint;
                    
                }
        
            }
        
            canvas.onmouseup = function(event){
                using = false;
            }
        }
    
        
    }

    function drawCircle(x, y, radius){
        context.beginPath();
        //添加颜色后去掉试验使用色
        //context.fillStyle = 'black';
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
    }

    function drawLine(x1, y1, x2, y2) {

        context.beginPath();
        //添加颜色后去掉试验使用色
        //context.strokeStyle = 'black';
        context.moveTo(x1, y1); //起点
        context.lineWidth = lineWidth;
        context.lineTo(x2, y2); //终点
    
        context.stroke();
        context.closePath();

    }
    
}
