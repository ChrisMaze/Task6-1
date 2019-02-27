var amount = [];
var itemId = [];
var price = [];
var result = 0;
var discount = 0;
var nameAll = [];
var nameDis = [];

function toBeArr(inputs){
  var orderingMeals = '';
  for(var i=0; i<inputs.length;i++)
  {
    orderingMeals += inputs[i].split(' ')+',';
  }
  orderingMeals = orderingMeals.split(',');
  orderingMeals.pop();
  return orderingMeals;
}

function findInfo(inputs){
  var j = 0 , k = 0;
  for(var i=0;i<inputs.length;i++)
  {
    if(i % 3 == 1)
      continue;
    if(i % 3 == 2)
    {
      amount[j++]=inputs[i];
      continue;
    }
    itemId[k++]=inputs[i];
  }
}

function totalPri(){

  for(var i=0; i<itemId.length;i++)
  {
    for(var j=0;j<loadAllItems().length;j++)
    {
      if(itemId[i] == loadAllItems()[j].id)
      {
        price.push(loadAllItems()[j].price);
        nameAll[i] = loadAllItems()[j].name;
        result += price[i] * amount[i];
      }
    }
  }
}
function discCmp() {
  var k = 0;
  for(var i=0;i<itemId.length;i++)
  {
    for(var j=0;j<loadPromotions()[1].items.length;j++)
    {
      if(itemId[i]==loadPromotions()[1].items[j])
      {
          discount +=price[i]/2;
          nameDis[k++] = nameAll[i];
      }
    }
  }
  if(result>=30&&discount<6)
  {
    discount = 6;
  }

}
function bestCharge(inputs) {
  var outputs = '============= 订餐明细 =============\n';
  var supplement = '';
  var orderingMeals = toBeArr(inputs);
  console.log(orderingMeals);
  findInfo(orderingMeals);
  totalPri();
  discCmp();
  console.log(discount);
  if(discount == 6&&result>=30)
  {
    supplement+='使用优惠:\n' +
      '满30减6元，省6元\n' +
      '-----------------------------------\n'
  }else if (discount>0)
  {
    supplement +='使用优惠:\n' +
      '指定菜品半价(';
    for (var i=0;i<nameDis.length;i++)
    {
      supplement +=nameDis[i];
      if (i!=nameDis.length-1)
        supplement += ',';
    }
    supplement += ')，省'+discount+'元\n' +
      '-----------------------------------\n';
  }
  result -=discount;
  for(var i=0;i<nameAll.length;i++)
  {
    outputs += nameAll[i]+' x '+amount[i]+' = '+amount[i]*price[i]+'元\n';
  }
  outputs += '-----------------------------------\n'+supplement+'总计：'+result+'元\n===================================';


  return outputs.trim();
}
