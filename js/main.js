function clean() {
    $('#viewData').html('')
}

////////////////////////////////////////////////////////////////
fristRun()
async function fristRun() {
    $('#viewData').html(
        `
    <div class="container  text-center my-1 py-2 mt-5 position-relative ">
        <div class=" row mt-3 p-2 g-3" id="cat-item">

        </div>
    </div>
    `
    )
    await fristRunURL()
}

async function fristRunURL() {
    let fristRunapiResuld = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    fristRunapiResuld = await fristRunapiResuld.json()
    fristRunDisplay(fristRunapiResuld.meals)
}

function fristRunDisplay(fristRunlist) {
    let box = ``
    for (var i = 0; i < fristRunlist.length; i++) {
        box += `
        <div class="col-md-6 col-lg-3  move-to="${fristRunlist[i].idMeal}">
            <div class="st safe " move-to="${fristRunlist[i].idMeal}">
            <img src="${fristRunlist[i].strMealThumb}"  move-to='${fristRunlist[i].idMeal}' alt="">
            <div class="layer d-flex align-items-center justify-content-center flex-column" move-to='${fristRunlist[i].idMeal}'>
            <h4 move-to='${fristRunlist[i].idMeal}'>${fristRunlist[i].strMeal}</h4>
        </div>
            </div>
          </div>
        `}
    $('#cat-item').html(box)

    $('.st').click(async (e) => {
        mealAPI(e.target.getAttribute("move-to"));
    })
}

/////////////////////////////////////////////////////////////////////

$('#openNav').click(() => {
    let navWidth = $('.nav-menu').outerWidth()
    if ($('nav').css('left') == `${-navWidth}px`) {
        $('nav').animate({ left: 0 }, 500)
        $('.nav-header-mark i').addClass('fa-times')
        $('.nav-menu-links li').eq(0).animate({ opacity: '1', paddingTop: '15px' }, 1200)
        $('.nav-menu-links li').eq(1).animate({ opacity: '1', paddingTop: '0px' }, 1200)
        $('.nav-menu-links li').eq(2).animate({ opacity: '1', paddingTop: '0px' }, 1200)
        $('.nav-menu-links li').eq(3).animate({ opacity: '1', paddingTop: '0px' }, 1200)
        $('.nav-menu-links li').eq(4).animate({ opacity: '1', paddingTop: '0px' }, 1200)
    } else {
        $('nav').animate({ left: `${-navWidth}px` }, 500)
        $('.nav-header-mark i').removeClass('fa-times')
        $('.nav-menu-links li').eq(0).animate({ opacity: '0', paddingTop: '500px' }, 1500)
        $('.nav-menu-links li').eq(1).animate({ opacity: '0', paddingTop: '500px' }, 1500)
        $('.nav-menu-links li').eq(2).animate({ opacity: '0', paddingTop: '500px' }, 1500)
        $('.nav-menu-links li').eq(3).animate({ opacity: '0', paddingTop: '500px' }, 1500)
        $('.nav-menu-links li').eq(4).animate({ opacity: '0', paddingTop: '500px' }, 1500)
    }
})
async function OCnav() {
    let navWidth = $('.nav-menu').outerWidth()
    if ($('nav').css('left') == `${-navWidth}px`) {
        await $('nav').animate({ left: 0 }, 500)
        $('.nav-header-mark i').addClass('fa-times')
    } else {
        await $('nav').animate({ left: `${-navWidth}px` }, 500)
        $('.nav-header-mark i').removeClass('fa-times')
    }
}

