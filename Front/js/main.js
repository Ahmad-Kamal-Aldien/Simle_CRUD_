let urlProduct2='http://localhost:5065/api/Product/GetAll';
let showAllProduct;


$(document).ready(function () {

// $('#example').DataTable();


showAllProduct=$('#example').DataTable({
    

        "ajax":{
            "url":urlProduct2,
                "dataSrc":''
            
        },
        "columns":[
            {data:"id"},
            {data:"category.name"},
            {data:"name"},
            {data:"price"},
            {data:"quantity"},
            {data:"discount"},
            {data:"total"},
            {data:"id",render:(dataaaaa)=>{
                return `
               <button class="btn btn-primary" onclick=showSelction(${dataaaaa}) >Edit</button>
               
                `
            }},
            {data:"id",render:(dataaaaa)=>{
                return `
         
                <button class="btn btn-danger" onclick=deleteSelction(${dataaaaa}) >Delete</button>
                `
            }},

        ]
   
    });


});




// WiTH Local Storagr

// let txtcategory=document.getElementById("txtcategory");
// let txtproduct=document.getElementById("txtproduct");
// let txtprice=document.getElementById("txtprice");
// let txtquantity=document.getElementById("txtquantity");
// let txtdiscount=document.getElementById("txtdiscount");
// let txttotal=document.getElementById("txttotal");
// let catlist=document.getElementById("catlist");

// let index;
// let txtinmodal=document.querySelector(".txtinmodal");

// let showCatInModat=document.getElementById("showCatInModat");

// let tbodyproduct=document.getElementById("tbodyproduct");
// let btnaddproduct=document.getElementById("btnaddproduct");

// let arr;
// let obj;
// let arrproduct;
// let objproduct;
// let option;
// let optionproduct;

// $(document).ready(function () {
//     fillCategory();
//     fillProduct();
//     $('#example').DataTable();
// });

// localStorage.categrory !=null ? arr=JSON.parse(localStorage.categrory) :arr=[];

// localStorage.product !=null ? arrproduct=JSON.parse(localStorage.product) :arrproduct=[];



// function addCategory(){
 
    
//         if(txtcategory.value !=''){
//             obj={
//                 name:txtcategory.value.toUpperCase()
//             }
//             arr.push(obj);
//             clearCategory();
//             localStorage.setItem('categrory',JSON.stringify(arr));
//             fillCategory();
//         }
//         else{
//             alert("Please Write a new category");
//         }

   

// }
// function clearCategory(){
//     txtcategory.value=''
// }

// function clearProduct(){
 
//     txtproduct.value='';
//     txtprice.value='';
//     txtquantity.value='';
//     txtdiscount.value='';
//     txttotal.value='';

//     fillCategory();
    

// }



// function fillCategory(){

//      option ='';
//      option+=`    <option value="">Select Category......</option>`;
//      for(let x=0;x<arr.length;x++){
//         option+=` 
//         <option value=${x}> ${arr[x].name}  </option>
//         `
//      }
//      catlist.innerHTML=option;

// }
// function deleteCategory(){
//     option ='';

//     for(let x=0;x<arr.length;x++){
//        option+=` 
      

//        <tr>
//        <td >${x}</td>
//        <td> <input class="form-control txtinmodal"  type="text" value="${arr[x].name}"></td>
//        <td><button class="btn btn-danger"  
//        onclick="deleteSelectCategory(${x})" >Delete</button> </td>
   
//    </tr>
//        `
//     }
//     showCatInModat.innerHTML=option;

 


    
// }
// function deleteSelectCategory(e){
// if(confirm("Are you sure you want to delete ")==true){
//     arr.splice(e,1);

//     localStorage.setItem("categrory",JSON.stringify(arr));
//     deleteCategory();
//     fillCategory();
// }
   
// }



// function getPrice(){

//     txttotal.value= (+txtprice.value* +txtquantity.value) - +txtdiscount.value;
//     if(txttotal.value <0){
//         txttotal.style.color="wihte";
//         txttotal.style.background="red";
//     }else{
//         txttotal.style.color="black";
//         txttotal.style.background="white"; 
//     }
// }


// function addProduct(){
//     if(btnaddproduct.innerHTML=="Update"){
//         arrproduct[index].category= catlist.options[catlist.selectedIndex].text;
//         arrproduct[index].product=txtproduct.value;
//         arrproduct[index].price=txtprice.value;
//         arrproduct[index].discount=txtdiscount.value;
//         arrproduct[index].total=txttotal.value;
//         arrproduct[index].quantity=txtquantity.value;
        
//         localStorage.setItem("product",JSON.stringify(arrproduct));
      
//         clearProduct();
//         fillProduct();
//         btnaddproduct.innerHTML="Add";

//     }else{
//         if(txtdiscount.value <=0){
//             txtdiscount.value=0; 
//         }
    
    
//     if(txtdiscount.value >txtprice.value ){
//         alert("Please Complete Data ");
//         return false;
//     }
//         if(catlist.options[catlist.selectedIndex].text!="Select Category......" && txtproduct.value !='' ){
//             objproduct={
//                 category:catlist.options[catlist.selectedIndex].text,
//                 product:txtproduct.value.toUpperCase(),
//                 price:txtprice.value,
//                 quantity:txtquantity.value,
//                 discount:txtdiscount.value,
//                 total:txttotal.value
                
//                     } ;
                
//                     arrproduct.push(objproduct);
//                     localStorage.setItem('product',JSON.stringify(arrproduct));
//                     clearProduct();
//                     fillProduct();
                
//         }else{
//             alert("Please Complete Data To Save Data");
    
//         }
    
     
//     }
  
 



// }

// function fillProduct(){
   

//     optionproduct ='';
//     // tbodyproduct
//     for(let x=0;x<arrproduct.length;x++){
//         optionproduct+=` 
//         <tr>
//         <td>${x}</td>
//         <td>${arrproduct[x].category}</td>
//         <td>${arrproduct[x].product}</td>
//         <td>${arrproduct[x].price}</td>
//         <td>${arrproduct[x].quantity}</td>
//         <td>${arrproduct[x].discount}</td>
//         <td>${arrproduct[x].total}</td>
//         <td><button class="btn btn-primary" onclick="showProductSelect(${x})">Edit</button></td>
//         <td> <button class="btn btn-success"  onclick="deleteProductSelect(${x})">Delete</button> </td>
//     </tr>
//        `
//     }

//     tbodyproduct.innerHTML=optionproduct;

// }
// function deleteProductSelect(e){
//     if(confirm("Are you sure you want to delete ")==true){
//         arrproduct.splice(e,1);
//         localStorage.setItem("product",JSON.stringify(arrproduct));
    
    
//         fillProduct();
//     }
   
// }
// function showProductSelect(e){
// index=e;
// catlist.options[catlist.selectedIndex].text=arrproduct[e].category;
// txtproduct.value=arrproduct[e].product;
// txtprice.value=arrproduct[e].price
// txtdiscount.value=arrproduct[e].discount;
// txttotal.value=arrproduct[e].total;
// txtquantity.value=arrproduct[e].quantity;
// btnaddproduct.innerHTML="Update";

// }

