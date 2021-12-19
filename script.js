/////////FETCHING APIS

// async function rates() 
// {
//     const response = await fetch('https://free.currconv.com/api/v7/convert?q=USD_INR,INR_USD&compact=ultra&apiKey=593beaca79182f81c745');
//     const data = await response.json();

//     return data;
// }

async function rates(inputCurrId, outputCurrId) 
{
    const apiToFetch = "https://free.currconv.com/api/v7/convert?q=" + inputCurrId + "_" + outputCurrId + "," + outputCurrId + "_" + inputCurrId + "&compact=ultra&apiKey=593beaca79182f81c745";
    const response = await fetch(apiToFetch);
    const data = await response.json();

    return data;
}

async function curren()
{
    const syms = await fetch('https://free.currconv.com/api/v7/currencies?apiKey=593beaca79182f81c745');
    const dataSyms = await syms.json();

    return dataSyms;
}
////////

/////////ADDING CURRENCY NAMES TO FORM

// const values = rates();
// console.log(values);

const curr = curren();
// console.log(curr);

curren().then(
    function finalData(curr)
    {
        const names = curr.results;
        // console.log(names);

        const listId = document.getElementById("datalistOptions");

        for(let idx in names)
        {
            let option = document.createElement("option");

            option.value = names[idx].currencyName + " (" + idx +")";
            option.id = idx;

            listId.appendChild(option);
        }
    },
    function notInList(error)
    {
        console.log("error");
    }
)

/////////

/////////WORKING ON BTNS (NUMS)

const nums = [];

for(let idx = 0; idx <= 9; idx++)
{
    nums[idx] = document.getElementById(idx);
    //console.log(nums[idx].value);

    nums[idx].addEventListener('click', function()
    {
        //console.log(nums[idx].value);
        let formVal = document.querySelector("#inputForm");
        formVal.value += nums[idx].value;

    })

}

nums[10] = document.getElementById("decimal");
nums[11] = document.getElementById("x");

nums[10].addEventListener('click', function()
{
    let formVal = document.querySelector("#inputForm");
    formVal.value += ".";
})

nums[11].addEventListener('click', function()
{
    let formVal = document.querySelector("#inputForm");
    let newVal = formVal.value.slice(0, -1);
    //formVal.value = 0;
    formVal.value = newVal;
})

nums[12] = document.getElementById("clear");

nums[12].addEventListener('click', function()
{
    let formVal = document.querySelector("#inputForm");
    formVal.value = '';
})

function submitting()
{
    let inputCurr = document.getElementById("inputList").value;
    let outputCurr = document.getElementById("outputList").value;
    
    let inputCurrId;

    for(let idx = 0; idx < inputCurr.length; idx++)
    {
        if(inputCurr[idx] === "(")
        {
            inputCurrId = inputCurr.substring(idx +1, idx +4);
            break;
        }
    }

    let outputCurrId;

    for(let idx = 0; idx < outputCurr.length; idx++)
    {
        if(outputCurr[idx] === "(")
        {
            outputCurrId = outputCurr.substring(idx +1, idx +4);
            break;
        }
    }

    const values = rates(inputCurrId, outputCurrId);
    // console.log(values);

    values.then(
        function final(values)
        {
            const valueToGet = inputCurrId + "_" + outputCurrId;
            const conver = values[valueToGet];
            // console.log(conver);

            let money = document.querySelector("#inputForm").value;
            const convertAll = parseFloat(money)*conver;
            // console.log(convertAll);

            document.querySelector("#outputForm").value = convertAll;
        },
        function notInList(error)
        {
            console.log("error");
        }
    )
}

let enterBtn = document.getElementById("inputForm");
let inputLi =  document.getElementById("inputList");
let outputLi =  document.getElementById("outputList");

function checkSubmit()
{
    if(enterBtn.value === '' || inputLi.value === '' || outputLi.value === '')
    {
        document.getElementById("outputForm").value = '';
    }
    else
    {
        submitting();
    }
}

nums[13] = document.getElementById("submit");

nums[13].addEventListener('click', function()
{
    checkSubmit();
})



inputLi.addEventListener('click', function()
{
    checkSubmit();
})

outputLi.addEventListener('click' , function()
{
    checkSubmit();
})
// console.log(inputLi.value);

enterBtn.addEventListener('keyup', function()
{
    checkSubmit();
})
/////////

inputLi.onkeyup = function(event)
{
    if(event.keyCode == 13)
    {
        checkSubmit();
    }
}

outputLi.onkeyup = function(event)
{
    if(event.keyCode == 13)
    {
        checkSubmit();
    }
}