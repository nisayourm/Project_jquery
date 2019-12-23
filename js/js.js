function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
$(document).ready(function () {
    getApi();
    $('#recipe').on('change', () => {
        var recipesId = $('#recipe').val();
        eachRecipe(recipesId);
    });
});

function getApi() {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => chooseRecipe(data.recipes),
        error: () => console.log("Canot get data"),
    });
}

var allData = [];
function chooseRecipe(recipe) {
    // console.log(recipe)
    allData = recipe;
    var option = "";
    recipe.forEach(element => {
        option += `<option value ="${element.id}">${element.name}</option>`;
    });
    $('#recipe').append(option);
}

//this variable for get old nbGuests
var oldGuests = 0;
var newGeusts = [];
$('#ruler').hide();
function eachRecipe(id) {
    allData.forEach(element => {
        if (element.id == id) {
            showRecipe(element);
            // showIngredient(element.ingredients);
            showIngredient(element);
            showStep(element.instructions)
            //show npG
            nbGuest(element.nbGuests);
            newGeusts = element;
            oldGuests = element.nbGuests;
        }
    });
    $('#nameNumber').show();
    $('#ruler').show();
}

function showRecipe(element) {
    const { name, iconUrl } = element;
    var result = "";
    result += `
            <div class="col-4"></div>
                <div class="col-4 mt-5">
                </div>

                <div class="col-4 card">

                    <div class="card-header">
                        <h4>${name}</h4>
                    </div>
                    
                    <div class="card-body">
                        <img src="${iconUrl}" style="width:310px; height:250px">
                    </div>
                    <div class="card-footer">
                   
                </div>

                </div>
            <div class="col-2">
            
            </div>

    `;
    $('#nameOffood').html(result);

}
$('#showinterface').hide();

function showIngredient(ids) {
    $("#nameNumber").html("Number of person");
    $("#texts").html("Ingredients");
    var incrdan = "";
    ids.ingredients.forEach(element => {
        const { name, quantity, unit, iconUrl } = element;
        incrdan += `
                 <tr>
                    <td><img src="${iconUrl}" class="img-fluit"  width="80px"></td>
                    <br>
                    <br>
                    <td>${name}</td>
                    <td>${quantity}</td>
                    <td>${unit[0]}</td>
                </tr>
        `;
    });
    $('#recipe-result').html(incrdan);
    $('#showinterface').show();
}

//cut the step the text
function showStep(step) {
    $("#text").html("Instruction");
    var getStep = "";
    var steps = step.split("<step>")
    for (let j = 1; j < steps.length; j++) {
        getStep += `
         <p class="text-info"><strong>Step ${j}</strong></p>
         <p>${steps[j]}</p>
        `;
    }
    $("#step").html(getStep);

}

function nbGuest(nbGuests) {
    var persons = "";
    persons += `
    
    <div class="input-group mb-3">

        <div class="input-group-append">
            <button class="btn btn-danger" type="button" id="minusNumber" >&#x2212;</button>
        </div>

         <input type="text" id="number" class="form-control text-center" value="${nbGuests}" disabled>

        <div class="input-group-append">
            <button class="btn btn-success" type="button" id="addNumber">&#x2b;</button>
        </div>
        
    </div>
        
    `;
    $('#condition').html(persons);

    //get the number increst and deincrest
    $('#minusNumber').on('click', function () {
        var minuses = parseInt($('#number').val());
        minus(minuses);

    });

    $('#addNumber').on('click', function () {
        var added = parseInt($('#number').val());
        increas(added);
    });
}

//for decreas number
function minus(minusMyNumber) {
    var myNumber = parseInt(minusMyNumber) - 1;
    if (myNumber > 0) {
        $('#number').val(myNumber);
        getPeson($('#number').val());
    }
}

//for increas number
function increas(add) {
    var number = parseInt(add) + 1;
    if (number <= 15) {
        $('#number').val(number);
        getPeson($('#number').val());
    }
}

//for ngGuests person
function getPeson(people) {
    var getquanties = "";
    var newQuanties = "";
    var result = "";
    newGeusts.ingredients.forEach(element => {
        const { name, quantity, unit, iconUrl } = element;
        getquanties = people * quantity;
        newQuanties = getquanties / oldGuests;
        result += `     
        <tr>
        <td><img src="${iconUrl}" class="img-fluit"  width="80px"></td>
        <br>
        <br>
        <td>${name}</td>
        <td>${newQuanties}</td>
        <td>${unit[0]}</td>
    </tr>
        `
    });
    $('#recipe-result').html(result);
}
