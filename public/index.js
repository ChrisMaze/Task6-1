

function calculatePrice() {
  var count = [];
  var aaaa = '';
  for (var i=0;i<loadAllItems().length;i++)
  {
    if(document.getElementById('a'+i).value !='' && document.getElementById('a'+i).value!=0)
    {
      aaaa = document.getElementById("a"+i);
      count.push((aaaa.name +' x ' + aaaa.value).trim());
    }
  }
  //console.log(count);
  document.getElementById("message").innerHTML = bestCharge(count);
}

function clear() {
  document.getElementById("myform").reset();
}
