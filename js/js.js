//get url form api 
function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
// for select the number 
$(document).ready(function () {
    getApi();
    $('#recipe').on('change', () => {
        var recipesId = $('#recipe').val();
        eachRecipe(recipesId);
    });
});
//gie data form api
function getApi() {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => chooseRecipe(data.recipes),
        error: () => console.log("Canot get data"),
    });
}
//array can call and use it
var allData = [];
function chooseRecipe(recipe) {
    // select the id and name form api
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
//hide the ruler
$('#ruler').hide();
function eachRecipe(id) {
    allData.forEach(element => {
        if (element.id == id) {
            showRecipe(element);
            showIngredient(element);
            showStep(element.instructions)
            //show npG
            nbGuest(element.nbGuests);
            newGeusts = element;
            oldGuests = element.nbGuests;
        }
    });
    //show ruler
    $('#ruler').show();
}
//showRecipe name and iconUrl
function showRecipe(element) {
    const { name, iconUrl } = element;
    var result = "";
    result += `
            <div class="col-4"></div>
                <div class="col-4 mt-5">
                </div>

                <div class="col-4 card"  style="right:15%;">

                    <div class="card-header">
                        <h4>${name}</h4>
                    </div>
                    
                    <div class="card-body" >
                        <img src="${iconUrl}" style="width:310px; height:250px;left:100%;">
                    </div>
                    <div class="card-footer">
                   
                </div>

                </div>
            <div class="col-2">
            
            </div>

    `;
    $('#nameOffood').html(result);

}
//hide the card to interface
$('#showinterface').hide();
//get showIngredient form api to Interface
function showIngredient(ids) {
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
    //show it in interface
    $('#recipe-result').html(incrdan);
    //show card to interface
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

        <div class = "card"  style="right:150%; bottom:236%">
            <div class = "card-header ">
        <h4 class="text-center text-white">Number of person</h4>

    </div>
    
    <div class = "card-body">
        
    <div class="input-group mb-3"">
                
        <div class="input-group-append">
            <button class="btn btn-danger" type="button" id="minusNumber" >&#x2212;</button>
        </div>

         <input type="text" id="number" class="form-control text-center" value="${nbGuests}" disabled>

        <div class="input-group-append">
            <button class="btn btn-success" type="button" id="addNumber">&#x2b;</button>
        </div>
        
    </div>
    </div>
    <div class = "card-footer ">
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

//for ngGuests person and sum the number of the person
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
