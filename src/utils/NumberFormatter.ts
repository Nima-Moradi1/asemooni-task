export function toPersianDigits(n : string | number) {
    const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  }

  export function toPersianNumbersWithComma(n: number | string): string {
    const numWithCommas: string = numberWithCommas(n); // 1000,2343
    const persianNumber: string = toPersianDigits(numWithCommas);
    return persianNumber;
  }
  
  function numberWithCommas(x: number | string): string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


  export const convertToEnglishNumbers = (input: string) => {
    const persianNumbers = /[\u06F0-\u06F9]/g;
    return input.replace(persianNumbers, (d) => String(d.charCodeAt(0) - 1728));
  };