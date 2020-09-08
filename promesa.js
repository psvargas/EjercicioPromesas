const urlProducto = "https://gist.githubusercontent.com/josejbocanegra/be0461060d1c2d899740b8247089ba22/raw/916d2141e32e04031bda79c8886e8e4df0ae7f24/productos.json"

const urlPedido = "https://gist.githubusercontent.com/josejbocanegra/7b6febf87e9d986048a648487b35e693/raw/576531a2d0e601838fc3de997e021816a4b730f8/detallePedido.json"



const start = (json) => {
    return new Promise(function (resolve, reject) {
        let req = new XMLHttpRequest();
        req.open('GET', json);
        req.responseType = 'json';
        req.onload = function () {
            if (req.status == 200) {
                resolve(req.response);
            } else {
                reject(Error('Error:' + req.status));
            }
        }; req.send();
    })
};

urlProducto.then(response => {
    urlPedido.then(result => {
        let obj = new Array(response.length.fill(0))
        let maximo = 0;
        let idMax = 0;

        for (let i = 0; i < result.length; i++){  
            const prod = result[i].idProducto;
            const cant = parseInt(result[i].cantidad);
            cant_counter[prod] += cant;

            if (maximo < cant_counter[prod]) {
            maximo = cant_counter[prod];
            idMax = prod;
            }
        }
        console.log(
            "El producto más vendido es " + response[idMax].nombreProducto + " vendiendo" + maximo + " cantidades"
        );
    })
})
    