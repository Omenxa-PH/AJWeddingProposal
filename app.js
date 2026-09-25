(() => {
  'use strict';

  const params = new URLSearchParams(window.location.search);
  const roles = {
    bridesmaid: {
      word: 'bridesmaid', party: 'bride', sender: 'From Jessa, with love',
      intro: 'Some of the most beautiful moments in life are made even better by the people standing beside us.',
      note: 'I would love to have you by my side as I walk into this new chapter with Alfred.',
      proposalNote: 'Our day would be all the sweeter with you beside me.'
    },
    groomsman: {
      word: 'groomsman', party: 'groom', sender: 'From Alfred, with love',
      intro: 'The best moments in life mean more when shared with the people who have been there along the way.',
      note: 'I would love to have you standing beside me when Jessa and I say our vows.',
      proposalNote: 'The big day would be even better with you on my team.'
    },
    'maid-of-honor': {
      word: 'maid of honor', party: 'bride', sender: 'From Jessa, with love',
      intro: 'From the little moments to the milestones, having you in my life has meant so much.',
      note: 'It would mean the world to have you by my side as my maid of honor.',
      proposalNote: 'No one could fill this place in my heart quite like you can.'
    },
    'best-man': {
      word: 'best man', party: 'groom', sender: 'From Alfred, with love',
      intro: 'Some of the best memories are made with people who stay beside us through every chapter.',
      note: 'It would mean the world to have you standing beside me as my best man.',
      proposalNote: 'I would be honored to have you standing with me on our wedding day.'
    },
    'ring-bearer': {
      word: 'ring bearer', party: 'neutral', sender: 'From Alfred & Jessa, with love',
      intro: 'Our wedding day will be filled with meaningful little moments, and you are part of one of the sweetest of all.',
      note: 'We would be so happy to have you carry this special symbol of our promises.',
      proposalNote: 'Will you help bring our rings down the aisle on our special day?'
    },
    'bible-bearer': {
      word: 'Bible bearer', party: 'neutral', sender: 'From Alfred & Jessa, with love',
      intro: 'Faith is one of the beautiful foundations of our journey together.',
      note: 'It would mean so much to us to have you take part in such a meaningful moment.',
      proposalNote: 'Will you help carry the Bible that will bless our wedding ceremony?'
    },
    'banner-lady': {
      word: 'banner lady', party: 'neutral', sender: 'From Alfred & Jessa, with love',
      intro: 'Our day will be even more beautiful with the people we love sharing in every small detail.',
      note: 'We would love for you to be part of our ceremony in a special way.',
      proposalNote: 'Will you be our banner lady and help lead the way with grace?'
    },
    'banner-bearer': {
      word: 'banner bearer', party: 'neutral', sender: 'From Alfred & Jessa, with love',
      intro: 'Our day will be even more beautiful with the people we love sharing in every small detail.',
      note: 'We would love for you to be part of our ceremony in a special way.',
      proposalNote: 'Will you be our banner bearer and help lead the way on our wedding day?'
    },
    'flower-girl': {
      word: 'flower girl', party: 'neutral', sender: 'From Alfred & Jessa, with love',
      intro: 'Every love story deserves a little extra sweetness, joy, and petals.',
      note: 'We would be delighted to have you add a touch of beauty to our aisle.',
      proposalNote: 'Will you be our flower girl and sprinkle sweetness along our path?'
    },
    'bubble-girl': {
      word: 'bubble girl', party: 'neutral', sender: 'From Alfred & Jessa, with love',
      intro: 'Our celebration would be even more magical with a little sparkle and joy.',
      note: 'We would be so happy to have you be part of our wedding day.',
      proposalNote: 'Will you be our bubble girl and fill our day with fun and wonder?'
    },
    'candle-sponsor': {
      word: 'candle sponsor', party: 'neutral', sender: 'From Alfred & Jessa, with love',
      intro: 'Some roles in a wedding carry a quiet beauty, and this is one of them.',
      note: 'Your presence would make this meaningful moment even more special to us.',
      proposalNote: 'Will you light our path?'
    },
    'cord-sponsor': {
      word: 'cord sponsor', party: 'neutral', sender: 'From Alfred & Jessa, with love',
      intro: 'Some wedding traditions beautifully reflect the meaning of love and unity.',
      note: 'We would be honored to have you take part in one of those meaningful moments.',
      proposalNote: 'Will you bind us together?'
    },
    'veil-sponsor': {
      word: 'veil sponsor', party: 'neutral', sender: 'From Alfred & Jessa, with love',
      intro: 'Some wedding traditions gently express love, care, and togetherness.',
      note: 'We would be honored to have you take part in one of those treasured moments.',
      proposalNote: 'Will you clothe us as one?'
    },
    guest: {
      word: 'special guest', party: 'neutral', sender: 'From Alfred & Jessa, with love',
      intro: 'A celebration feels most complete when shared with the people closest to our hearts.',
      note: 'We would be so happy to celebrate this beautiful chapter with you.',
      proposalNote: 'Will you celebrate with us on our special day?'
    }
  };

  const roleId = roles[params.get('role')] ? params.get('role') : 'bridesmaid';
  const role = roles[roleId];
  const instantOpen = params.get('open') === '1';
  const receivedName = (params.get('name') || '').replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, 60);
  const name = receivedName || 'Your Name';
  const personalized = Boolean(receivedName && roles[params.get('role')]);
  const $ = (id) => document.getElementById(id);

  function applyRoleContent() {
    document.body.dataset.party = role.party;
    $('guest-name').textContent = name;
    $('intro-text').textContent = role.intro;
    $('sender-text').textContent = role.note;
    $('proposal-label').textContent = role.sender;
    $('role-word').textContent = role.word;
    $('proposal-note').textContent = role.proposalNote;
    document.title = personalized ? `For ${name} | A Wedding Party Proposal` : 'A Little Question For You | Alfred & Jessa';
    $('preview-banner').hidden = personalized;
  }

  // The public responder URL alone does not contain Google Forms entry IDs.
  // Once the owner supplies a genuine pre-filled link, detect the three IDs from
  // the example values and replace them with each guest's invitation parameters.
  const form = (window.WEDDING_PROPOSAL_CONFIG || {}).responseForm || {};
  const FORM_ANSWER_YES = "Yes, I'd love to! 💙";
  const FORM_ANSWER_LATER = 'I need more time to decide.';
  const FORM_ROLE_LABELS = {
    bridesmaid: 'Bridesmaid',
    groomsman: 'Groomsmen',
    'best-man': 'Best Man',
    'maid-of-honor': 'Maid of Honor',
    'ring-bearer': 'Ring Bearer',
    'bible-bearer': 'Bible Bearer',
    'banner-lady': 'Banner Lady',
    'banner-bearer': 'Banner Bearer',
    'flower-girl': 'Flower Girl',
    'bubble-girl': 'Bubble Girl',
    'candle-sponsor': 'Candle Sponsor',
    'cord-sponsor': 'Cord Sponsor',
    'veil-sponsor': 'Veil Sponsor',
    guest: 'Guest / Special Guest'
  };

  function googleFormUrl(raw) {
    try {
      const url = new URL(raw);
      if (url.protocol !== 'https:' || url.hostname !== 'docs.google.com') return null;
      if (!/^\/forms\/d\/(?:e\/)?[^/]+\/viewform\/?$/.test(url.pathname)) return null;
      return url;
    } catch (_) {
      return null;
    }
  }

  function resolveForm() {
    const template = googleFormUrl(form.prefilledUrl || '');
    if (template) {
      const entries = [...template.searchParams.entries()];
      const findEntry = (value) => entries.find(([key, val]) => /^entry\.\d+$/.test(key) && val === value)?.[0];
      const nameEntry = findEntry('YOUR_NAME');
      // Use an actual dropdown option. YOUR_ROLE is NOT a valid dropdown choice.
      const roleEntry = findEntry('Bridesmaid');
      const answerEntry = findEntry(FORM_ANSWER_YES);
      if (nameEntry && roleEntry && answerEntry && new Set([nameEntry, roleEntry, answerEntry]).size === 3) {
        return { url: template, nameEntry, roleEntry, answerEntry };
      }
    }
    // Legacy/manual entry IDs can also be supplied by an advanced user.
    const legacy = googleFormUrl(form.formUrl || '');
    const entryIds = [form.nameEntry, form.roleEntry, form.answerEntry];
    if (legacy && entryIds.every(item => /^entry\.\d+$/.test(item || '')) && new Set(entryIds).size === 3) {
      return { url: legacy, nameEntry: form.nameEntry, roleEntry: form.roleEntry, answerEntry: form.answerEntry };
    }
    return null;
  }
  const responseForm = resolveForm();
  const manualForm = googleFormUrl(form.formUrl || '');

  function formURL(answer) {
    if (!responseForm) return manualForm ? manualForm.toString() : null;
    const url = new URL(responseForm.url);
    for (const key of [...url.searchParams.keys()]) {
      if (/^entry\.\d+$/.test(key)) url.searchParams.delete(key);
    }
    url.searchParams.set('usp', 'pp_url');
    url.searchParams.set(responseForm.nameEntry, name);
    url.searchParams.set(responseForm.roleEntry, FORM_ROLE_LABELS[roleId]);
    url.searchParams.set(responseForm.answerEntry, answer === 'yes' ? FORM_ANSWER_YES : FORM_ANSWER_LATER);
    return url.toString();
  }

  let replyText = '';
  function answer(choice) {
    const yes = choice === 'yes';
    const response = yes ? 'Yes, I would love to!' : 'I need a little time to think about it.';
    replyText = `Hi Alfred and Jessa! It's ${name}. Thank you for inviting me to be your ${role.word}. ${response} ♡`;
    $('decision-actions').hidden = true;
    $('initial-response-note').hidden = true;
    $('reply-panel').hidden = false;
    $('reply-title').textContent = yes ? 'A little yes, a lot of love!' : 'Of course, take your time ♡';
    $('reply-description').textContent = responseForm
      ? 'Your details are ready. Open the pre-filled Google Form, review, then press Submit.'
      : manualForm
        ? 'Google Forms is linked, but auto-fill still needs a pre-filled form link. Please enter your name, role, and answer manually, then press Submit.'
        : 'A Google Form is not connected yet. Copy and send your reply to Alfred or Jessa in chat.';
    $('reply-message').textContent = replyText;
    $('copy-button').textContent = 'Copy my reply';
    const formLink = formURL(yes ? 'yes' : 'later');
    $('form-link').hidden = !formLink;
    if (formLink) $('form-link').href = formLink;
    $('form-link').firstChild.textContent = responseForm ? 'Open pre-filled Google Form ' : 'Open Google Form (fill manually) ';
    $('send-guidance').textContent = responseForm
      ? 'Your name, assigned role, and answer will be selected on the Google Form. Review them and press Submit there to send your response.'
      : manualForm
        ? 'Until you paste a genuine pre-filled form link into config.js, enter your information on the Google Form manually and press Submit.'
        : 'Copy this message, then paste and send it to Alfred or Jessa in Messenger or your preferred chat.';
    $('reply-panel').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function openInvitation() {
    document.body.classList.add('is-opening');
    setTimeout(() => {
      $('invitation').classList.remove('invitation--hidden');
      document.body.classList.add('invitation-open');
      document.body.classList.remove('is-locked');
      setTimeout(() => {
        $('open-invitation').setAttribute('aria-hidden', 'true');
        $('open-invitation').tabIndex = -1;
      }, 200);
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 20 : 1250);
  }

  function setupEnvelope() {
    const envelope = $('open-invitation');
    const invitation = $('invitation');
    if (!envelope || !invitation) return;
    if (instantOpen) {
      invitation.classList.remove('invitation--hidden');
      document.body.classList.add('invitation-open', 'no-envelope');
      return;
    }
    document.body.classList.add('is-locked');
    envelope.addEventListener('click', openInvitation, { once: true });
  }

  applyRoleContent();
  setupEnvelope();

  $('accept-button').addEventListener('click', () => answer('yes'));
  $('consider-button').addEventListener('click', () => answer('later'));
  $('change-button').addEventListener('click', () => {
    $('reply-panel').hidden = true;
    $('decision-actions').hidden = false;
    $('initial-response-note').hidden = false;
    $('decision-actions').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  $('copy-button').addEventListener('click', async () => {
    try {
      if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(replyText);
      $('copy-button').textContent = 'Copied! Send it in chat ♡';
    } catch (_) {
      const input = document.createElement('textarea');
      input.value = replyText;
      input.setAttribute('readonly', '');
      input.style.position = 'fixed';
      input.style.opacity = '0';
      document.body.appendChild(input);
      input.select();
      let worked = false;
      try { worked = document.execCommand('copy'); } catch (_) { }
      input.remove();
      $('copy-button').textContent = worked ? 'Copied! Send it in chat ♡' : 'Select the message above to copy';
    }
  });

  if (navigator.share) {
    $('share-button').hidden = false;
    $('share-button').addEventListener('click', async () => {
      try { await navigator.share({ title: 'My wedding party reply', text: replyText }); } catch (_) { }
    });
  }
})();
