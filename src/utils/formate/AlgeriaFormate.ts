/* eslint-disable @typescript-eslint/restrict-template-expressions */
 // format date to dd/mm/yyyy
 export const AlgeriaformatDate = (date : Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

// supabase fromte 
// format date to yyyy/MM/dd
export const supabaseFormater = (date : Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}/${month}/${day}`;
  };
// from supabase formate to algeria formate 
export const  SupabaseToAlgeria = (inputDate : string) =>  {
    const dateParts = inputDate.split('/');
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    return `${day}/${month}/${year}`;
  }
  export function parseDupaBaseDateString(dateString: string): Date {
    if (!dateString || dateString.length === 0) {
      return new Date();
    }
    
    const dateParts = dateString.split("-");
    if (dateParts.length !== 3) {
      return new Date();
    }
    
    const [yearStr, monthStr, dayStr] = dateParts;
    const year = Number(yearStr);
    const month = Number(monthStr);
    const day = Number(dayStr);
    
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      return new Date();
    }
    
    return new Date(year, month - 1, day);
  }