let catlistProduct=document.getElementById("catlist");
let txtproduct=document.getElementById("txtproduct");

let txtprice=document.getElementById("txtprice");
let txtquantity=document.getElementById("txtquantity");
let txtdiscount=document.getElementById("txtdiscount");
let txttotal=document.getElementById("txttotal");

let btnaddproduct=document.getElementById("btnaddproduct");
let btnclearall=document.getElementById("btnclearall");
let tbodyproduct=document.getElementById("tbodyproduct");

let idproduct;
// let urlProduct='http://192.168.56.1/api/Product/';




// I Want TO Delete To Check 
 let urlProduct='http://localhost:5065/api/Product/';

 clearAllData=()=>{
    catlistProduct.selectedIndex=0;
    txtproduct.value='';
    txtprice.value=0;
    txtquantity.value=0;
    txtdiscount.value=0;
    txttotal.value=0;
}

getTotal=()=>{

if(txtprice.value <0 || txtquantity <0){
    toastr.error("Number Less than zero");
}else if(txttotal.value< 0){
    toastr.error("You Should Revision Number");

}else{
    let totalPrice=(+txtprice.value * +txtquantity.value)- +txtdiscount.value;
    txttotal.value=totalPrice;
}
}

checkVildation=()=>{
    let IsValid=true;
    if(catlistProduct.options[catlistProduct.selectedIndex].text =='Select Category..'){
        toastr.error(`Error You Should Select Category`,"error");
        IsValid=false;
    }
    if(txtproduct.value ==''){
        toastr.error(`Error`,"error");
        IsValid=false;
    
    }
    if(txtprice.value <=0 &&txtquantity.value<=0 && txttotal.value<=0){
    toastr.error(`Error You Should Write Number `,"error");
    IsValid=false;
    
    
    }
  return  IsValid;

}

showAllProduct=()=>{

 
  let  table='';
    Helper.AjaxCallGet(`${urlProduct}GetAll`,(data)=>{
        if(data.length>0){
       
            data.forEach(element => {    
                table+=`
                <tr>
                <td>${element.id}</td>
                <td>${element.category.name}</td>
                <td>${element.name}</td>
                <td>${element.price}</td>
                <td>${element.quantity}</td>
                <td>${element.discount}</td>
                <td>${element.total}</td>
                <td> <button class="btn btn-primary" onclick=showSelction(${element.id}) >Edit</button></td>
                <td><button class="btn btn-danger" onclick=deleteSelction(${element.id}) >Delete</button></td>
            </tr>
                    `
                    tbodyproduct.innerHTML=table;
                });
        }else{
            tbodyproduct.innerHTML=table='';
        }
       
    })
}


$(document).ready(function () {
  
//  showAllProduct();
   // showAllProduct.ajax.reload();

});
showSelction=(id)=>{
    idproduct=id;
    Helper.AjaxCallGet(`${urlProduct}GetOne/${id}`,(data)=>{


            txtproduct.value=data.name;

            txtquantity.value=data.quantity;
            txtdiscount.value=data.discount;
            txtprice.value=data.price
            txttotal.value=data.total;
            // catlistProduct.options[catlistProduct.selectedIndex]=data.categoryId;
            catlistProduct.value=data.categoryId;
          
           
            btnaddproduct.className="btn btn-warning mt-2";
            btnaddproduct.innerHTML="Updated";
            // secondary
            
      
    });
}
deleteSelction=(id)=>{
if(confirm("Are You Sure Delete")==true){

Helper.AjaxCallDelete(`${urlProduct}Delete/${id}`,(data)=>{
if(data !=null){
   
    // showAllProduct();
    showAllProduct.ajax.reload();
    toastr.success("Delete Succefuly ","Deleted");
    

}
})
}
}



addProduct=()=>{
    if(checkVildation()==false){
        return;
    }

    let objUdated={
        name:txtproduct.value,
        quantity:txtquantity.value,
        discount:txtdiscount.value,
        price:txtprice.value,
        total:txttotal.value,
        categoryId:catlistProduct.value
         };
   let data=JSON.stringify(objUdated);

    if(btnaddproduct.innerHTML=="Updated"){
        Helper.AjaxCallPut(`${urlProduct}Edit/${idproduct}`,data,(data)=>{
            if(data !=null){
            
                btnaddproduct.className.replace="btn btn-warning";
                btnaddproduct.className="btn btn-primary col-3";
                btnaddproduct.innerHTML="Add";
                // showAllProduct();
                showAllProduct.ajax.reload();
                clearAllData();
                toastr.success("Update Succefully","Success");

            }else{
                toastr.error("Update Failed","Failed");

            }
        })
    }
    if(btnaddproduct.innerHTML=="Add"){
   
        Helper.AjaxCallPost(`${urlProduct}Add`,data, (data)=>{
            if(data!=null){
                // showAllProduct();
                showAllProduct.ajax.reload();
                toastr.success(`Save  ${txtproduct.value}  Success `,"success");
                clearAllData();
        
            }else{
                toastr.error(`Save  ${txtproduct.value} Error`,"error");
            }
        })
    }
 

};


//To Sum Total By keyUp  
txtprice.addEventListener("keyup",getTotal);
txtquantity.addEventListener("keyup",getTotal);
txtdiscount.addEventListener("keyup",getTotal);
//To Sum Total By   change
txtprice.addEventListener("change",getTotal);
txtquantity.addEventListener("change",getTotal);
txtdiscount.addEventListener("change",getTotal);


btnaddproduct.addEventListener("click",addProduct);




