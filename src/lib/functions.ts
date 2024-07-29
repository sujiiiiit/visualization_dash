function convertDateFormat(inputDate: string): string {
    const months: { [key: string]: string } = {
      January: "Jan", February: "Feb", March: "Mar", April: "Apr", May: "May", June: "Jun",
      July: "Jul", August: "Aug", September: "Sep", October: "Oct", November: "Nov", December: "Dec"
    };
  
    // Split the input string by spaces to extract the parts
    const parts = inputDate.split(" ");
    const month = parts[0].replace(",", ""); // Remove the comma from the month
    const day = parts[1].replace(",", ""); // Remove the comma from the day
    const year = parts[2];
  
    const monthShort = months[month];
  
    return `${day} ${monthShort} ${year}`;
  }
  export {convertDateFormat}