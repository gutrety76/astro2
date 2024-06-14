function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
function getFormatedDate(date){
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Convert month to two-digit number
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`
}
module.exports = {addDays, getFormatedDate}