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

    citySelect.innerHTML = `<option value>Selecione a cidade</option>`
    citySelect.disabled = true;

    fetch(url)
        .then(res => res.json())
        .then(cities => {

            for(city of cities){
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            citySelect.disabled = false;
        })

}

const itemsToCollect = document.querySelectorAll('.items-grid li');

for( item of itemsToCollect){
    item.addEventListener('click', handleSelectedItem)
}
const collectedItems = document.querySelector('input[name=items]');
let selectedItems = [];

function handleSelectedItem(event){
    const itemLi = event.target;

    //adiciona ou remove uma classe
    itemLi.classList.toggle('selected')
    const itemId = itemLi.dataset.id;

    //verifica se existe itens selecionado
    //se sim pega todos os items selecionados
    const alreadySelected = selectedItems.findIndex( item =>{
        const itemFound = item === itemId;
        return itemFound;
    });

    //se ja estiver selecionado
    if(alreadySelected >= 0){
        //tirar a seleção
        const fiteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId;
            return itemIsDifferent;
        });
        selectedItems = fiteredItems;
    }
    else{
        //se não estiver selecionado
        //adicionar a seleção

        selectedItems.push(itemId);
    }
    //atualiza o input escondido
    collectedItems.value = selectedItems;

}
