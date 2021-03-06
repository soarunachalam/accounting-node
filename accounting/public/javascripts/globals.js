/*Validate org name
  Alpha numeric, spaces, .,-,_,',\,(comma)
  Length 2 to 128
*/
const NAME_REGEX = /^[^\s\\`~!@#$%^&*\(\)_'=+\{\}"\/?.,<>\|][^\\~!@#$%^&*\(\)=+\{\}"\/?<>\|]{2,128}$/;

/*Validate org address line 1
  Length 1 to 256
*/
const ADDR_REGEX = /^[^\s\\`~!$%^&'=+"\/?.,<>\|][^\\\/]{1,256}$/;

/*Validate org phone
  Numeric, +, -
  Both + and - will be removed
  Length compulsory 10 numbers
 */
const PHONE_REGEX = /^[+\d][\d-]{5,15}$/;

const TABLE_HEADER_HTML = "<table border=1><tr> <td> S.No </td> <td> Name </td> <td> Address1 </td> <td> Address2 </td> <td> Town </td> <td> Area </td> <td> Phone </td><td> Primery contact </td> + <td> Primery phone </td> </tr>";
const TABLE_CLOSER_HTML = "</table>";