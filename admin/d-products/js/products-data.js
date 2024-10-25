function Load_Products() {

    var html = document.getElementById('product-table-body');
    html.innerHTML = '<div class="spinner-grow" role="status"><span class="sr-only">Loading...</span></div>'

    fetchData(`${path_url}products/`, 'GET')
        .then(data => {

            if (data.response != 0) {

                html.innerHTML = '';
                var contid = 1;
                for (var i = 0; i < data.response.length; i++) {

                    html.innerHTML += printRow(contid, i, data);
                    contid++;
                }

            } else {
                html.innerHTML = 'No existe información';
            }
        })
        .catch(error => {
            html.innerHTML = `Error al realizar la petición: ${error.message}`;
        });
}

function LoadProductInfo(id) {

    toggleSendButtons("product-edit", "sending");

    fetchData(`${path_url}products/${id}`, 'GET')
        .then(data => {
            if (data.response != 0) {

                document.getElementById('product-edit-id').value = data.response.productsId;
                document.getElementById('product-edit-name').value = data.response.productName;
                document.getElementById('product-edit-description').value = data.response.productDescription;
                document.getElementById('product-edit-price').value = data.response.productPrice;
                document.getElementById('product-edit-stock').value = data.response.productStock;
                products_modal.show();
            } else {
                CreateOkMessageModal("No existe información");
            }
        })
        .catch(error => {
            CreateOkMessageModal(`Error al realizar la petición: ${error.message}`);
        });
}

function SaveProduct() {

    var product_name = document.getElementById('product-save-name').value;
    var product_description = document.getElementById('product-save-description').value;
    var product_price = document.getElementById('product-save-price').value;
    var product_stock = document.getElementById('product-save-stock').value;

    let finalPrice = product_price.replace(/\./g, '');

    const body = {
        "productName": product_name,
        "productDescription": product_description,
        "productPrice": finalPrice,
        "productStock": product_stock
    };

    fetchData(`${path_url}products`, 'POST', body)
        .then(data => {

            if (data.response != 0) {
                CreateSuccessMessageModal("Nuevo producto registrado");
            } else {
                toggleSendButtons("product-save", "sending");
                CreateOkMessageModal("Error al registrar nuevo producto.");
            }
        })
        .catch(error => {
            toggleSendButtons("product-save", "sending");
            CreateOkMessageModal("Error al realizar la petición (Fetch Error)" + err);
        });

}

function UpdateProduct() {

    var product_id = document.getElementById('product-edit-id').value;
    var product_name = document.getElementById('product-edit-name').value;
    var product_description = document.getElementById('product-edit-description').value;
    var product_price = document.getElementById('product-edit-price').value;
    var product_stock = document.getElementById('product-edit-stock').value;

    let finalPrice = product_price.replace(/\./g, '');

    const body = {
        "productsId": product_id,
        "productName": product_name,
        "productDescription": product_description,
        "productPrice": finalPrice,
        "productStock": product_stock
    };

    fetchData(`${path_url}products/${product_id}`, 'PUT', body)
        .then(data => {

            if (data.response != 0) {

                products_modal.hide();
                toggleSendButtons("product-edit", "sending");
                CreateSuccessMessageModal("Producto actualizado");

            } else {
                products_modal.hide();
                toggleSendButtons("product-edit", "sending");
                CreateOkMessageModal("Error al actualizar el producto.");
            }
        })
        .catch(error => {
            products_modal.hide();
            toggleSendButtons("product-edit", "sending");
            CreateOkMessageModal("Error " + error);
        });

}

function DeleteProduct(id) {

    var btns = document.getElementById('btns');
    btns.innerHTML = '<a class="ss-btn btn-basic disabled" href="#" role="button"><span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>Eliminando...</a>';


    fetchData(`${path_url}products/${id}`, 'DELETE')
        .then(data => {
            if (data.response != 0) {

                if (data.response == 228) {
                    wLocation("noauth");
                }
                CreateSuccessMessageModal("Datos eliminados.");
            } else {
                CreateOkMessageModal("Error al eliminar los datos.");
            }
        })
        .catch(error => {
            CreateOkMessageModal("Error " + error);
        });
}

function printRow(counter, index, data) {

    let formattedCurrencyCOP = (data.response[index].productPrice).toLocaleString('es-CO', { style: 'currency', currency: 'COP' });

    var row = `<tr class="row-text-14">
    <th scope="row">${counter}</th>
    <td>${data.response[index].productName}</td>
    <td>${formattedCurrencyCOP}</td>
    <td>${data.response[index].productStock}</td>
    <td class="text-center"><a href="javascript: LoadProductInfo('${data.response[index].productsId}')"><i class="bi bi-pencil-square"></i></a></td>
    <td class="text-center"><a href="javascript: ValidateDelete('${data.response[index].productsId}')"><i class="bi bi-trash"></i></a></td>
    </tr>`

    return row;

}