// Search
$('#Search').click(async () => {
    await OCnav()
    clean()
    box = `
        <!-- SearchSection -->
            <div class="container  position-fixed searchST">
                <div class="row text-center">
                    <div class="searchInput col-md-5 offset-1">
                        <input type="text" class="form-control bg-transparent border-0 rounded-0 border-bottom " placeholder="Search By Name" id="SBN" >
                    </div>
                    <div class="searchInput col-md-5">
                        <input type="text" class="form-control bg-transparent border-0 rounded-0 border-bottom " placeholder="search By First Letter..." id="SBFL">
                    </div>
                </div>
            </div>
            <div class="row w-75 m-auto" id="SearchItem">
                
            </div>
            `
    $('#viewData').html(box)

    let SBFL = document.getElementById('SBFL')
    SBFL.addEventListener('keyup', () => {

        if (SBFL.value.length > 1) {
            SBFL.value.slice(0, 1);
        }
        $("#SBFL").val(SBFL.value.slice(0, 1))

        SBFLurl(SBFL.value);
    })


    // SBN
    $('#SBN').keyup(async (e) => {
        SBNurl(e.target.value)
    })
})

// Search API
async function SBNurl(q) {
    let SBNapiResuld = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`)
    SBNapiResuld = await SBNapiResuld.json()
    SBNDisplay(SBNapiResuld.meals)
}
async function SBFLurl(q) {
    let SBFLapiResuld = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${q}`)
    SBFLapiResuld = await SBFLapiResuld.json()
    SBNDisplay(SBFLapiResuld.meals)
}
// Search Display
function SBNDisplay(SBNlist) {
    let box = ``
    for (var i = 0; i < SBNlist.length; i++) {
        box += `
        <div class="col-md-6 col-lg-3 mb-4  ">
            <div class="st safe " move-to='${SBNlist[i].idMeal}'>
                <img src="${SBNlist[i].strMealThumb}"  move-to='${SBNlist[i].idMeal}' alt="">
                <div class="layer d-flex align-items-center justify-content-center flex-column" move-to='${SBNlist[i].idMeal}'>
                    <h4 move-to='${SBNlist[i].idMeal}'>${SBNlist[i].strMeal}</h4>
                </div>
            </div>
        </div>
        `}
    $('#SearchItem').html(box)
    $('.st').click(async (e) => {
        mealAPI(e.target.getAttribute("move-to"));
    })
}

$('#Categories').click(async () => {
    await OCnav()
    clean()
    $('#viewData').html(
        `
    <div class="container  text-center my-1 py-2 mt-5 position-relative ">
        <div class=" row mt-3 p-2 g-3" id="cat-item">

        </div>
    </div>
    `
    )
    await CategoriesURL()
})
async function CategoriesURL() {
    let Catapi = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    Catapi = await Catapi.json()
    CatDisplay(Catapi.categories)
}
function CatDisplay(Catlist) {

    let box = ``
    for (var i = 0; i < Catlist.length; i++) {
        box += `
        <div class="col-md-6 col-lg-3  move-to="${Catlist[i].strCategory}" ">
            <div class="st  safe " move-to="${Catlist[i].strCategory}">
              <img src="${Catlist[i].strCategoryThumb}" move-to="${Catlist[i].strCategory}" alt="">
              <div class="layer d-flex align-items-center justify-content-center flex-column " move-to="${Catlist[i].strCategory}">
                <h4 move-to="${Catlist[i].strCategory}" >${Catlist[i].strCategory}</h4>
                <p move-to="${Catlist[i].strCategory}">${Catlist[i].strCategoryDescription.split(' ').slice(0, 20).join(' ')}</p>
              </div>
            </div>
          </div>
        `}
    $('#cat-item').html(box)

    $('.st').click(async (e) => {
        ingredienturl(e.target.getAttribute("move-to"))
    })
}




