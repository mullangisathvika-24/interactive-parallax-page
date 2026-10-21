import { KindnessNote, SceneMeta, WallNote, BecomingArtifact } from '../types';

export const SCENES: SceneMeta[] = [
  {
    id: 'opening',
    index: '00',
    title: 'Welcome',
    subtitle: 'Hey, you’re here.',
    theme: 'Arrival',
  },
  {
    id: 'morning',
    index: '01',
    title: 'The Morning',
    subtitle: 'Some days begin with big plans. Some begin with finding your other sock.',
    theme: 'Beginnings',
  },
  {
    id: 'little-things',
    index: '02',
    title: 'The Little Things',
    subtitle: 'Your life isn’t only happening at the big milestones. It’s happening here, too.',
    theme: 'Ordinary Joy',
  },
  {
    id: 'rain',
    index: '03',
    title: 'Rain Has Its Own Plans',
    subtitle: 'Sometimes the plan is to have no plan. Sometimes that’s exactly what you need.',
    theme: 'Patience & Rest',
  },
  {
    id: 'people',
    index: '04',
    title: 'People Who Make It Better',
    subtitle: 'Some people make even the most ordinary Tuesday feel like a story worth remembering.',
    theme: 'Connection',
  },
  {
    id: 'becoming',
    index: '05',
    title: 'The Things We’re Still Becoming',
    subtitle: 'You don’t need the whole map. Sometimes you just need the courage to take the next turn.',
    theme: 'Possibility',
  },
  {
    id: 'closing',
    index: '06',
    title: 'Before You Go',
    subtitle: 'You don’t have to make every moment extraordinary. Just remember that the ordinary ones count, too.',
    theme: 'Gratitude',
  },
];

export const INITIAL_KINDNESS_NOTES: KindnessNote[] = [
  {
    id: 'kn-1',
    text: 'Give yourself credit for the heavy lifting you did quietly, when nobody was clapping and nobody noticed.',
    author: 'A stranger on the train',
    date: 'October morning',
    stamp: 'Gentle Reminder',
  },
  {
    id: 'kn-2',
    text: 'You don’t need to prove your worth to the universe today. Drink water, look at a cloud, let breathing be enough.',
    author: 'Neighbor in 3B',
    date: 'Early autumn',
    stamp: 'Take a Breath',
  },
  {
    id: 'kn-3',
    text: 'Someone out there still remembers a small kind sentence you said three years ago when they needed it most.',
    author: 'Someone who kept walking',
    date: 'A Tuesday dusk',
    stamp: 'Echoes of Goodness',
  },
  {
    id: 'kn-4',
    text: 'It is entirely okay if all you made today was coffee and it through the afternoon.',
    author: 'From a bench under the elm',
    date: 'Overcast morning',
    stamp: 'Peace with Today',
  },
  {
    id: 'kn-5',
    text: 'The garden grows beneath the dirt for weeks before a single green leaf shows its face. Trust what is growing in the dark.',
    author: 'The community gardener',
    date: 'Sunday dawn',
    stamp: 'Unseen Growth',
  },
  {
    id: 'kn-6',
    text: 'May you find that thing you lost in your coat pocket from last winter, and may it make you smile for thirty seconds.',
    author: 'Tea drinker with worn sleeves',
    date: 'Crisp morning',
    stamp: 'Tiny Miracle',
  },
  {
    id: 'kn-7',
    text: 'You are allowed to begin again without giving a speech about why you stopped.',
    author: 'Sketchbook corner note',
    date: 'Dusk',
    stamp: 'Fresh Page',
  },
  {
    id: 'kn-8',
    text: 'The street cat who sat near you today didn’t care about your productivity metrics. She just liked your warmth.',
    author: 'Bakery doorstep regular',
    date: 'Noon',
    stamp: 'Unconditional',
  },
  {
    id: 'kn-9',
    text: 'Don’t forget: you survived 100% of the days you thought would crack you wide open.',
    author: 'Old library book margin',
    date: 'Rainy afternoon',
    stamp: 'Quiet Strength',
  },
  {
    id: 'kn-10',
    text: 'Put the warm mug between both hands. Close your eyes for five seconds. The world will wait for you.',
    author: 'The tea stall owner',
    date: '7:40 AM',
    stamp: 'Warm Ceramic',
  },
];

