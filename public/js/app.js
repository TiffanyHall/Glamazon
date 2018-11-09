$(document).ready(function () {

    $.ajax({
        method: "GET",
        url: "/api/product"
    }).then(function (res) {
        const items = res;

        for (i = 0; i < items.length; i++) {
            let item = $(`<tr id='item-${items[i].id}'>                    
                <th class="prodName" scope="row">${items[i].product_name}</th>

                <td class="deptName">${items[i].department_name}</td>

                <td class="quantity" >${items[i].stock_quantity}</td>
               
                <td class="amount"><input size="3"></input></td>

                <td class="price">$${items[i].price}</td>
               
                <td> <button type="button" class="btn btn-primary add2Order">Add to Order</button></td>

            </tr>`);
            $('#tableBody').append(item);
        }
    }).catch(function (err) {
        console.log("Error", err);
    });

    let subTotal = parseInt(0);

    //THE ADD Order and Remove Item buttons don't work

    $("#productlist").on("click", ".btn.add2Order", function (e) {

        e.preventDefault();

        const itemParent = $(this).parent().parent();

        const addToList = {
            name: itemParent.children('.prodName').html(),
            amount: itemParent.children('.amount').children('input').val().trim(),
            price: itemParent.children('.price').html(),
            id: "itemz" + itemParent.children('.price').html().replace('$', '')
        }

        subTotal += parseInt(addToList.amount) * parseInt(addToList.price.replace('$', ''));

        $('#cart-items').append(`<li>${addToList.name} x${addToList.amount} <button type="button" class="btn btn-primary  removeOrder ${addToList.id}">Remove From Order</button></li>`);
        $('#cart-total').html('$' + subTotal + '.00');
    });


    $("#productlist").on("click", ".btn.removeOrder", function (e) {

        e.preventDefault();

        const itemParent = $(this).parent();
        const itemPrice = parseInt($(this).attr('class').substring(
            $(this).attr('class').lastIndexOf("z") + 1,
            $(this).attr('class').lastIndexOf(" ")
        ));

        const itemQty = parseInt(itemParent.html().substring(itemParent.html().lastIndexOf("x") + 1,
            itemParent.html().lastIndexOf(" ")));

        const itemTotal = itemQty * itemPrice;
        subTotal -= itemTotal;

        itemParent.remove();

        $('#cart-total').html('$' + subTotal + '.00');

    });



    $("#order").on("click", function (e) {
        e.preventDefault();

        $('#cart-items').html('');
        $('#cart-total').html('');
        $('.amount').html('<input size="3"/>');
    });

});