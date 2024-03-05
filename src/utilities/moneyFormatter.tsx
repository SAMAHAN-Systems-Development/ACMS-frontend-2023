export default function moneyFormatter(money: number) {
  return `Php. ${money.toLocaleString('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })}`;
}
