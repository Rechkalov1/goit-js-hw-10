import '../css/styles.css';
import Debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import apiCountries from './fetchCountries'

const DEBOUNCE_DELAY = 300;

const searchCountry=document.querySelector('#search-box');
const countryList=document.querySelector('.country-list');
const countryInfo=document.querySelector(".country-info");




searchCountry.addEventListener('input',Debounce(onSearchCountry,DEBOUNCE_DELAY));


function onSearchCountry(e){
const countries =e.target.value.trim();
removeData()
if(countries=== ''){

return;
};

apiCountries(countries)
.then(data=>insertContent(data))
.catch(err =>{
if(err.code ===404){
notFound()
}else{
    Notiflix.Notify.failure('Unknow error');
}

} );
};

const  insertContent = (countries)=>{


if(countries.length===1){
   
    const resultInfo=countryInfoMarkup(countries);
    countryInfo.insertAdjacentHTML('beforeend',resultInfo)
    
}else if(countries.length <10 &&  countries.length >1){
const result=listCountry(countries);

countryList.innerHTML=result;
    
}else if(countries.length >10){
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
 
}else{
    Notiflix.Notify.failure('Unknow Error');
}

};
const listCountry =(list)=>list.reduce((acc,item)=>acc+countryMarkup(item), '');

const countryMarkup =(({name,flags}) => {
    return `<li class='country-item'>
    <img src='${flags.svg}' alt='flag${name}'width='60' height='40'> ${name}</li>`
});

const countryInfoMarkup =(country)=>{
    const {capital,population,languages} = country[0];
    const language = languages.map(list => list.name).join(' ');
        const info = `<p class="country-info__text"><span>Capital:</span>${capital}</p>
        <p class="country-info__text"><span>Population:</span>${population}</p>
        <p class="country-info__text"><span>Languages:</span>${language}</p>`;
      return info;
};
const notFound = () => {
    Notiflix.Notify.failure('Oops, there is no country with that name')
    
};

const removeData = () => {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
}
