$(document).ready(function () {
class Client {
    constructor(name, age, address ,turns){
        this.name = name;
        this.age = age;
        this.address = address;
        this.turns = turns;
        
    }
}

class Interface {
    createTurns (client){
        const showTurs = document.getElementById('show-turns');
       const box = document.createElement('div');
       box.innerHTML = `
                <div class="card text-center p-5 ">
                    <div class="card-body">
                    <strong> Nombre y apellido:</strong> ${client.name}
                    <strong> Edad:</strong> ${client.age}
                    <strong> Dirección:</strong> ${client.address}
                    <button class="btn btn-secondary " name=OK>OK</button>
                    </div>
                </div>
                `;
       
       showTurs.appendChild(box);
       this.resetForm();
    }
    resetForm(){
        document.getElementById('form-turns').reset();
    }


    okTurns (box){
        if( box.name === 'OK' ){
            box.parentElement.parentElement.parentElement.remove(box);

        }

    }
    

}

$("#form-turns").submit(function (event){
    const name = $("#name").val();
    const age = $("#age").val();
    const address = $("#address").val();
    

    const client = new Client(name, age, address, turns);

    

    const interface = new Interface();

    interface.createTurns(client);
    interface.resetForm();
    event.preventDefault();

      
});

$('#show-turns').click(function (event) {
    const interface = new Interface();
    interface.okTurns(event.target);

});





});

