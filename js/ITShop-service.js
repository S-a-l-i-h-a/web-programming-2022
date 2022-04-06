var ITShopService = {
    init: function(){
      $('#addToDoForm').validate({
        submitHandler: function(form) {
          var todo = Object.fromEntries((new FormData(form)).entries());
          ITShopService.add(todo);
        }
      });
      ITShopService.list();
    },

    list: function(){
      $.get("rest/Customers", function(data) {
        $("#customer_surname-list").html("");
        var html = "";
        for(let i = 0; i < data.length; i++){
          html += `
          <div class="col-lg-3">
            <div class="card">
              <img class="card-img-top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17ff3c8cf14%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17ff3c8cf14%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.19140625%22%20y%3D%2296.3%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title">`+ data[i].description +`</h5>
                <p class="card-text">`+ data[i].created +`: Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <div class="btn-group" role="group">
                  <button type="button" class="btn btn-primary todo-button" onclick="ITShopService.get(`+data[i].id+`)">Edit</button>
                  <button type="button" class="btn btn-danger todo-button" onclick="ITShopService.delete(`+data[i].id+`)">Delete</button>
                </div>
              </div>
            </div>
          </div>
          `;
        }
        $("#customer_surname-list").html(html);
      });
    },

    get: function(id){
      $('.Customers-button').attr('disabled', true);
      $.get('rest/Customers/'+id, function(data){
        $("#description").val(data.description);
        $("#id").val(data.id);
        $("#created").val(data.created);
        $("#exampleModal").modal("show");
        $('.Customers-button').attr('disabled', false);
      })
    },

    add: function(Customers){
      $.ajax({
        url: 'rest/Customers',
        type: 'POST',
        data: JSON.stringify(Customers),
        contentType: "application/json",
        dataType: "json",
        success: function(result) {
            $("#Customers-list").html('<div class="spinner-border" role="status"> <span class="sr-only"></span>  </div>');
            ITShopService.list(); // perf optimization
            $("#addToDoModal").modal("hide");
        }
      });
    },

    update: function(){
      $('.save-Customers-button').attr('disabled', true);
      var todo = {};

      todo.description = $('#description').val();
      todo.created = $('#created').val();

      $.ajax({
        url: 'rest/Customers'+$('#id').val(),
        type: 'PUT',
        data: JSON.stringify(Customers),
        contentType: "application/json",
        dataType: "json",
        success: function(result) {
            $("#exampleModal").modal("hide");
            $('.save-Customers-button').attr('disabled', false);
            $("#Customers-list").html('<div class="spinner-border" role="status"> <span class="sr-only"></span>  </div>');
            ITShopService.list(); // perf optimization
        }
      });
    },

    delete: function(id){
      $('.Customers-button').attr('disabled', true);
      $.ajax({
        url: 'rest/Customers'+id,
        type: 'DELETE',
        success: function(result) {
            $("#Customers-list").html('<div class="spinner-border" role="status"> <span class="sr-only"></span>  </div>');
            ITShopService.list();
        }
      });
    },
}
