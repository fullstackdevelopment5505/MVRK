import techWeekImg from '../assets/landing/TW20_Landing_Page_Carousel_Art_TechWeek.jpg'
import techWomenImg from '../assets/landing/TW20_Landing_Page_Carousel_Art_TechWomenConnect.jpg'
import techPulseImg from '../assets/landing/TW20_Landing_Page_Carousel_Art_TechPulse.jpg'
import researchDayImg from '../assets/landing/TW20_Landing_Page_Carousel_Art_ResearchDay.jpg'
import peConImg from '../assets/landing/TW20_Landing_Page_Carousel_Art_PE-Con.jpg'

export const landing = {
  title: 'Tech Week',
  startDate: '12/14/2020',
  registrationEndDate: '11/12/2020',
  landingBlurbParagraphs: [
    'Tech Week 2020 is a celebration of our technical community at Verizon Media. Built upon the success of Tech Pulse, our cornerstone event, and your overwhelming interest in sharing ideas and growing your knowledge base, we are excited to bring you a week filled with opportunities.',
    'Tech Week will be on Monday, December 14 - Friday, December 18, 2020 and, for the first time, will be hosted virtually. Throughout the week, technologists from across the company will give presentations on topics critical to our business and our future. Invited attendees will have the opportunity to meet and network with peers, exchange ideas, solicit feedback and collaborate.'
  ],
  carouselSlides: [
    {
      title: 'Tech Week 2020',
      date: 'December 14 - 18',
      datePadded: true,
      imgSrc: techWeekImg
    },
    {
      title: 'TechWomen<br/>Connect',
      date: 'December 14',
      datePadded: true,
      imgSrc: techWomenImg
    },
    {
      title: 'Tech Pulse',
      date: ' December 14 - 17',
      datePadded: true,
      imgSrc: techPulseImg
    },
    {
      title: 'Research Day',
      date: 'December 17',
      imgSrc: researchDayImg
    },
    {
      title: 'PE-Con',
      date: 'December 17 - 18',
      imgSrc: peConImg
    }
  ],
  imageLarge: 'buildings',
  eventAgenda: 'Event Agenda',
  dailyScheduleTimeZoneNote: 'All times PT and subject to change.',
  dailySchedule: [
    {
      dayOfWeek: 'Monday',
      date: 'December 14',
      mobileDate: 'Dec 14',
      sessions: [
        {
          type: 'TechWomen Connect',
          agenda: [
            {
              title: 'Welcome',
              startTime: '9:00 AM'
              // endTime: '9:05 AM'
            },
            {
              title: 'Technical Talk',
              startTime: '9:05 AM'
              // endTime: '9:30 AM'
            },
            {
              title: 'Panel',
              startTime: '9:30 AM'
              // endTime: '10:00 AM'
            },
            {
              title: 'Technical Talk',
              startTime: '10:00 AM'
              // endTime: '10:30 AM'
            },
            {
              title: 'Deep Dive Sessions',
              startTime: '10:30 AM'
              // endTime: '11:15 AM'
            },
            {
              title: 'Networking',
              startTime: '11:30 AM'
              // endTime: '12:00 PM'
            }
          ]
        },
        {
          type: 'Tech Pulse',
          agenda: [
            {
              title: 'Welcome and Live Programming ',
              startTime: '1:00 PM'
              // endTime: '3:00 PM'
            },
            {
              title: 'Poster Room and Sponsorship Lounge Opens',
              startTime: '3:00 PM'
            }
          ]
        }
      ]
    },
    {
      dayOfWeek: 'Tuesday',
      date: 'December 15',
      mobileDate: 'Dec 15',
      sessions: [
        {
          type: 'Tech Pulse',
          agenda: [
            {
              title: 'Welcome and Live Programming ',
              startTime: '8:30 AM'
              // endTime: '10:00 AM'
            },
            {
              title: 'Networking, Games and Sponsorship Lounge Opens<br/>All Day 1 VOD available for replay',
              startTime: '10:00 AM'
            },
            {
              title: 'Tech Talks and Live Q&A',
              startTime: '10:30 AM'
              // endTime: '12:50 PM'
            },
            {
              title: 'External Speaker and Live Q&A',
              startTime: '2:15 PM'
              // endTime: '3:00 PM'
            },
            {
              title: 'Live Poster Session with Authors',
              startTime: '3:00 PM'
              // endTime: '5:00 PM'
            },
            {
              title: 'Live Poster Session with Authors',
              startTime: '7:00 PM'
              // endTime: '9:00 PM'
            }
          ]
        }
      ]
    },
    {
      dayOfWeek: 'Wednesday',
      date: 'December 16',
      mobileDate: 'Dec 16',
      sessions: [
        {
          type: 'Tech Pulse',
          agenda: [
            {
              title: 'Live Programming and Awards Ceremony:<br/>Open Source and Master Inventors',
              startTime: '8:30 AM'
              // endTime: '10:00 AM'
            },
            {
              title: 'Networking, Games and Sponsorship Lounge Open<br/>All Day 2 VOD available for replay',
              startTime: '10:00 AM'
              // endTime: ''
            },
            {
              title: 'Live Poster Session with Authors',
              startTime: '10:30 AM'
              // endTime: '12:30 PM'
            },
            {
              title: 'Tech Talks and Live Q&A',
              startTime: '3:00 PM'
              // endTime: '5:50 PM'
            },
            {
              title: 'Live Poster Session with Authors',
              startTime: '7:00 PM'
              // endTime: '9:00 PM'
            }
          ]
        }
      ]
    },
    {
      dayOfWeek: 'Thursday',
      date: 'December 17',
      mobileDate: 'Dec 17',
      sessions: [
        {
          type: 'Tech Pulse',
          agenda: [
            {
              title: 'Awards Ceremony: Posters and Closing ',
              startTime: '8:30 AM'
              // endTime: '9:15 AM'
            },
            {
              title: 'Networking, Games and Sponsorship Lounge Open<br/>All Day 3 VOD available for replay',
              startTime: '10:00 AM'
            }
          ]
        },
        {
          type: 'PE-Con',
          agenda: [
            {
              title: 'Deep Dive Sessions',
              startTime: '9:30 AM'
              // endTime: '11:00 AM'
            },
            {
              title: 'Deep Dive Sessions',
              startTime: '2:00 PM'
              // endTime: '5:30 PM'
            }
          ]
        },
        {
          type: 'Research Day',
          agenda: [
            {
              title: 'General Session',
              startTime: '9:30 AM'
              // endTime: '9:30 AM'
            },
            {
              title: 'Innovate and Collaborate',
              startTime: '11:30 AM'
              // endTime: '12:00 PM'
            }
          ]
        }
      ]
    },
    {
      dayOfWeek: 'Friday',
      date: 'December 18',
      mobileDate: 'Dec 18',
      sessions: [
        {
          type: 'PE-Con',
          agenda: [
            {
              title: 'General Session',
              startTime: '9:25 AM'
              // endTime: '11:45 AM'
            },
            {
              title: 'Deep Dive Sessions',
              startTime: '12:15 PM'
              // endTime: '12:00 PM'
            }
          ]
        }
      ]
    }
  ],
  eventTypes: [
    {
      key: 'techWomenConnect',
      name: 'TechWomen Connect',
      date: 'Monday, December 14',
      descriptions: [
        "TechWomen Connect returns to celebrate our brilliant, game-changing peers with a dynamic lineup of technical talks, panels and networking events. This year's theme is Level Up! -- working both individually and collectively to grow our careers, our expertise and how we shape the industry."
      ]
    },
    {
      key: 'techPulse',
      name: 'Tech Pulse',
      date: 'Monday, December 14 - Thursday, December 17',
      descriptions: [
        'Tech Pulse is our annual internal conference that brings together our technical community to showcase innovation from within Verizon Media. Now in its 13th year, this is an opportunity to connect with colleagues and share knowledge across an array of tracks and emerging topics in the industry.'
      ]
    },
    {
      key: 'researchDay',
      name: 'Research Day',
      date: 'Thursday, December 17',
      descriptions: [
        'This annual internal research event brings together over 100+ research scientists and engineers from across our global locations to gather for a series of tech talks, community building activities, leadership discussions, external academic speakers and celebrate our accomplishments!'
      ]
    },
    {
      key: 'peCon',
      name: 'PE-Con',
      date: 'Thursday, December 17 - Friday, December 18',
      descriptions: [
        'PE-Con is dedicated to fostering the Production Engineering, SRE and Infrastructure Engineering community through collaboration, technology and communications.'
      ]
    }
  ],
  daysUntilTechWeek: 'days until Tech Week',
  welcomeToTechWeek: 'Welcome to Tech Week',
  techWeekEvents: 'Tech Week Events',
  faq: 'Frequently Asked Questions',
  generalQuestions: 'General Questions',
  questionsAndAnswers: [
    {
      question: 'What is Tech Week?',
      answer: [
        'Tech Week is a multi-day celebration of our technical community at Verizon Media. Built upon the success of Tech Pulse, our cornerstone event, and the overwhelming interest in sharing ideas and growing your knowledge base, we have decided to bring you a week filled with opportunities. The week includes the following events which are invite only.',
        'Tech Week Events Schedule',
        'Monday, December 14 - TechWomen Connect',
        "TechWomen Connect returns to celebrate our brilliant, game-changing peers with a dynamic lineup of technical talks, panels and networking events. This year's theme is Level Up! -- working both individually and collectively to grow our careers, our expertise and how we shape the industry.",
        'Monday, December 14 - Thursday, December 17 - Tech Pulse',
        "Tech Pulse is our annual conference for the technical community. It's an amazing opportunity to engage the community and showcase the innovation in products and experiences that we’re creating for our users. Tech Pulse is the place to experience the latest technologies that power our sites and our products.",
        'Thursday, December 17 - Research Day',
        'This annual internal research event brings together over 100+ research scientists and engineers from across our global locations to gather for a series of tech talks, community building activities, leadership discussions, external academic speakers and celebrate our accomplishments!',
        'Thursday, December 17 - Friday, December 18 - PE-Con',
        'PE-Con is dedicated to fostering the Production Engineering, SRE and Infrastructure Engineering community through collaboration, technology and communications.'
      ]
    },
    {
      question: 'When is Tech Week?',
      answer: ['Tech Week 2020 will begin on Monday, December 14 and end on Friday, December 18.']
    },
    {
      question: 'Where is Tech Week being held?',
      answer: [
        'Tech Week will be fully virtual. In light of COVID-19 and its impacts on our world, we are taking precautions to reduce the spread and ensuring all have the opportunity to attend Tech Week by moving the conference online. This is the first time that Tech Week will be held virtually, and we’re excited for you to see what’s to come.'
      ]
    },
    {
      question: 'Who is on the planning team for Tech Week?',
      answer: [
        'Conference Chair: Haley Thrapp',
        'Program Chair and Senior Program Committee Leader: Haley Thrapp',
        'Program Manager: Rosalie Bartlett',
        'Event Leads: Kayla Crowe and Rachel Brienzo'
      ]
    },
    {
      question: 'How do I get an invitation to TechWomen Connect?',
      answer: [
        'All female-identified Tech Pulse invitees will be welcome to register for TechWomen Connect. If you are not invited to Tech Pulse, but would like to request an invite to TechWomen Connect, please fill out <a href="https://docs.google.com/forms/d/e/1FAIpQLSeJtC7_ZBjVkZdejy0u3GO9H1UJsE7__W2JUJm21jREMcZxfw/viewform" rel="noopener noreferrer" target="_blank">this form</a>.'
      ]
    },
    {
      question: 'How do I get an invitation to Tech Pulse?',
      answer: [
        'Tech Pulse invitations are extended to the poster and paper presenters that were accepted.  Discretionary invitations are given to leadership to allocate to their teams.'
      ]
    },
    {
      question: 'How do I get an invitation to PE-Con?',
      answer: [
        'If you are in the Production Engineering, SRE, and Infrastructure Engineering community, and would like to request an invite to PE-Con, please fill out <a href="https://docs.google.com/forms/d/e/1FAIpQLScA9-kb7b5kGjT6MFDuFEvOlWSzq1bSmWh9IZCBQkfdCTtImw/viewform" rel="noopener noreferrer" target="_blank">this form</a>.'
      ]
    },
    {
      question: 'How do I get an invitation to Research Day?',
      answer: [
        'Research Day is an invite only event for our Research Scientists and Research Engineers as it\'s focused on community building within our distributed Research community. If you are in the Research community, and would like to request an invite, please fill out  <a href="https://docs.google.com/forms/d/e/1FAIpQLSfTCZiF9iAZoc4Y60BZwm233DPw8owdUsuVJYC5BAuR4wOipA/viewform" rel="noopener noreferrer" target="_blank">this form</a>.'
      ]
    },
    {
      question: 'When is the deadline to register?',
      answer: ['Please register by December 7, 2020.']
    },
    {
      question: 'Why is attendance limited?',
      answer: [
        'Tech Week is an invite only event and attendees are hand-selected by leadership or were accepted to present at Tech Pulse. Limiting the amount of participants allows Tech Week to recognize the members of the technical community and for attendees to meaningfully connect with each other.'
      ]
    },
    {
      question: 'Will the event be live? What happens if I’m in a different time zone?',
      answer: [
        'Tech Week will accommodate different time zones to accommodate attendees from all over the globe as much as possible but all sessions will be available to watch on demand. Given the wide range of time zones, we have extended Tech Week across Monday to Friday for more time to watch all sessions.'
      ]
    },

    {
      question: 'Will I be able to view the 2020 keynotes, talks and presentations online?',
      answer: [
        'Yes, all live presentations and sessions will be recorded and archived for viewing on the <a href="https://thestreet.vzbuilders.com/thestreet/ls/community/tech-week" rel="noopener noreferrer" target="_blank">Tech Week hub</a>.'
      ]
    },
    {
      question: 'Will there be swag this year?',
      answer: [
        'You can score swag this year by earning achievements throughout the week. Achievements are earned by engaging with content, other attendees and features on the platform. You can find your achievements on your badge and see what others have achieved on their badges. Swag will be delivered following the event.'
      ]
    },
    {
      question: 'What if I have accessibility requirements?',
      answer: [
        'The virtual platform will have accessible features. When you register for the event, you can request a specific requirement.'
      ]
    },
    {
      question: 'I have other questions or need information. Whom may I contact?',
      answer: [
        'If you have any questions or need additional information regarding Tech Week, please send an email to techweekevents@verizonmedia.com.'
      ]
    }
  ]
}
