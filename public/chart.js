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

    categoryData.filter((item, index) => {
      if (categoryData.indexOf(item) !== index) {
        const startIndex = categoryData.indexOf(item)
        let amount

        if (amountData[index]) {
          amount = amountData[categoryData.indexOf(item)] + amountData[index]
          amountData.splice(startIndex, 1, amount)
          amountData.splice(index, 1)
        } else {
          amount = amountData[categoryData.indexOf(item)] + amountData[index - 1]
          amountData.splice(startIndex, 1, amount)
          amountData.splice((index - 1), 1)
        }
      }
    })


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

