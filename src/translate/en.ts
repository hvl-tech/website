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
        ageLabel: '🎮 Coding Workshop for Kids 11+',
        title: 'HAVELLAND HACKS MINECRAFT',
        tagline: 'Hack your Birne – Learn coding with AI!',
        byKids: 'By kids, for kids!',
        description: 'We\'re organizing an event for kids aged 11 to 14. We believe learning by playing is the best way. Together we\'ll mod Minecraft – and along the way learn some Java, 3D modeling, and how AI can help with learning and building virtual worlds.',
        descriptionCta: 'Join us! Seats are limited – only 10 spots. The event is co-organized by 2 kids from Dallgow.',
        whyFree: 'Why free? We\'re preparing for a bigger event in April and want to meet in a smaller group first to build something amazing together.',
        date: 'Thursday, January 29, 2026',
        time: '4:00 PM – 7:00 PM',
        location: 'Kulturhaus Falkensee',
        language: 'We speak German & English',
        cta: 'Register now',
        ctaPdf: 'Download registration form (PDF)',
        spots: 'Only 10 spots!',
        deadline: 'Deadline: January 15, 2026',
        free: '★ FREE ★',

        // Supervisors
        supervisorsTitle: 'Who supervises?',
        supervisors: [
          { name: 'Dana Hlavacova', role: 'Event Supervisor' },
          { name: 'Martin Hlavac', role: 'Event Supervisor' }
        ],

        // Agenda
        agendaTitle: 'What we\'ll do',
        agenda: [
          { time: '4:00 PM', icon: '👋', title: 'Setup & Welcome', description: 'We\'ll check if Minecraft works and install the tools' },
          { time: '4:25 PM', icon: '🎨', title: 'Block Design in Blockbench', description: 'Create your own block – shape, color, and texture' },
          { time: '5:10 PM', icon: '🎮', title: 'Test Block in Minecraft', description: 'Import your block and see it live in the game' },
          { time: '5:30 PM', icon: '🍕', title: 'Snack Break', description: 'Short break – snacks and drinks provided' },
          { time: '5:45 PM', icon: '🤖', title: 'Program an Ability with AI', description: 'Give your block a special ability – with help from AI' },
          { time: '6:30 PM', icon: '🎤', title: 'Shared World + Show & Tell', description: 'Try out all blocks together and present yours' }
        ],

        // Tools explanation
        toolsTitle: 'What tools will we use?',
        tools: [
          {
            name: 'Blockbench',
            description: 'A free 3D modeling tool for creating Minecraft blocks and textures.',
            url: 'https://web.blockbench.net/'
          },
          {
            name: 'Java 21',
            description: 'The programming language we use to write the plugin.',
            url: 'https://adoptium.net/temurin/releases/?version=21'
          },
          {
            name: 'Minecraft Java Edition',
            description: 'To play and test. Must be purchased beforehand.',
            url: 'https://www.minecraft.net/de-de/store/minecraft-java-bedrock-edition-pc'
          },
          {
            name: 'Paper Server',
            description: 'Free Minecraft server where we test our plugin.',
            url: 'https://papermc.io/downloads/paper'
          },
          {
            name: 'IntelliJ IDEA',
            description: 'Our code editor (free). Alternatively, any other editor can be used.',
            url: 'https://www.jetbrains.com/idea/download/'
          }
        ],

        // What you'll create
        whatYoullCreateTitle: 'What you\'ll create',
        whatYoullCreateDescription: 'You\'ll soon see examples of blocks that other kids have created!',
        examplePlaceholder: 'Example coming soon',

        requirementsTitle: 'What you need',
        requirementsText: 'Laptop + Minecraft Java Edition (installed & logged in)',
        parentNote: 'For parents: The HVLtech adult meetup runs in parallel (6:00 PM – 8:00 PM). Please pick up your children promptly at 7:00 PM.',

        // For Parents section
        forParentsTitle: 'Information for Parents',
        forParents: {
          supervisionTitle: 'Supervision',
          supervisionText: 'Dana Hlavacova and Martin Hlavac supervise the event and are available throughout as contact persons.',
          safetyTitle: 'Safety',
          safetyText: 'Children remain in the Kulturhaus throughout the entire event. We work in a protected, supervised space.',
          pickupTitle: 'Pickup',
          pickupText: 'Please pick up your children promptly at 7:00 PM. The event ends exactly at this time.',
          bringTitle: 'What to bring?',
          bringText: 'Laptop (charged), Minecraft Java Edition (installed & logged in), optional: drink & snack',
          emergencyTitle: 'Emergency Contact',
          emergencyText: 'For emergencies during the event: meetup@hvltech.de or by phone on-site at check-in'
        },

        // Result
        result: {
          title: 'Your Result',
          description: 'Maybe you\'ll build a <strong>Havelland Pear</strong> as a block? Or something completely different – you decide! You\'ll go home with your finished mod.'
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
