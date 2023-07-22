$(() => {
    $('#fetch-cart').on('click', () => {
        $.ajax("/cart/test", {
            method: "GET"
        }).then((response) => {
            console.log("response", response)
        })

    })
})
