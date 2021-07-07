import { IOption } from 'types'

export const clientId = '8053ac4f-de29-4d9d-9cf8-c36a5ebf7f33'

export const States: IOption[] = [
  {
    label: 'Alabama',
    value: 'AL'
  },
  {
    label: 'Alaska',
    value: 'AK'
  },
  {
    label: 'Arizona',
    value: 'AZ'
  },
  {
    label: 'Arkansas',
    value: 'AR'
  },
  {
    label: 'California',
    value: 'CA'
  },
  {
    label: 'Colorado',
    value: 'CO'
  },
  {
    label: 'Connecticut',
    value: 'CT'
  },
  {
    label: 'District Of Columbia',
    value: 'DC'
  },
  {
    label: 'Florida',
    value: 'FL'
  },
  {
    label: 'Georgia',
    value: 'GA'
  },
  {
    label: 'Hawaii',
    value: 'HI'
  },
  {
    label: 'Idaho',
    value: 'ID'
  },
  {
    label: 'Illinois',
    value: 'IL'
  },
  {
    label: 'Indiana',
    value: 'IN'
  },
  {
    label: 'Iowa',
    value: 'IA'
  },
  {
    label: 'Kansas',
    value: 'KS'
  },
  {
    label: 'Kentucky',
    value: 'KY'
  },
  {
    label: 'Louisiana',
    value: 'LA'
  },
  {
    label: 'Maine',
    value: 'ME'
  },
  {
    label: 'Maryland',
    value: 'MD'
  },
  {
    label: 'Massachusetts',
    value: 'MA'
  },
  {
    label: 'Michigan',
    value: 'MI'
  },
  {
    label: 'Minnesota',
    value: 'MN'
  },
  {
    label: 'Mississippi',
    value: 'MS'
  },
  {
    label: 'Missouri',
    value: 'MO'
  },
  {
    label: 'Montana',
    value: 'MT'
  },
  {
    label: 'Nebraska',
    value: 'NE'
  },
  {
    label: 'Nevada',
    value: 'NV'
  },
  {
    label: 'New Hampshire',
    value: 'NH'
  },
  {
    label: 'New Jersey',
    value: 'NJ'
  },
  {
    label: 'New Mexico',
    value: 'NM'
  },
  {
    label: 'New York',
    value: 'NY'
  },
  {
    label: 'North Carolina',
    value: 'NC'
  },
  {
    label: 'North Dakota',
    value: 'ND'
  },
  {
    label: 'Ohio',
    value: 'OH'
  },
  {
    label: 'Oklahoma',
    value: 'OK'
  },
  {
    label: 'Oregon',
    value: 'OR'
  },
  {
    label: 'Pennsylvania',
    value: 'PA'
  },
  {
    label: 'Rhode Island',
    value: 'RI'
  },
  {
    label: 'South Carolina',
    value: 'SC'
  },
  {
    label: 'South Dakota',
    value: 'SD'
  },
  {
    label: 'Tennessee',
    value: 'TN'
  },
  {
    label: 'Texas',
    value: 'TX'
  },
  {
    label: 'Utah',
    value: 'UT'
  },
  {
    label: 'Vermont',
    value: 'VT'
  },
  {
    label: 'Virginia',
    value: 'VA'
  },
  {
    label: 'Washington',
    value: 'WA'
  },
  {
    label: 'West Virginia',
    value: 'WV'
  },
  {
    label: 'Wisconsin',
    value: 'WI'
  },
  {
    label: 'Wyoming',
    value: 'WY'
  }
]

export const GoogleCalendarLink =
  'http://www.google.com/calendar/event?action=TEMPLATE&dates=20201214%2F20201219&text=Tech%20Week&location=https%3A%2F%2Fwww.techweek2020.com%2F&details=Tech%20Week%202020%20is%20a%20celebration%20of%20our%20technical%20community%20at%20Verizon%20Media.%20Built%20upon%20the%20success%20of%20Tech%20Pulse%2C%20our%20cornerstone%20event%2C%20and%20your%20overwhelming%20interest%20in%20sharing%20ideas%20and%20growing%20your%20knowledge%20base%2C%20we%20are%20excited%20to%20bring%20you%20a%20week%20filled%20with%20opportunities.%0A%0ATech%20Week%20will%20be%20on%20Monday%2C%20December%2014%20-%20Friday%2C%20December%2018%2C%202020%20and%2C%20for%20the%20first%20time%2C%20will%20be%20hosted%20virtually.%20Throughout%20the%20week%2C%20technologists%20from%20across%20the%20company%20will%20give%20presentations%20on%20topics%20critical%20to%20our%20business%20and%20our%20future.%20Invited%20attendees%20will%20have%20the%20opportunity%20to%20meet%20and%20network%20with%20peers%2C%20exchange%20ideas%2C%20solicit%20feedback%20and%20collaborate'

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const total = 62 // characters.length
export const generateKey = (length: number = 20) => {
  var result = ''

  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * total))
  }
  return result
}
