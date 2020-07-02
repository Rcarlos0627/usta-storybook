import { configure, addDecorator, addParameters } from '@storybook/html';
import { withA11y } from '@storybook/addon-a11y';
import centered from '@storybook/addon-centered/html';
import { initDsm } from '@invisionapp/dsm-storybook';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
addParameters({
    backgrounds: [{ name: 'DSM background light', value: '#f8f8fa', default: true }, { name: 'DSM background dark', value: '#333' }],
    viewport: {
      viewports: INITIAL_VIEWPORTS
    }
  });
  
  addParameters({ docs: { page: null } });
  addDecorator(withA11y);
  addDecorator(centered);
  //Init Dsm
initDsm({
    addDecorator,
    addParameters,
    callback: () => {
      // apply the custom options
      // setCustomOptions();
      configure(require.context('../src/stories', true, /\.stories\.js$/), module);
    }
  })
  