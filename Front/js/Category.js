let txtcategory=document.getElementById("txtcategory");
let catlist=document.getElementById("catlist");
let btndeletecategory=document.getElementById("btndeletecategory");
let showCatInModat=document.getElementById("showCatInModat");
let btnaddcategory=document.getElementById("btnaddcategory");
let deleteninmodal=document.querySelector('.deleteninmodal');

// let url='http://192.168.56.1/api/Category/';




// I Want TO Delete To Check 
let url='http://localhost:5065/api/Category/';


saveCategory=()=>{
  if(txtcategory.value !=''){
    let obj={
        Name :txtcategory.value
    }
    let data=JSON.stringify(obj);
    $.ajax({
            url:`${url}Add`,
            data:data,
            method:"POST",
            cashe:false,
            contentType:"application/json",
            success:function(res){
                showAllCategory();
                clearTxtCategory();
            toastr.success("You Added A New Category","Success");     


                

            },error:function(err)
            {
                alert(err.message)
            }
                });
  }else{
    toastr.warning("Please  Enter a Category");
  }
}

showAllCategory=()=>{

    let option='';
    option+=` <option value="">Select Category..</option>`;
    $.ajax({

        url:`${url}GetAll`,
        method:"GET",
   
        caches:false,
        success:function(res){

           for(let x=0;x<res.length;x++){
            option+=` <option value="${res[x].id }"> ${res[x].name} </option>`;

           }
           catlist.innerHTML=option;

        },error:function(err){
            toastr.warning("Please  Verify the server","Error");     
     
        }
    });
  
};

showAllCategoryInModal=()=>{
    let tableinMoadl='';

    Helper.AjaxCallGet(`${url}GetAll`,(data)=>{
        if(data.length>0){
            data.forEach(function(item){

                tableinMoadl+=` 
                <tr>
               <td>${item.id}</td>
               <td>${item.name}</td>
               <td>  <button 
                onclick="deleteSelectCategory(${item.id})" class="btn btn-danger deleteninmodal" 
                type="button">Delete</button>
               </td>
             
            </tr>
            `;
            showCatInModat.innerHTML=tableinMoadl;
            })
        }else{
            showCatInModat.innerHTML=tableinMoadl;
        }
      
        
    });

   

}
showAllCategory();


clearTxtCategory=()=>{
    txtcategory.value=''
}

deleteSelectCategory=(id)=>{
    Helper.AjaxCallDelete(`${url}Delete/${id}`,(data)=>{
        if(data !=null){
            showAllCategoryInModal();
            toastr.success('Deleteed a Category','success'); 
        }else{

        }
    })
   
}
btnaddcategory.addEventListener("click",saveCategory);
btndeletecategory.addEventListener("click",showAllCategoryInModal);


