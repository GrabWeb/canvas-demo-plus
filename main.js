window.onload = function(){
    
    var yyy = document.getElementById('xxx');
    var context = yyy.getContext('2d');

    autoSetCanvasSize(yyy);

    listenToUser(yyy);

    /************************************/

    var eraserEnabled = false;
    eraser.onclick = function(){

        eraserEnabled = true;
        actions.className = 'actions x';   
    }
    brush.onclick = function(){
        eraserEnabled = false;
        actions.className = 'actions';
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
                console.log('开始触摸')
                //console.log(event)
                var x = event.touches[0].clientX;
                var y = event.touches[0].clientY;
                console.log(x,y)
                using = true;
        
                if(eraserEnabled){
                    context.clearRect(x-5, y-5, 10, 10);
                }else{
                    lastPoint = {'x': x,'y': y};
                    //drawCircle(x, y, 1);
                }
            }
            canvas.ontouchmove = function(){
                console.log('触摸移动')
                var x = event.touches[0].clientX;
                var y = event.touches[0].clientY;
                
                if(!using){return;}//判断提前
                
        
                if(eraserEnabled){
                    
                    context.clearRect(x-5, y-5, 10, 10);
                   
                    
                }else{
                    
                    var newPoint = {'x': x,'y': y};
                    //drawCircle(x, y, 1);
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
            
                    //不停更新当前点，防止出现每个点都只和第一点连接
                    lastPoint = newPoint;
                    
                }
            }
            canvas.ontouchend = function(){
                console.log('完毕')
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
                    //drawCircle(x, y, 1);
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
                    //drawCircle(x, y, 1);
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
        context.fillStyle = 'black';
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
    }

    function drawLine(x1, y1, x2, y2) {

        context.beginPath();
        context.strokeStyle = 'black';
        context.moveTo(x1, y1); //起点
        context.lineWidth = 5;
        context.lineTo(x2, y2); //终点
    
        context.stroke();
        context.closePath();

    }
    
}
