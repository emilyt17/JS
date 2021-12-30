const itemsCards = document.getElementById('items');
const content =document.getElementById('cards');
const footer = document.getElementById('footer');
const templateCards = document.getElementById('template-card').content;
const templateFooter = document.getElementById('template-footer').content;
const templateBag = document.getElementById('template-bag').content;
const fragment = document.createDocumentFragment();
let captureProduct = {}




$(document).ready(function () {
    fechData()
    if (localStorage.getItem('captureProduct')) {
        captureProduct = JSON.parse(localStorage.getItem('captureProduct'))
        bag ();
    }
});

const fechData = async () => {
    try {
        const result = await fetch('../datos/productos.json')
        const data = await result.json()
        create(data);
        //console.log(data)
    } catch (err) {
        console.log(err)
    }
}

const create = data => {
    data.forEach(producto => {
       templateCards.querySelector('h5').textContent = producto.title;
       templateCards.querySelector('p').textContent = producto.precio;
       templateCards.querySelector('img').setAttribute('src',producto.image);
       templateCards.querySelector('button').dataset.id = producto.id;
       const clone = templateCards.cloneNode(true);
       fragment.appendChild(clone);
    })
    itemsCards.appendChild(fragment);
}
itemsCards.addEventListener('click', e => {
    captureCards(e)
})

const captureCards = e => {
    if (e.target.classList.contains('btn-dark')) {
    select(e.target.parentElement);
        
    }
    e.stopPropagation()
};
   
const select = object => {
    const p = {
        id:object.querySelector('button').dataset.id,
        title:object.querySelector('h5').textContent,
        precio:object.querySelector('p').textContent,
        cantidad:1
    }
    
    if (captureProduct.hasOwnProperty(p.id)) {
        p.cantidad = captureProduct[p.id].cantidad + 1;
    }
    captureProduct[p.id]= {...p};
    bag();

    
}

const bag = () => {
    content.innerHTML = '';
    console.log(captureProduct)
    Object.values(captureProduct).forEach(p => {
        templateBag.querySelector('th').textContent = p.id;
        templateBag.querySelectorAll('td')[0].textContent = p.title;
        templateBag.querySelectorAll('td')[1].textContent = p.cantidad;

        templateBag.querySelector('.btn-secondary').dataset.id = p.id;
        templateBag.querySelector('.btn-outline-secondary').dataset.id = p.id;
        templateBag.querySelector('span').textContent = p.cantidad * p.precio;

        const clone = templateBag.cloneNode(true);
        fragment.appendChild(clone);
    })
    content.appendChild(fragment);
    createFooter();

    localStorage.setItem('captureProduct', JSON.stringify(captureProduct))
}

const createFooter = () => {
    footer.innerHTML = '';

    if (Object.keys(captureProduct).length === 0 ) {
        footer.innerHTML =' <th scope="row" colspan="5">Ningún producto selecionado.</th>';
        return

    }
 const sumaCantidad = Object.values(captureProduct).reduce((accum,{cantidad}) => accum + cantidad,0);
 const sumaPrecio = Object.values(captureProduct).reduce((accum,{cantidad,precio}) => accum + cantidad * precio ,0);
 templateFooter.querySelectorAll('td')[0].textContent = sumaCantidad;
 templateFooter.querySelector('span').textContent = sumaPrecio;

 const clone = templateFooter.cloneNode(true);
 fragment.appendChild(clone);
 footer.appendChild(fragment);

 const reset = document.getElementById('reset');
 reset.addEventListener('click', () => {
    captureProduct = {};
    bag ();
 })
}

content.addEventListener('click', e => {
    add(e)
})

const add = e => {
    if (e.target.classList.contains('btn-secondary')) {

        const P = captureProduct[e.target.dataset.id];
        P.cantidad++
        captureProduct[e.target.dataset.id]= {...P};
        bag ();
    }

    if (e.target.classList.contains('btn-outline-secondary')) {

        const P = captureProduct[e.target.dataset.id];
        P.cantidad--;
        if (P.cantidad === 0 ){
            delete captureProduct[e.target.dataset.id];

        }
        bag ();
    }
    e.stopPropagation()
}
