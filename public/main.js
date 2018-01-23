var update = document.getElementById('update');

update.onclick = function(){
  // 发送put请求
  fetch('quotes',{
    methods: 'put',
    headers: {'Content-Type':'application/json'},
    body:JSON.stringify
  })
}