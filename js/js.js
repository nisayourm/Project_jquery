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
        }
    })
}
function showRecipe(element) {
    const {name, iconUrl} = element;
    var result = "";
    result += `
        <div class="col-2"></div>
        <div class="col-4 mt-5"><h4>${name}</h4></div>
        <div class="col-4"><img src="${iconUrl}"  style="width:200px; height:150px"></div>
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
    var incrdan = "";
    ids.ingredients.forEach(element => {
        const{name,quantity,unit,iconUrl} = element;
        incrdan += `
                 <tr>
                    <td><img src="${iconUrl}" class="img-fluit"  width="100px"></td>
                    <br>
                    <br>
                    <td>${name}</td>
                    <td>${quantity}</td>
                    <td>${unit}</td>
                </tr>
        `;
    });
    $('#recipe-result').html(incrdan);
}
