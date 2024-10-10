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

    // 檢查重複的元素
    // const categories = categoryData.filter((item, index) => categoryData.indexOf(item) === index)

    // 檢查陣列重複值並 計算金額v1 
    // let point = 0
    // while (point < categoryData.length) {
    //   while (categoryData.indexOf(categoryData[point]) !== point) {
    //     const startIndex = categoryData.indexOf(categoryData[point])
    //     let amount
    //     amount = amountData[categoryData.indexOf(categoryData[point])] + amountData[point]
    //     amountData.splice(startIndex, 1, amount)
    //     amountData.splice(point, 1)
    //     categoryData.splice(point, 1)
    //     point--
    //   }
    //   point++
    // }

    // 檢查陣列重複值並 計算金額v2 for
    for (let i = categoryData.length - 1; i >= 0; i--) {
      if (categoryData.indexOf(categoryData[i]) !== i) {
        const startIndex = categoryData.indexOf(categoryData[i])
        let amount
        amount = amountData[categoryData.indexOf(categoryData[i])] + amountData[i]
        amountData.splice(startIndex, 1, amount)
        amountData.splice(i, 1)
        categoryData.splice(i, 1)
      }
    }


    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: categoryData,
        datasets: [{
          label: '$',
          data: amountData,
          borderWidth: 1
        }]
      }
    });
  }
})

