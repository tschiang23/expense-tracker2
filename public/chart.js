const ctx = document.getElementById('myChart');

window.addEventListener('load', (e) => {
  let amountData = []
  let categoryData = []
  const amountArray = document.querySelectorAll(".record-amount")
  const categoryArray = document.querySelectorAll(".category-icon")


  if (amountArray && categoryArray) {
    amountArray.forEach((item) =>
      amountData.push(Number(item.textContent))
    )

    categoryArray.forEach(item => {
      categoryData.push(item.getAttribute("data-name"))
    }
    )

    const categories = categoryData.filter((item, index) => categoryData.indexOf(item) === index)

    // categoryData.filter((item, index) => {
    //   console.log(categoryData.indexOf(item), index)
    //   if (categoryData.indexOf(item) !== index) {
    //     const startIndex = categoryData.indexOf(item)
    //     let amount
    //     amount = amountData[categoryData.indexOf(item)] + amountData[index]
    //     amountData.splice(startIndex, 1, amount)
    //     amountData.splice(index, 1)
    //     categoryData.splice(index, 1)

    //     index = index - 1
    //     console.log(categoryData.indexOf(item), index)
    //   }
    // })

    let point = 0
    while (point < categoryData.length) {
      while (categoryData.indexOf(categoryData[point]) !== point) {
        const startIndex = categoryData.indexOf(categoryData[point])
        let amount
        amount = amountData[categoryData.indexOf(categoryData[point])] + amountData[point]
        amountData.splice(startIndex, 1, amount)
        amountData.splice(point, 1)
        categoryData.splice(point, 1)
        point--
      }
      point++
    }


    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: categories,
        datasets: [{
          label: '$',
          data: amountData,
          borderWidth: 1
        }]
      }
    });
  }
})

