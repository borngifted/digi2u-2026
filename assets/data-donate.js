/* ==========================================================================
   Digi2U 2026 — donation channels
   The three ways to give that ran on the previous digi2u.org/dontations page,
   carried over verbatim where the destination still exists:
     GoFundMe     — the JellyBox 3D-printer campaign
     Zeffy        — the recurring / one-time form (Zeffy takes no platform fee)
     DonateStock  — appreciated securities, via the Easy Button (EIN 88-3213984)
   Every URL here was checked live before it was written down. Change a
   campaign and you change it once, in this file — the page reads nothing else.
   ========================================================================== */

const D2U_DONATE = {
  gofundme:     'https://www.gofundme.com/f/empower-learning-build-your-own-jellybox-3d-printer?utm_campaign=man_sharesheet_dash&utm_medium=customer&utm_source=copy_link',
  zeffyForm:    'https://www.zeffy.com/donation-form/donate-to-change-lives-3894',
  zeffyEmbed:   'https://www.zeffy.com/embed/donation-form/donate-to-change-lives-3894',
  zeffyThermo:  'https://www.zeffy.com/embed/thermometer/donate-to-change-lives-3894',
  /* The Easy Button renders itself from the EIN; the plain link is the
     no-JavaScript fallback and lands on the same secure portal. */
  stockEin:     '883213984',
  stockFallback:'https://donatestock.com/donate/new/form/?ein=883213984',
  taxCalc:      'https://tax-calculator.donatestock.com/'
};

/* The three channels, in the order the page offers them. `href` is what the
   card's button does — an in-page jump where the form is embedded below, an
   external campaign where it is not. */
const D2U_DONATE_WAYS = [
  {
    icon: '01', title: 'Give directly', tag: 'Zeffy · 0% platform fee',
    desc: 'One-time or monthly, by card, Apple Pay, Google Pay, or bank transfer. Zeffy charges nonprofits nothing, so the full amount you enter reaches Digi2U programs.',
    cta: 'Open the donation form', href: '#zeffy'
  },
  {
    icon: '02', title: 'Back a campaign', tag: 'GoFundMe',
    desc: 'Fund a specific build. The open campaign puts JellyBox 3D printers — and the training to run them — into the hands of learners who have never touched one.',
    cta: 'Donate on GoFundMe', href: D2U_DONATE.gofundme, external: true
  },
  {
    icon: '03', title: 'Donate stock', tag: 'DonateStock · EIN 88-3213984',
    desc: 'Give appreciated securities instead of cash: you may avoid capital-gains tax and deduct full market value, which usually means a larger gift at a lower cost to you.',
    cta: 'Start a stock gift', href: '#stock'
  }
];

/* Causes carried over from the previous site. Raised/goal figures are the ones
   published there; `pct` drives the bar width and is deliberately separate so a
   corrected total does not silently move the bar on its own. */
const D2U_CAUSES = [
  {
    img: D2U_DECK + 'd2u-deck-3d-prototyping.webp',
    title: 'Empower Learning', kicker: 'GoFundMe',
    head: 'Support tech access',
    desc: 'Your support helps provide underserved communities with access to technology, training, and resources, empowering them to thrive in the digital age.',
    raised: '$0', goal: '$20,000', pct: 2,
    cta: 'Give on GoFundMe', href: D2U_DONATE.gofundme, external: true
  },
  {
    img: D2U_DECK + 'd2u-deck-barat-studio.webp',
    title: 'Studio Way', kicker: 'Capital Build',
    head: 'Help build the future',
    desc: 'Your support helps rebuild and deliver cutting-edge digital education, empowering communities with skills, technology, and opportunities for a brighter future.',
    raised: '$0', goal: '$300,000', pct: 1,
    cta: 'Fund the build', href: D2U_DONATE.zeffyForm, external: true
  },
  {
    img: D2U_DECK + 'd2u-deck-videography.webp',
    title: 'Dime A Day', kicker: 'Monthly Giving',
    head: 'Change for the future',
    desc: 'Your spare change creates big opportunities, empowering students, veterans, and small businesses through digital education, 3D printing, and hands-on training.',
    raised: '$0', goal: '$12,000', pct: 2,
    cta: 'Give monthly', href: D2U_DONATE.zeffyForm, external: true
  }
];

const D2U_STOCK_WHY = [
  { title: 'Supercharge your impact', desc: 'Giving shares instead of cash may let you avoid capital-gains tax and deduct the full market value of the gift — the same holding does more.' },
  { title: 'Fuel creative and technical access', desc: 'Your gift expands the mobile labs, additive-manufacturing training, and the AI and production tools that reach learners who have no other route to them.' },
  { title: 'Streamline the process', desc: 'No complex forms and no heavy paperwork. One online portal handles the transfer and the acknowledgement.' },
  { title: 'Give with confidence', desc: 'The platform is transparent, donor-friendly, and built for nonprofits of every size — including ours.' }
];

const D2U_STOCK_STEPS = [
  { n: '01', title: 'Open the portal',   desc: 'Use the Donate Stock button below. It opens a secure form already pointed at Digi2U.' },
  { n: '02', title: 'Name your shares',  desc: 'Enter what you are gifting. Your brokerage sends the shares by DTC transfer to the platform.' },
  { n: '03', title: 'We acknowledge it', desc: 'Digi2U receives either the shares or the proceeds after sale, and you get a timely acknowledgement and tax receipt.' },
  { n: '04', title: 'It goes to work',   desc: 'The gift is applied to programs — training, media production, community makerspaces, certifications.' }
];

const D2U_STOCK_KNOW = [
  { title: 'No cost to you',        desc: 'As the donor you pay no fees.' },
  { title: 'Tax-friendly',          desc: 'Shares held more than a year may be deducted at full market value with no capital-gains tax. Confirm the specifics with your tax advisor.' },
  { title: 'Fast and transparent',  desc: 'Most transfers complete within a few business days of being initiated.' },
  { title: 'Customize your gift',   desc: 'Designate it to a specific program — the AI makerspace initiative, for example — or leave it for general use.' },
  { title: 'Anonymity is yours',    desc: 'Stay anonymous, or have your name shared with Digi2U for recognition. Your call.' }
];

const D2U_DONATE_FAQ = [
  {
    q: 'What if I am not comfortable giving actual shares?',
    a: 'That is fine — the platform can liquidate the shares and deliver the net proceeds to Digi2U, so you never have to manage the sale logistics.'
  },
  {
    q: 'Will I know when the gift is completed, and get a receipt?',
    a: 'Yes. You receive confirmation when the shares arrive and a tax receipt for the donation. Digi2U also sends a thank-you letter.'
  },
  {
    q: 'What if Digi2U does not accept stock directly?',
    a: 'No problem. The platform processes the donation on behalf of Digi2U and converts the asset, so Digi2U receives cash.'
  },
  {
    q: 'How much should I donate?',
    a: 'There is no minimum. Stock gifts are often substantially larger than cash gifts, so even a modest appreciated holding can turn into meaningful funding.'
  },
  {
    q: 'Is my donation tax-deductible?',
    a: 'Yes. Digi2U is a registered 501(c)(3) nonprofit, EIN 88-3213984, and all gifts are tax-deductible to the extent allowed by law.'
  },
  {
    q: 'Does Zeffy really take nothing?',
    a: 'Zeffy charges nonprofits no platform fee and covers transaction costs; it is funded by an optional contribution donors may add at checkout. That tip is voluntary — set it to zero and 100% of your gift still reaches Digi2U.'
  }
];
