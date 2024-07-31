function convertDateFormat(inputDate: string) {
  const months: { [key: string]: string } = {
    January: "Jan",
    February: "Feb",
    March: "Mar",
    April: "Apr",
    May: "May",
    June: "Jun",
    July: "Jul",
    August: "Aug",
    September: "Sep",
    October: "Oct",
    November: "Nov",
    December: "Dec",
  };

  try {
    let date;
    if (inputDate && inputDate.trim() !== "") {
      date = new Date(inputDate);

      const day = isNaN(date.getDate())
        ? "-"
        : date.getDate().toString().padStart(2, "0");
      const month = isNaN(date.getMonth())
        ? "-"
        : date.toLocaleString("default", { month: "long" });
      const year = isNaN(date.getFullYear())
        ? "-"
        : date.getFullYear().toString();

      const monthShort = months[month] || "-";

      return `${day} ${monthShort} ${year}`;
    } else {
      return "---";
    }
  } catch (error: any) {
    console.error(`Error processing date: ${error.message}`);
  }
}

function findRegions(data:any) {
  const regions = new Set();
  const nonDuplicateRegions:any = [];

  data.forEach((item: any) => {
      if (!regions.has(item.region)) {
          regions.add(item.region);
          nonDuplicateRegions.push(item.region);
      }
  });

  return nonDuplicateRegions;
}



export { convertDateFormat ,findRegions};