// www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
async function ingredienturl(q) {
    let ingredientapiResuld = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${q}`)
    ingredientapiResuld = await ingredientapiResuld.json()
    ingredientDisplay(ingredientapiResuld.meals)
}

function ingredientDisplay(ingredientlist) {
    let box = ``
    for (var i = 0; i < ingredientlist.length; i++) {
        box += `
        <div class="col-md-6 col-lg-3">
            <div class="st safe " move-to="${ingredientlist[i].idMeal}">
              <img src="${ingredientlist[i].strMealThumb}" move-to="${ingredientlist[i].idMeal}" alt="">
              <div class="layer d-flex align-items-center justify-content-center flex-column " move-to="${ingredientlist[i].idMeal}">
                <h4 move-to="${ingredientlist[i].idMeal}" >${ingredientlist[i].strMeal}</h4>
              </div>
            </div>
          </div>
        `}
    $('#cat-item').html(box)

    $('.st').click(async (e) => {
        mealAPI(e.target.getAttribute("move-to"));
    })
}

// Area

$('#Area').click(async () => {
    await OCnav()
    clean()
    $('#viewData').html(
        `
    <div class="container  text-center my-1 py-2 mt-5 position-relative ">
        <div class=" row mt-3 p-2 g-3" id="cat-item">

        </div>
    </div>
    `
    )
    await AreaURL()
})

async function AreaURL(q) {
    let AreaapiResuld = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    AreaapiResuld = await AreaapiResuld.json()
    AreaDisplay(AreaapiResuld.meals)
}

function AreaDisplay(Arealist) {
    let box = ``
    for (var i = 0; i < Arealist.length; i++) {
        box += `
        <div class="col-md-6 text-white col-lg-3 shadow-lg  move-to="${Arealist[i].strArea}">
            <div class="st safe shadow m-1 " move-to="${Arealist[i].strArea}">
                <i move-to="${Arealist[i].strArea}"  class="text-danger fa-solid fa-city fa-3x" ></i>
                <h4 move-to="${Arealist[i].strArea}" >${Arealist[i].strArea}</h4>
            </div>
          </div>
        `}
    $('#cat-item').html(box)

    $('.st').click(async (e) => {
        filterAreaURL(e.target.getAttribute("move-to"));
    })
}

async function filterAreaURL(q) {
    let AreaapiResuld = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${q}`)
    AreaapiResuld = await AreaapiResuld.json()
    ingredientDisplay(AreaapiResuld.meals)
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ingredsients

$('#Ingredients').click(async () => {
    await OCnav()
    clean()
    $('#viewData').html(
        `
    <div class="container w-75 text-center my-1 py-2 mt-5 position-relative ">
        <div class=" row mt-3 p-2 g-3" id="cat-item">

        </div>
    </div>
    `
    )
    await IngredsURL()
})

async function IngredsURL(q) {
    let IngredsapiResuld = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    IngredsapiResuld = await IngredsapiResuld.json()
    IngredsDisplay(IngredsapiResuld.meals)
}

function IngredsDisplay(Ingredslist) {
    let box = ``
    for (var i = 0; i <= 20; i++) {
        box += `
        <div class="col-md-6 col-lg-3  shadow " move-to="${Ingredslist[i].strIngredient}">
            <div class="st safe text-white " move-to="${Ingredslist[i].strIngredient}">
                <i move-to="${Ingredslist[i].strIngredient}"  class=" text-success fa-solid fa-bowl-food fa-3x" ></i>
                <h4 move-to="${Ingredslist[i].strIngredient}" >${Ingredslist[i].strIngredient}</h4>
                <p move-to="${Ingredslist[i].strIngredient}">${Ingredslist[i].strDescription.split(' ').slice(0, 20).join(' ')}</p>
            </div>
          </div>
        `}
    $('#cat-item').html(box)

    $('.st').click(async (e) => {
        filterIngredsURL(e.target.getAttribute("move-to"));
    })
}

async function filterIngredsURL(q) {
    let IngredsapiResuld = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${q}`)
    IngredsapiResuld = await IngredsapiResuld.json()
    ingredientDisplay(IngredsapiResuld.meals)
}

async function mealAPI(q) {
    let mealapiResult = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${q}`)
    mealapiResult = await mealapiResult.json()
    mealDisplay(mealapiResult.meals[0])
}

