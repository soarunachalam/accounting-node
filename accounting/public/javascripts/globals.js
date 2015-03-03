/*Validate org name
  Alpha numeric, spaces, .,-,_,',\,(comma)
  Length 2 to 128
*/
const REGNAME = /^[^\s\\`~!@#$%^&*\(\)_'=+\{\}"\/?.,<>\|][^\\~!@#$%^&*\(\)=+\{\}"\/?<>\|]{2,128}$/;

/*Validate org address line 1
  Length 1 to 256
*/
const REGADDR = /^[^\s\\`~!$%^&'=+"\/?.,<>\|][^\\\/]{1,256}$/;

/*Validate org phone
  Numeric, +, -
  Both + and - will be removed
  Length compulsory 10 numbers
 */
const REGPHONE = /^[+\d][\d-]{5,15}$/;