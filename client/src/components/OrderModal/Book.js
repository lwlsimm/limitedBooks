import React from 'react'

const Book = (props) => {
  return (
    <div class="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded" key={props.id}>
      <div class="mr-1"><img class="rounded" src={props.pic_link} width="30"/></div>
      <div class="d-flex flex-column align-items-center product-details"><span class="font-weight-bold">{props.title}</span>
      </div>
      <div class="d-flex flex-row align-items-center qty"><i class="fa fa-minus text-danger"></i>
          <h5 class="text-grey mt-1 mr-1 ml-1">{props.count}  </h5><i class="fa fa-plus text-success"></i>
      </div>
      <div>
          <h5 class="text-grey">Total Price: ${(Number(props.price.replace(/[^0-9.-]+/g,"")) * props.count).toFixed(2)}</h5>
      </div>
    </div>
  )
}

export default Book;