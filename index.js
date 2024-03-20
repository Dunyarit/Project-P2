// var product = [{
//     id: 1,
//     img: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGl6emF8ZW58MHx8MHx8fDA%3D',
//     name: 'Pizza',
//     price: 199,
//     desciption:'Pizza Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis corrupti temporibus unde odit consequatur. Ipsum.',
//     type:'food'
// }, {
//     id:2,
//     img:'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
//     name: 'Chicken Steak',
//     price: 300,
//     desciption:'Chicken Steak Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis corrupti temporibus unde odit consequatur. Ipsum.',
//     type: 'protein'
// }, {
//     id:3,
//     img:'https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29rZXxlbnwwfHwwfHx8MA%3D%3D',
//     name: 'Coke',
//     price: 30,
//     desciption:'Coke Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis corrupti temporibus unde odit consequatur. Ipsum.',
//     type: 'drink'
// }];

var product;

//[{},{},{}]  //length 3

$(document).ready(() => {

    $.ajax({
        method: 'get',
        url: './api/getallproduct.php',
        success: function(response) {
            console.log(response)
            if(response.RespCode ==200) {

                product = response.Result;

                var html = '';
                for (let i = 0; i < product.length; i++) {
                    html += `<div onclick="openProductDetail(${i})" class="product-items ${product[i].type}">
                                <img  class="product-img" src="./imge/${product[i].img}">
                                <p style="font-size: 1.2vw;">${product[i].name}</p>
                                <p style="font-size: 1vw;">${numberWithCommas(product[i].price)} THB</p>
                             </div>`;
    }
    $("#productlist").html(html);
            }
        },error: function(err) {
            console.log(err)
        }
    })

    

})
function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

function searchsomething(elem) {
    //console.log('#'+elem.id)
    var value = $('#'+elem.id).val()
    console.log(value)

    var html = '';
    for (let i = 0; i < product.length; i++) {
        if( product[i].name.includes(value) ) {
            html += `<div onclick="openProductDetail(${i})" class="product-items ${product[i].type}">
                <img class="product-img" src="./imge/${product[i].img}">
                <p style="font-size: 1.2vw;">${product[i].name}</p>
                <p style="font-size: 1vw;">${numberWithCommas(product[i].price)} THB</p>
                </div>`;
        }
    }
    if(html == '') {
        $("#productlist").html(`<p>Not found product</p>`);
    } else{
        $("#productlist").html(html);
    }
}

function searchproduct(param) {
    console.log(param)
    $(".product-items").css('display', 'none')
    if(param == 'all') {
        $(".product-items").css('display', 'block')
    }
    else {
        $("."+param).css('display', 'block')
    }
}

var productindex = 0;
function openProductDetail(index) {
    productindex = index;
    console.log(productindex)
    $("#modalDesc").css('display', 'flex')
    $("#mdd-img").attr('src', './imge/'+ product[index].img);
    $("#mdd-name").text(product[index].name)
    $("#mdd-price").text( numberWithCommas(product[index].price) +' THB')
    $("#mdd-desc").text(product[index].desciption) 
}

function closeModal() {
    $(".modal").css('display', 'none')
}

var cart = [];
function addtocart() {
    var pass= true;

    for (let i = 0; i < cart.length; i++) {
        if(productindex == cart[i].index ){
            console.log('found same product')
            cart[i].count++;
            pass = false;
        }
    }

    if(pass){
        var obj = {
            index: productindex,
            id: product[productindex].id,
            name: product[productindex].name,
            price: product[productindex].price,
            img: product[productindex].img,
            count: 1
        };
        // console.log(obj)
        cart.push(obj)
    }
    console.log(cart)

    Swal.fire({
        icon: 'success',
        title: 'Add' + product[productindex].name + ' to cart !'
    })
    $("#cartcount").css('display', 'flex').text(cart.length)
}

function openCart() {
    $('#modalCart').css('display', 'flex')
    rendercart();
}

function rendercart() {
    if(cart.length > 0) {
        var html = '';
        for (let i = 0; i < cart.length; i++) {
             html += `  <div class="cartlist-items">
                    <div class="cartlist-left">
                        <img src="./imge/${cart[i].img}" alt="">
                        <div class="cartlist-detail">
                        <p style="font-size: 1.5vw;">${cart[i].name}</p>
                        <p style="font-size: 1.2vw;">${ numberWithCommas(cart[i].price * cart[i].count) } THB</p>
                    </div>
                    </div>
                        <div class="cartlist-right">
                        <p onclick="deinitems('-', ${i})" class="btnc">-</p>
                        <p id="countitems${i}" style="margin: 0 20px;">${cart[i].count}</p>
                        <p onclick="deinitems('+', ${i})" class="btnc">+</p>
                        </div>
                    </div>`;
        }
        $("#mycart").html(html)
    }
    else {
        $("#mycart").html(`<p>Not found product list</p>`)
    }
} 

function deinitems(action, index) {
    if(action == '-') {
        if(cart[index].count > 0) {
            cart[index].count--;
            $("#countitems"+index).text(cart[index].count)

            if(cart[index].count <= 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Are you sure to delete?',
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Delete',
                    cancelButtonText: 'Cancel'
                }).then((res) => {
                    if(res.isConfrimed) {
                        cart.splice(index, 1)
                        console.log(cart)
                        rendercart();
                        $("#cartcount").css('display', 'flex').text(cart.length)

                        if(cart.length <= 0) {
                            $("#cartcount").css('display', 'none')
                        }

                    else {
                        cart[index].count++;
                        $("#countitems"+index).text(cart.length)
                    }
                    }
                })
            }
        }
    }
    else if(action == '+') {
        cart[index].count++;
        $("#countitems"+index).text(cart[index].count)
    }
}

function buynow() {
    $.ajax({
        method: 'post',
        url: './api/buynow.php',
        data:{
            product: cart
        }, success: function(response) {
            console.log(response)
            if(response.RespCode ==200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Thank you',
                    html: ` <p> Amount : ${response.Amount.Amount}</p>
                            <p> Shipping : ${response.Amount.Shipping}</p>
                            <p> Vat : ${response.Amount.Vat}</p>
                            <p> Netamount : ${response.Amount.Netamount}</p>
                            `
                }).then((res) => {
                    if(res.isConfrimed) {
                        cart = [];
                        closeModal();
                        $("#cartcount").css('display','none')
                    }
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Something is went wrong!'
                })
            }
        }, error: function(err) {
            console.log(err)
        } 
        
    })
}