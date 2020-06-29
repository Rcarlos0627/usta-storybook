import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import '../components/image/_image.scss';
import imageDocs from '../components/image/image.mdx';

export default {
  title: 'Image',
  parameters: {
    decorators: [withKnobs],
    'in-dsm': { id: '5e84e5ad8b57e3725938be1f'}
  }
};

const groupIdStructure = "Structure";
const groupIdData = "Data";

const availableImages = {
  None: '',
  'USTA Logo': '/certLogo.png',
  'Facility Image': '/facilityImage.png'
};

export const imageCore = () => {

  const imageFile = select('File', availableImages, availableImages.None, groupIdStructure);
  const imageLink = boolean('Link ?', false, groupIdStructure);
  const imageCaption = text('Caption', '', groupIdData);
  const imageAlternativeText = text('Alternative Text', '', groupIdData);

  return `
    <div class="dsm-container">
      <div class="image">
        <div class="cmp-image">
          ${imageLink ? `<a class="cmp-image__link" href="">`: ``}
          <img class="cmp-image__image" src="${imageFile !== availableImages.None ? imageFile : ''}" alt="${imageAlternativeText}" title="${imageAlternativeText}">
          ${imageCaption !== '' ? `<span class="cmp-image__title">${imageCaption}</span>` : ``}
          ${imageLink ? `</a>`: ``}
        </div>
      </div>
    </div>`
};

imageCore.story = {
  name: 'Image',
  parameters: {
    'in-dsm': {
      docFilePath: '../components/image/image.docs.json',
      containerClass: 'dsm-container',
      version: '0.0.1'
    },
    docs: { page: imageDocs }
  }
};