export const WALL_NOTES: WallNote[] = [
  {
    id: 'wn-1',
    title: 'The Bakery Window',
    snippet: 'The scent of warm cardamom buns at 7:00 AM.',
    fullText: 'Before the city fully wakes up, the baker leaves the side window cracked open. For three blocks, the morning smells like melted butter and cinnamon. It costs nothing to stop and inhale deeply.',
    author: 'Elena, block 4',
    rotation: -2,
    color: '#FFF8E7',
  },
  {
    id: 'wn-2',
    title: 'The Spare Green Light',
    snippet: 'Hitting three green lights in a row when you were running late.',
    fullText: 'Not a miracle, just a gentle wave from the city traffic grid saying: "Go on, you are going to make it just fine."',
    author: 'Tomas, commuter',
    rotation: 3,
    color: '#F4F9F2',
  },
  {
    id: 'wn-3',
    title: 'Old Books in the Rain',
    snippet: 'Finding a pencil inscription from 1974 in a $2 paperback.',
    fullText: '"For Marianne, so you never forget the way the sea sounded on Tuesday." Someone loved someone fifty years ago, and now the ghost of that tenderness sits on my bedside table.',
    author: 'Mira, corner bookshop',
    rotation: -1.5,
    color: '#FDF4EB',
  },
  {
    id: 'wn-4',
    title: 'Bicycle Bell Ring',
    snippet: 'A friendly ring of the bell from someone passing by.',
    fullText: 'Not an angry honk. Just two crisp cheerful dings: "Here I am, here you are, look out for the puddle!"',
    author: 'Ravi on two wheels',
    rotation: 2.5,
    color: '#F8F6FF',
  },
];

export const PEOPLE_MOMENTS = [
  {
    id: 'friends-tea',
    title: 'Two cups of milky tea on a wooden bench',
    description: 'They have told each other the same story three times this year, but both of them laugh as if it happened ten minutes ago.',
    tag: 'Shared Slowness',
    coordinates: { x: '24%', y: '58%' },
  },
  {
    id: 'grocery-help',
    title: 'The heavy brown paper bag',
    description: 'An elderly neighbor carrying three cantaloupes; a teenage boy in headphones takes the heavier handles without a single word of ceremony.',
    tag: 'Quiet Kindness',
    coordinates: { x: '52%', y: '64%' },
  },
  {
    id: 'curious-pup',
    title: 'A puppy inspecting a dandelion',
    description: 'Four strangers paused on the corner of the crosswalk just to watch a tiny golden retriever sneeze at flower fluff.',
    tag: 'Accidental Community',
    coordinates: { x: '78%', y: '62%' },
  },
];

export const BECOMING_ARTIFACTS: BecomingArtifact[] = [
  {
    id: 'art-notebook',
    title: 'The Half-Filled Sketchbook',
    summary: 'You do not need to finish every single page to make the drawing worthwhile.',
    content: 'We often abandon things because we think incompleteness equals failure. But the half-drawn teacup on page 14 taught your hand how to hold the charcoal. Every crooked draft was secretly preparing you for something cleaner.',
    category: 'Creativity',
    coordinates: { x: 22, y: 35 },
  },
  {
    id: 'art-boat',
    title: 'The Little Paper Boat',
    summary: 'A small vessel still navigates an entire river.',
    content: 'You do not need an engine, a crew of forty, or a nautical blueprint to move downstream. Sometimes the paper boat simply goes where the water is honest, turning corners it could never predict.',
    category: 'Courage',
    coordinates: { x: 44, y: 28 },
  },
  {
    id: 'art-lantern',
    title: 'The Rooftop Lantern',
    summary: 'Your light does not have to illuminate the next county.',
    content: 'A lantern only illuminates about six paces ahead of your boots. That is plenty. Six paces is all you ever have to walk at one time.',
    category: 'Clarity',
    coordinates: { x: 68, y: 32 },
  },
  {
    id: 'art-seedling',
    title: 'The Clay Pot Seedling',
    summary: 'Most of the growth happens in quiet soil where nobody is watching.',
    content: 'Roots don’t look for an audience before they reach deeper into the loam. They stretch out because it is what living things do when they are nurtured by rain and time.',
    category: 'Patience',
    coordinates: { x: 84, y: 48 },
  },
];
