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
                <div class="card shadow-lg mt-3">
                <div class="card-header">
                  ${element.name}
                </div>
                
                <div class="card-body">
                   
                 <img src="${element.iconUrl}" class="img-fluid">
                </div>

                </div>
                   
                `;
            });
            $('#code').append(result);
        },
        error: () => console.error("can not find"),
    
    });
});