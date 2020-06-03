function populateUf(){
    const ufSelect = document.querySelector("select[name=uf]");

    console.log('estou aqui');

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( res => res.json())
        .then( states =>{

            console.log('estou aqui dentro do states')
            for( const state of states){
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome} </option>`
            }
             
        })
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);


populateUf();

function getCities(event){
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("[name=states]");

    const indexOfStateSelect = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfStateSelect].text;

    const ufValue = event.target.value;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)
        .then(res => res.json())
        .then(cities => {

            for(city of cities){
                citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
            }
            citySelect.disabled = false;
        })

}

