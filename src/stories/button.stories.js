import { withKnobs, select, text, boolean } from '@storybook/addon-knobs';
import { decorate } from '@storybook/addon-actions';
import '../components/button/_button.scss';
import buttonDocs from '../components/button/button.mdx';

export default {
  title: 'Button',
  parameters: {
    decorators: [withKnobs],
    'in-dsm': { id: '5e4c2b73d1e1b3002d24faf7'}
  }
};

const groupIdStructure = "Structure";
const groupIdStyles = "Styles";
const groupIdData = "Data";

const decoratedAction = decorate([() => ['Click']]);

const availableIcons = {
  None: '',
  'Add': 'cmp-button__icon--add',
  'Alarm': 'cmp-button__icon--alarm',
  'Approved':'cmp-button__icon--approved',
  'Arrow-Down':'cmp-button__icon--arrow-down',
  'Arrow-Left':'cmp-button__icon--arrow-left',
  'Arrow-Right':'cmp-button__icon--arrow-right',
  'Arrow-Up':'cmp-button__icon--arrow-up',
  'Attachment':'cmp-button__icon--attachment',
  'Award':'cmp-button__icon--award',
  'Bookmark':'cmp-button__icon--bookmark',
  'Calendar':'cmp-button__icon--calendar',
  'Cancel': 'cmp-button__icon--cancel',
  'Check': 'cmp-button__icon--check',
  'Chevron-Back': 'cmp-button__icon--chevron-back',
  'Chevron-Down': 'cmp-button__icon--chevron-down',
  'Chevron-Forward': 'cmp-button__icon--chevron-forward',
  'Chevron-Up': 'cmp-button__icon--chevron-up',
  'Clock': 'cmp-button__icon--clock',
  'Cloud': 'cmp-button__icon--cloud',
  'Comment': 'cmp-button__icon--comment',
  'Computer': 'cmp-button__icon--computer',
  'Edit': 'cmp-button__icon--edit',
  'Envelope': 'cmp-button__icon--envelope',
  'Error': 'cmp-button__icon--error',
  'Facebook': 'cmp-button__icon--facebook',
  'Flag': 'cmp-button__icon--flag',
  'Folder': 'cmp-button__icon--folder',
  'Globe-Primary-Cut': 'cmp-button__icon--globe-primary-cut',
  'Globe-Primary': 'cmp-button__icon--globe-primary',
  'Globe': 'cmp-button__icon--globe',
  'Google+': 'cmp-button__icon--google-plus',
  'Hamburger-Menu': 'cmp-button__icon--hamburger-menu',
  'Home': 'cmp-button__icon--home',
  'Info':'cmp-button__icon--info',
  'Instagram':'cmp-button__icon--instagram',
  'Invite':'cmp-button__icon--invite',
  'Like':'cmp-button__icon--like',
  'Link':'cmp-button__icon--link',
  'Linkedin':'cmp-button__icon--linkedin',
  'Live Chat':'cmp-button__icon--live-chat',
  'Location-red':'cmp-button__icon--location-red',
  'Location':'cmp-button__icon--location',
  'Lock':'cmp-button__icon--lock',
  'Log Out':'cmp-button__icon--log-out',
  'Megaphone':'cmp-button__icon--megaphone',
  'Mic':'cmp-button__icon--mic',
  'Mobile':'cmp-button__icon--mobile',
  'More Info':'cmp-button__icon--more-info',
  'More-Options':'cmp-button__icon--more-options',
  'Navigation':'cmp-button__icon--navigation',
  'Notification':'cmp-button__icon--notfication',
  'Overflow':'cmp-button__icon--overflow',
  'pagination__arrow--fullleft':'cmp-button__icon--pagination-arrow-fullleft',
  'pagination__arrow--fullright':'cmp-button__icon--pagination-arrow-fullright',
  'Pause':'cmp-button__icon--pause',
  'Phone':'cmp-button__icon--phone',
  'Pinterest':'cmp-button__icon--pinterest',
  'Play':'cmp-button__icon--play',
  'Pop-Out':'cmp-button__icon--pop-out'
};

const availableStyles = {
  'Primary': 'cmp-button--primary',
  'Secondary': 'cmp-button--secondary',
  'Ghost': 'cmp-button--ghost',
  'Ghost Light': 'cmp-button--ghost-light',
  'Alert': 'cmp-button--alert',
  'Red Navigation': 'cmp-button--red-navigation',
  'Blue Navigation': 'cmp-button--blue-navigation'
};

const availableSizes = {
  'Small': 'cmp-button--small',
  'Large': 'cmp-button--large',
  'XL': 'cmp-button--xl'
};

export const buttonCore = () => {
  const buttonStyle = select('Style', availableStyles, availableStyles.Primary, groupIdStyles);
  const buttonSize = select('Size', availableSizes, availableSizes.Small, groupIdStyles);
  const buttonDisabled = boolean('Disabled', false, groupIdStyles);

  const buttonIcon = select('Icon', availableIcons, availableIcons.None, groupIdStructure);
  const buttonLink = boolean('Link ?', false, groupIdStructure);

  const buttonText = text('Text', 'BUTTON', groupIdData);

  return decoratedAction.withActions({ 'click .button': 'Button clicked!' })(
    () => `
    <div class="dsm-container">
      <div class="button${buttonStyle !== availableStyles.None ? ' ' + buttonStyle : ''}${buttonSize !== availableSizes.None ? ' ' + buttonSize : ''}">
        ${buttonLink ? `<a href="" class="cmp-button${buttonDisabled ? ' cmp-button--disabled' : ''}">`:`<button class="cmp-button"${buttonDisabled ? ' disabled' : ''}>`}
          <span class="cmp-button__text">${buttonText}</span>
            ${buttonIcon !== availableIcons.None ? `<span class="cmp-button__icon ${buttonIcon}"></span>`:``}
        ${buttonLink ? `</a>`:`</button>`}
      </div>
    </div>`
  );
};

buttonCore.story = {
  name: 'Button',
  parameters: {
    'in-dsm': {
      docFilePath: '../components/button/button.docs.json',
      containerClass: 'dsm-container',
      version: '0.0.1'
    },
    docs: { page: buttonDocs }
  }
};
