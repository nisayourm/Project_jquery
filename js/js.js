$(document).ready(function(){
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    $.ajax({
        dataType : 'json',
        url:url,
        success:function(data){
            console.log(data);
            var result = "";
            data.recipes.forEach(element => { 
                result +=`
               
                
                  ${element.name}
               
                
                <div class="card-body">
                   
                 <img src="${element.iconUrl}" width="130px" class="img-fluid"> 

                </div>
                   
                `;
            });
            $('#code').append(result);
        },
        error: () => console.error("can not find"),
    
    });
    // code for button input
    $('#minusNumber').on('click',function(){
        var minus = $('#number').val();
        minusNumbers(minus);
     });

     $('#addNumber').on('click',function(){
         var add = $('#number').val();
         addNumber(add);
     });
     
    // wertyuiop[]qwertyuiopwertyuiopweyuioqwertyuiopwertyuiopwertiop
    $(document).ready(() => {
        requestApi();
    });
    
    //reques api
    var requestApi = () => {
        $.ajax({
            dataType: 'json',
            url: getUrl(),
            success: (data) => getData(data),
            error: () => getError(),
        });
    };
    
    //get url
    var getUrl = () => {
        var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
        return url;
    };
    
    //get data
    var getData = (myData) => {
        myData.recipes.forEach(element => {
            //recipe element.ingredients
            getIngredients(element.ingredients);
        });
    };
    
    //get error
    var getError = () => {
    
    };
    
    //get ingredients
    var getIngredients = (ing)=>{
        ing.forEach(item =>{
            comuteHtml(item);
        });
    };
    //comute html
    var comuteHtml = (item)=>{
        var result ="";
        result+=`
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>${item.unit}</td>
                <td><img src="${item.iconUrl}" class="img-fluit" width="100px"></td>
            </tr>
        `;
        printOut(result);
    }
    //print out to html
    var printOut = (out) =>{
        $("#ingrediants").append(out);
    };
});

// This is the fountion

function minusNumbers(minus){
    var minuss = parseInt(minus)-1;
    if(minuss >= 0){
        $('#number').val(minuss);
        compute(minuss);
    }
  
}
function compute(number){
    var result = number *5;
    if(number == 0){
        progressBar(result);
    }else{
        progressBar(result+25);
    }
    $('#show').html(result);
}
function progressBar(pro){
    $('#progress').width(pro+"%");
    $('#progress').html(pro+"%");
}

function addNumber(add){
    var addss = parseInt(add)+1;
    if(addss <= 15){
        $('#number').val(addss);
        compute(addss);
    }
    $('#number').val(addss);
  
}