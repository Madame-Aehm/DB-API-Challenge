const isolateToFrom = (params, allStations) => {
  const order = {}
  allStations.forEach((stn) => {
    if (stn[1] === params.from) {
      order.from = stn
    } 
    if (stn[1] === params.to) {
      order.to = stn
    }
  })
  return order
}

export default isolateToFrom