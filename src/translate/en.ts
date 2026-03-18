const en = {
  translation: {
    countdown: {
      days: 'days',
      hours: 'hours',
      minutes: 'minutes',
      seconds: 'seconds',
    },
    buttonJoinUs: 'RSVP & Join Us!',
    aboutAs: {
      highline: 'About us',
      description: '<p>Welcome to the <i>Havelland Tech Community</i> – a friendly space for tech enthusiasts\n' +
        'in Falkensee & the surrounding area! Come hang out, meet new people, and hear about exciting projects.\n' +
        'No matter what language or platform you work with, or your experience level –\n' +
        'everyone is welcome here. Join us for inspiring talks, homemade cake, and a welcoming community.</p>'
    },
    whyTakePart: {
      highline: 'Why take part?',
      benefits1: 'Free to attend, open to all tech stacks and experience levels',
      benefits2: 'Build your local network – friendly and relaxed atmosphere',
      benefits3: 'Discover new technologies',
      benefits4: 'Get inspired by talks, demos, and conversations',
      benefits5: 'Connect with developers from the region',
    },
    program:{
      disscusion:'Discussion',
      start: 'Start',
      end: 'End',
    },
    oldEvents: [
      {
        datum: 'SEP\n17',
        header: 'Community Evening',
        place: 'Chinese restaurant (Falkensee-Garten) at 6pm',
        address: 'Max-Liebermann-Straße 33, 14612 Falkensee',
        contain: 'Bring yourself (and maybe a friend).',
        link: 'https://www.meetup.com/havelland-technology-falkensee/events/310148645/?eventOrigin=group_events_list'
      },
      {
        datum: 'SEP\n26',
        header: 'Programmiercafé',
        place: 'Kulturhaus "Johannes R. Becher" from 11am to 1pm',
        address: 'Havelländer Weg 67, 14612 Falkensee',
        contain: 'A space for working on projects & learning new stuff together. 💻☕️'
      },
      {
        datum: 'OCT\n9',
        header: 'October - Tech Talks',
        place: 'Kulturhaus "Johannes R. Becher" at 6pm',
        address: 'Havelländer Weg 67, 14612 Falkensee',
        contain: 'Join us for our second speakers\' meetup! What to expect:\n 2 tech talks 🎤, \nfree homemade cake 🍰\na welcoming community',
        link: 'https://www.meetup.com/havelland-technology-falkensee/events/310649475/?eventOrigin=group_events_list',
        showProgram: true,
      },
        {
            datum: 'JAN\n29',
            header: 'Talks',
            place: 'Chinese restaurant (Falkensee-Garten) at 6pm',
            address: 'Max-Liebermann-Straße 33, 14612 Falkensee',
            contain: 'Autumn vibes, good company, and great conversations. No talks this time – just an easy evening to catch up with the community.',
            link: 'https://www.meetup.com/havelland-technology-falkensee/events/311419353/?eventOrigin=group_upcoming_events'
        },
      {
        datum: 'JAN\n16',
        header: 'Programmiercafé',
        place: 'Kulturhaus "Johannes R. Becher" from 11am to 1pm',
        address: 'Havelländer Weg 67, 14612 Falkensee',
        contain: 'A space for working on projects & learning new stuff together. 💻☕️',
        link: 'https://www.meetup.com/havelland-technology-falkensee/events/312018601/?eventOrigin=your_events'
      },
      {
        datum: 'JAN\n29',
        header: 'Tech Talks Meetup - January',
        place: 'altes Gemeindeamt / altes Rathaus at 6pm',
        address: 'Wilmsstraße 43, Dallgow-Döberitz',
        contain: 'Join us for our speakers\' meetup! What to expect:\n 2 tech talks 🎤, \nfree homemade cake 🍰\na welcoming community',
        link: 'https://www.meetup.com/havelland-technology-falkensee/events/312092212/?eventOrigin=group_events_list',
        showProgram: true
      },
    ],
    months: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    event: {
      at: 'at',
      oclock: '',
      fromTo: 'from {{from}} to {{to}}',
    },
      gallery:
          {highline: 'Gallery'},
      kids: {
        // Hero
        title: 'KIDS LABS',
        tagline: 'Two Workshops – One Event!',
        description: 'Learning through playing & making. We offer two exciting workshops for different age groups – whether electronics or Minecraft, there\'s something for everyone!',
        date: 'Sunday, April 19, 2026',
        time: '10:00 AM – 1:00 PM (doors open 9:45)',
        location: 'Kulturhaus "J. R. Becher"',
        locationDetail: 'Havelländer Weg 67, Falkensee · 1st floor',
        language: 'We speak German & English',
        cta: 'Register now',
        free: '★ FREE ★',

        // Tracks
        tracksTitle: 'Our Workshops',
        track1: {
          icon: '⚡',
          title: 'Electronics Workshop',
          age: 'ages 6+',
          spots: 'max. 15 spots',
          description: 'Build glowing circuits from paper, LEDs and coin batteries – with your own hands!',
          highlights: [
            'Make LEDs light up',
            'Build circuits on paper',
            'Use a coin battery as power source'
          ],
          bring: 'All materials provided on-site – just come and start building!'
        },
        track2: {
          icon: '⛏',
          title: 'Minecraft Modding',
          age: 'ages 10+',
          spots: 'max. 10 spots',
          description: 'Design your own items in Blockbench — a building block, a weapon, and a food item — then import them into Minecraft and play together!',
          steps: [
            { icon: '🎨', label: 'Design block' },
            { icon: '💻', label: 'Import into MC' },
            { icon: '🎮', label: 'Play together!' }
          ],
          bring: 'Bring: Laptop with charger (Windows, Mac or Linux — not tablets/Chromebooks). Please make sure your child can log in to Minecraft without help.',
          prepTitle: 'Please install before the event:',
          prep: [
            { name: 'Minecraft Java Edition', detail: 'Not Bedrock/Microsoft Store version — download from minecraft.net', link: 'https://www.minecraft.net/en-us/store/minecraft-java-bedrock-edition-pc' },
            { name: 'IntelliJ IDEA Community Edition', detail: 'The free version — download from JetBrains', link: 'https://www.jetbrains.com/idea/download/' }
          ]
        },

        // For Parents section
        forParentsTitle: 'Information for Parents',
        forParents: {
          stayTitle: 'Parents, stay & enjoy!',
          stayText: 'We ask all parents to stay at the Kulturhaus during the event. Grab a coffee, meet other parents, and be close by if your child needs you.',
          supervisionTitle: 'Supervision',
          supervisionText: 'Our team supervises the event and is available throughout as contact persons.',
          safetyTitle: 'Safety',
          safetyText: 'Children remain in the Kulturhaus throughout the entire event. We work in a protected, supervised space.',
          pickupTitle: 'End of Event',
          pickupText: 'The event ends at 1:00 PM. Please be on time — we wrap up together with a short showcase of what the kids built!',
          emergencyTitle: 'Emergency Contact',
          emergencyText: 'For emergencies during the event: meetup@hvltech.de or by phone on-site at check-in',
          photosTitle: 'Photos',
          photosText: 'We may take photos during the event for our website. Photos are only published with your consent and no faces will be shared online.'
        },

        // Registration
        registrationTitle: 'How to register',
        registrationSteps: [
          'Send us an email with the registration form (linked below)',
          'You will receive a confirmation within a few days',
          'If the workshop is full, we will add you to the waitlist'
        ],
        registrationFormNote: 'Please download and fill out the registration form and attach it to your email.',
        registrationFormLink: 'Download Registration Form',

        // Cooperation
        cooperation: {
          title: 'In cooperation with ❤️',
          description: 'This event is organized in cooperation with the Förderverein Kulturhaus "Johannes R. Becher" e.V. We are proud to partner together to bring tech education to kids in Falkensee. Check out their events and activities!',
          link: 'Kulturhaus Falkensee'
        },

        // Mission
        mission: {
          title: 'Why Havelland Tech?',
          description: 'We believe: Tech knowledge doesn\'t only belong in the big city. Havelland has smart minds – and they should learn early how to change the world with code.',
          slogan: 'Hack your Birne. Build your Future.'
        },

        // Footer
        footerContact: 'Questions',
        backToMain: 'Back to main page'
      }
  }
};

export default en;
