export function getTodayYearMonthDate() {
  return new Date().toLocaleDateString('en-CA');
}

export function getNextTenYears() {
  const currentYear = new Date().getFullYear();
  const yearsArr = [];
  for (let i = currentYear; i <= currentYear + 10; i += 1) {
    yearsArr.push(i);
  }
  return yearsArr;
}
