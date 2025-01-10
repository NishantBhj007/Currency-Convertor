//  import {country_list} from "./countryList.js"

import { country_code } from "./countryList.js";
const button=document.querySelector('form button');
let fromCurrency=document.querySelector('.from select')
let toCurrency=document.querySelector('.to select');
const amount=document.querySelector('.amount input')
const finalExchangeText=document.querySelector('.exchange-rate')
const exchangeIcon=document.querySelector('.drop-list .icon')
const dropList=document.querySelectorAll('.drop-list select')
for(let i=0;i<dropList.length;i++){
    for(  let currency_code in country_code){
        let selected;
        if(i==0){
            selected=currency_code=="USD"?'selected':"";
        }else if(i==1){
            selected=currency_code=="INR"?'selected':"";
        }
        let optionTag=`<option value="${currency_code}" ${selected}>${currency_code}</option>` 
    dropList[i].insertAdjacentHTML('beforeend',optionTag);
    }
    dropList[i].addEventListener('change',(e)=>{
        loadFlag(e.target)
    })
}

function loadFlag(element){
    for(let code in country_code){
        if(code==element.value){
            let imageTag=element.parentElement.querySelector('img')
            imageTag.src=`https://flagsapi.com/${country_code[code]}/flat/64.png`
        }
    }

}


window.addEventListener('load',()=>{
    getExchangeRate()
    currency(fromCurrency)
})

button.addEventListener('click',((e)=>{
e.preventDefault()
getExchangeRate()
currency(fromCurrency)
}))

exchangeIcon.addEventListener('click',()=>{
    let tempCode=fromCurrency.value;
    fromCurrency.value=toCurrency.value;
    toCurrency.value=tempCode;
    loadFlag(fromCurrency)
    loadFlag(toCurrency)
    getExchangeRate()
    currency(fromCurrency)
})



function getExchangeRate(){
   
    let amountValue=amount.value;
    if(amountValue== " "||amountValue=='0'){
        amount.value='1';
        amountValue=1;
    }   
}
finalExchangeText.innerText='Getting Exchange Rate....'
 async function currency(toKnow){
try {
    let url=`https://latest.currency-api.pages.dev/v1/currencies/${toKnow.value.toLowerCase()}.json`;
let response=await fetch(url)
let data= await response.json()
let exchangeRate=(data[toKnow.value.toLowerCase()][toCurrency.value.toLowerCase()]);
let totalExchangeRate=(exchangeRate* amount.value).toFixed(2)
finalExchangeText.textContent=` ${amount.value} ${toKnow.value} = ${totalExchangeRate} ${toCurrency.value}`
 
} catch (error) {
    finalExchangeText.innerText=error;
}
 }
 
 

