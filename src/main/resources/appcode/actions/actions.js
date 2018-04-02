export const PRINT_CURRNT_DATA = 'PRINT_DETAILS';
export const POST_DATA = 'POST_DATA'


export function printDetails(data) {
   return {
      type: PRINT_CURRNT_DATA,
      data: data
   };
}


 