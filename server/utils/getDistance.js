const getDistance = (from, to) => {
  if ((from[6] === to[6]) && (from[5] === to[5])) return 0
  const fromLat = subComma(from[6]);
  const fromLon = subComma(from[5]);
  const toLat = subComma(to[6]);
  const toLon = subComma(to[5]);

  const R = 6371; // Radius of the earth in km
  
  const dLat = deg2rad(toLat - fromLat);  // deg2rad below
  const dLon = deg2rad(toLon - fromLon); 
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(fromLat)) * Math.cos(deg2rad(toLat)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const distance = R * c; // Distance in km
  return parseInt(distance);
}

function subComma (num) {
  const string = num.toString().replaceAll(",", ".");
  return parseFloat(string);
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

export default getDistance