import { withKnobs, select, text, boolean } from '@storybook/addon-knobs';
import '../components/teaser/_teaser.scss';
import teaserDocs from '../components/teaser/teaser.mdx';

export default {
  title: 'Teaser',
  parameters: {
    decorators: [withKnobs],
    'in-dsm': { id: '5e8f777c364304fa84e349bc'}
  }
};

const groupIdStructure = "Structure";
const groupIdData = "Data";

const availableImages = {
  'Facility Image': '/facilityImage.png',
  'Membership Card': '/membershipCardBg.png'
};

export const teaserCore = () => {

  const teaserImage = select('Image', availableImages, availableImages["Membership Card"], groupIdStructure);
  const teaserTitleLink = boolean('Title Link ?', false, groupIdStructure);

  const teaserPreTitle = text('Pretitle', 'Pretitle', groupIdData);
  const teaserTitle = text('Title', 'Title', groupIdData);
  const teaserDescription = text('Description', 'Description', groupIdData);
  const teaserImageAlternativeText = text('Image Alternative Text', '', groupIdData);
  const teaserCTAText = text('CTA Text', '', groupIdData);
  
  return `
    <div class="dsm-container">
      <div class="teaser">
        <div class="cmp-teaser">
          <div class="cmp-teaser__image">
            <div class="cmp-image">
              <img src="${teaserImage}" class="cmp-image__image" alt="${teaserImageAlternativeText}" title="${teaserImageAlternativeText}">
            </div>
          </div>
          <div class="cmp-teaser__content">
            <div class="cmp-teaser__pretitle">${teaserPreTitle}</div>
            <h2 class="cmp-teaser__title">
            ${teaserTitleLink ? `<a href="" class="cmp-teaser__title--link">`:``}
              ${teaserTitle}
            ${teaserTitleLink ? `</a>`:``}
            </h2>
            <div class="cmp-teaser__description">
              <p>${teaserDescription}</p>
            </div>
            ${teaserCTAText !== "" ?
              `<div class="cmp-teaser__action-container">
                <a href="" class="cmp-button"/>${teaserCTAText}</a>
              </div>`:``}
          </div>
        </div>
      </div>
    </div>`
};

teaserCore.story = {
  name: 'Teaser',
  parameters: {
    'in-dsm': {
      docFilePath: '../components/teaser/teaser.docs.json',
      containerClass: 'dsm-container',
      version: '0.0.1'
    },
    docs: { page: teaserDocs }
  }
}