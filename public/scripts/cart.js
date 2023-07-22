$(() => {
    $('#fetch-cart').on('click', () => {
        $.ajax("/cart", {
            method: "POST"
        }).then((response) => {
            console.log("response", response)
        })

    })
})