// mealDisplay
function mealDisplay(mealData) {
    let Ings = ''
    let tagList = ''
    let tagItem
    for (let i = 1; i <= 20; i++) {
        if (mealData[`strIngredient${i}`])
         { Ings += `<li class="my-3 mx-1 p-1 RliStyle rounded ">${mealData[`strMeasure${i}`]} ${mealData[`strIngredient${i}`]}</li>` }
    }
    if (tagItem != null) {
        tagItem = mealData.strTags.split(",")
        for (var i = 0; i < tagItem.length; i++) {
            tagList += `<li class="my-3 mx-1 tliStyle p-1 alert-danger rounded">${tagItem[i]}</li>`
        }
    }
    $('#viewData').html(box = `
    <div  class= "container w-75 my-1 py-2 mt-5 position-relative" >   
    <div class="mealDisplay row mt-3 p-2">
    <div class="leftSide text-center  col-md-5 myM text-white">
        <img class="mealImg" src="${mealData.strMealThumb}" alt="">
        <h1 class="imgTitle">${mealData.strMeal}</h1>
    </div>
    <div class="rightSide col-md-7 myM text-white text-left">
        <h2>Instructions</h2>
        <p class="fs-6" >${mealData.strInstructions}</p>
        <p>Area :<span>${mealData.strArea}</span> </p>
        <p>Category :<span>${mealData.strCategory}</span></p>

        <h3>Recipes :</h3>
        <ul class="list-unstyled d-flex flex-wrap "   >
            
            ${Ings}
        </ul>
        <h3>Tags :</h3>

        <ul class="list-unstyled d-flex ">
            ${tagList}
        </ul>

        
        <a class="btn btn-outline-success" target="_blank" href="${mealData.strSource}">Sourc</a>
        <a class="btn btn-outline-danger" target="_blank" href="${mealData.strYoutube}">Youtup</a>

    </div>
</div>
    </div>
    `)
}

//////////////////////////////////
// contact 

