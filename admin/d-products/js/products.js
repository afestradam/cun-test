function validateSave() {

  toggleSendButtons("product-save", "send");
  var validator = ValidateFieldsSmallByName('product-save-product')

  if (validator == true) {
    SaveProduct();
  } else {
    toggleSendButtons("product-save", "sending");
  }
}

function validateUpdate() {

  toggleSendButtons("product-edit", "send");
  var validator = ValidateFieldsSmallByName('product-edit-product');
  var lists_lenght = document.getElementsByName('product-edit-emailLists').length;
  var list_validator = lists_lenght == 0 ? ValidateFieldsSmallByName('product-edit-list') : true;

  if (validator && list_validator) {
    UpdateProduct();
  } else {
    toggleSendButtons("product-edit", "sending");
  }

}

function ValidateDelete(id) {

  var btns = document.getElementById('btns');
  var msg = document.getElementById('msg');
  btns.innerHTML = '<a class="ss-btn btn-danger" data-bs-dismiss="modal" href="#">Cancelar</a>\n\
    <a class="ss-btn btn-basic" href="javascript: DeleteProduct(' + "'" + id + "'" + ')" role="button">Aceptar</a>';
  msg.innerHTML = "<p>¿Realmente desea eliminar esta información?</p>";
  myMsgModal.show();

}  