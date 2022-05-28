const btn = document.getElementById("btn");

btn.addEventListener("click", function(){
    alert("This is Simple click Event");
});

addEventListener('hello',function(){
    alert('Custom event listener is dispatched')
});
 let event = new Event('hello',{bubbles:true});

 document.dispatchEvent(event);