$("#ContactUs").click(async () => {
    await OCnav()
    clean()

    $('#viewData').html(` 
    
        <div class="text-center" id="contact-inputs">
            <h2 class="text-white mb-5">Contac Us...</h2>
            <div class="row contact-css">
                <div class="col-md-6 ">
                    <input id="userName" type="text" class="contact-style form-control w-100" placeholder="Enter Your Name">
                    <div class="alert alertName mt-1 alert-danger ">
                        Special Characters and Numbers not allowed
                    </div>
                </div>
                <div class="col-md-6 ">
                    <input id="userEmail" type="text" class="contact-style form-control w-100" placeholder="Enter Email">
                    <div class="alert alertEmail mt-1 alert-danger ">
                        Enter valid email. *Ex: xxx@yyy.zzz
                    </div>
                </div>
                <div class="col-md-6 ">
                    <input id="userPhone" type="text" class="contact-style form-control w-100" placeholder="Enter Phone">
                    <div class="alert alertPhone mt-1 alert-danger ">
                        It must be an Egyption valid phone number
                    </div>
                </div>
                <div class="col-md-6 ">
                    <input id="userAge" type="text" class="contact-style form-control w-100" placeholder="Enter Age">
                    <div class="alert alertAge mt-1 alert-danger ">
                        Enter valid Age between 10-100 years
                    </div>
                </div>
                <div class="col-md-6 ">
                    <input id="userPassword" type="password" class="contact-style form-control w-100" placeholder="Enter Password">
                    <div class="alert alertPassword mt-1 alert-danger ">
                        Enter valid password *Minimum eight characters, at least one letter and one number:*
                    </div>
                </div>
                <div class="col-md-6 ">
                    <input id="userRePassword" type="password" class="contact-style form-control w-100" placeholder="Enter RePassword">
                    <div class="alert alertRePassword mt-1 alert-danger ">
                        Enter valid Repassword
                    </div>
                </div>
            </div>
            <button class="btn btn-outline-danger mt-4" id="btn" disabled>submit</button>
        </div>
    `)

    let userNameInput = false
    let userEmailInput = false
    let userPhoneInput = false
    let userAgeInput = false
    let userPasswordInput = false
    let userRePasswordInput = false



    $('#userName').keyup( 
    ()=> {
        return userNameCall (/^[a-z]{1,}$/ig.test($('#userName').val())) 
    })

    $('#userEmail').keyup( 
        ()=> {
        return userEmailCall (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test($('#userEmail').val()))
    })

    $('#userPhone').keyup( 
        ()=> {
        return userPhoneCall (/^(002)?(01)[0125]{1}[0-9]{8}$/.test($('#userPhone').val()))
    })

    $('#userAge').keyup( 
        ()=> {
        return userAgeCall (/(^[1-9]{1}[0-9]{1}|100)$/.test($('#userAge').val()))
    })

    $('#userPassword').keyup( 
        ()=> {
        return userPasswordCall (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test($('#userPassword').val()))
    })

    $('#userRePassword').keyup( 
        ()=> {
        return userRePasswordCall ($('#userPassword').val() == $('#userRePassword').val())
    })

    function ifTrue (){
        if (userNameInput && userEmailInput && userPhoneInput && userAgeInput && userPasswordInput && userRePasswordInput) {
            $('#btn').removeAttr('disabled')
        } else {
            $('#btn').attr('disabled', 'true')
        }

    }
    
    
    function userNameCall (x){
        if (x == true) {
            $('#userName').addClass('is-valid')
            $('#userName').removeClass('is-invalid')
            $('.alertName').removeClass('d-block')
            userNameInput = true
            ifTrue ()
        } else if(x == false) {
            $('#userName').addClass('is-invalid')
            $('#userName').removeClass('is-valid')
            $('.alertName').addClass('d-block')
        }

    }
    
    function userEmailCall (x){
        if (x == true) {
            $('#userEmail').addClass('is-valid')
            $('#userEmail').removeClass('is-invalid')
            $('.alertEmail').removeClass('d-block')
            userEmailInput = true
            ifTrue ()
        } else if(x == false)  {
            $('#userEmail').addClass('is-invalid')
            $('#userEmail').removeClass('is-valid')
            $('.alertEmail').addClass('d-block')
        }
    }
    function userPhoneCall (x){
    if (x == true) {
            $('#userPhone').addClass('is-valid')
            $('#userPhone').removeClass('is-invalid')
            $('.alertPhone').removeClass('d-block')
            userPhoneInput = true
            ifTrue ()
        } else if(x == false)   {
            $('#userPhone').addClass('is-invalid')
            $('#userPhone').removeClass('is-valid')
            $('.alertPhone').addClass('d-block')
            userPhoneInput = false
        }
    }
    function userAgeCall (x){
    if (x == true) {
            $('#userAge').addClass('is-valid')
            $('#userAge').removeClass('is-invalid')
            $('.alertAge').removeClass('d-block')
            userAgeInput = true
            ifTrue ()
        } else if(x == false)  {
            $('#userAge').addClass('is-invalid')
            $('#userAge').removeClass('is-valid')
            $('.alertAge').addClass('d-block')
            userAgeInput = false
        }
    }
    function userPasswordCall (x){
    if (x == true) {
            $('#userPassword').addClass('is-valid')
            $('#userPassword').removeClass('is-invalid')
            $('.alertPassword').removeClass('d-block')
            userPasswordInput = true
            ifTrue ()
        } else if(x == false)  {
            $('#userPassword').addClass('is-invalid')
            $('#userPassword').removeClass('is-valid')
            $('.alertPassword').addClass('d-block')
            userPasswordInput = false
        }
    }
    function userRePasswordCall (x){
    if (x == true) {
            $('#userRePassword').addClass('is-valid')
            $('#userRePassword').removeClass('is-invalid')
            $('.alertRePassword').removeClass('d-block')
            userRePasswordInput = true
            ifTrue ()
        } else if(x == false)  {
            $('#userRePassword').addClass('is-invalid')
            $('#userRePassword').removeClass('is-valid')
            $('.alertRePassword').addClass('d-block')
            userRePasswordInput = false
        }
    }
})

