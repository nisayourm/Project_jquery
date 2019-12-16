function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
$(document).ready(function () {
    getApi();
    $('#recipe').on('change', () => {
        var recipesId = $('#recipe').val();
        eachRecipe(recipesId);
    })
})
function getApi() {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => chooseRecipe(data.recipes),
        error: () => console.log("Canot get data"),
    })
}
var allData = [];
function chooseRecipe(recipe) {
    allData = recipe;
    var option = "";
    recipe.forEach(element => {
        option += `<option value ="${element.id}">${element.name}</option>`;
    });
    $('#recipe').append(option);
}
function eachRecipe(id) {
    allData.forEach(element => {
        if (element.id == id) {
            showRecipe(element);
            // console.warn(element);
            // showIngredient(element.ingredients);
            showIngredient(element);
            showStep(element.instructions)
        }
    })
}
function showRecipe(element) {
    const {name, iconUrl} = element;
    var result = "";
    result += `
        <div class="col-2"></div>
        <div class="col-4 mt-5"><h4>${name}</h4></div>
        <div class="col-4"><img src="${iconUrl}"  style="width:150px; height:150px"></div>
        <div class="col-2"></div>
    `;
    $('#nameOffood').html(result);
}

// function showIngredient(ing) {
//     ing.forEach(element => {
//         showIngredients(element);
//     })
// }
// function showIngredients(ids) {
//     var incrdan = "";
//     incrdan += `
//              <tr>
//                 <td><img src="${ids.iconUrl}" class="img-fluit"  width="100px"></td>
//                 <br>
//                 <br>
//                 <td>${ids.name}</td>
//                 <td>${ids.quantity}</td>
//                 <td>${ids.unit[0]}</td>

//             </tr>
//     `;
//     $('#recipe-result').html(incrdan);
// }
function showIngredient(ids) {
    $("#texts").html("Instruction");
    var incrdan = "";
    ids.ingredients.forEach(element => {
        const{name,quantity,unit,iconUrl} = element;
        incrdan += `
                 <tr>
                    <td><img src="${iconUrl}" class="img-fluit"  width="80px"></td>
                    <br>
                    <br>
                    <td>${name}</td>
                    <td>${quantity}</td>
                    <td>${unit[1]}</td>
                </tr>
        `;
    });
    $('#recipe-result').html(incrdan);
}
//cut the step the text
function showStep(step){
    $("#text").html("Instruction");
    var getStep = "";
    var steps = step.split("<step>")
    for (let j = 1; j < steps.length; j++){
        getStep +=`
         <p class="text-info"><strong>Step ${j}</strong></p>
         <p>${steps[j]}</p>
        `;
    }
    $("#step").html(getStep);
    
 }