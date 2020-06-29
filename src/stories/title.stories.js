import { withKnobs, select, boolean, text, date } from '@storybook/addon-knobs';
import '../components/title/_title.scss';
import '../components/title/_article-section.scss';
import titleDocs from '../components/title/title.mdx';
import sectionsJson from '../components/utils/jsons/sections.json';

export default {
	title: 'Title',
	parameters: {
		decorators: [withKnobs],
		'in-dsm': { id: '5e7a4550bcfb337b9f87a9a2'}
	}
};

const groupIdStructure = "Structure";
const groupIdStyles = "Styles";
const groupIdData = "Data";

const displayThemeOptions = {
	label: 'Display Theme',
	values: {
		'None': '',
		'USTA Standard': 'cmp-title--usta-standard'
	}
};

const textAligmentOptions = {
	label: 'Text Aligment',
	values: {
		'None': '',
		'Center': 'cmp-title--alignment-center',
		'Left': 'cmp-title--alignment-leftt',
		'Right': 'cmp-title--alignment-right'
	}
};

const textColorOptions = {
	label: 'Text Color',
	values: {
		'None': '',
		'Black': 'cmp-title--color-black',
		'White': 'cmp-title--color-white',
		'Light Blue': 'cmp-title--color-light-blue'
	}
};

const headingOptions = {
	label: 'Heading Size',
	values: {
		h1: 'h1',
		h2: 'h2',
		h3: 'h3',
		h4: 'h4',
		h5: 'h5',
		h6: 'h6'
	}
};

const locationOptions = {
	label: 'Location Info',
	values: {
		'Section and District': 'all',
		'Section Only': 'section',
		'National': 'national',
		'Disabled': 'disabled'
	}
};

const authorDateOptions = {
	label: 'Author & Date Info',
	values: {
		'Author and Date': 'all',
		'Date Only': 'date',
		'Disabled': 'disabled'
	}
};

const anchorLinkOptions = {
	label: 'Anchor Link'
};

const titleDataOptions = {
	label: 'Title Text'
};

const authorDataOptions = {
	label: 'Author Text'
};

const dateDataOptions = {
	label: 'Date Value'
};

function formatDate(dateTime) {
	let dateReceived = new Date(dateTime);
	let month = new Array();
	month[0] = "January";
	month[1] = "February";
	month[2] = "March";
	month[3] = "April";
	month[4] = "May";
	month[5] = "June";
	month[6] = "July";
	month[7] = "August";
	month[8] = "September";
	month[9] = "October";
	month[10] = "November";
	month[11] = "December";
	let monthField = month[dateReceived.getMonth()];
	let year = dateReceived.getFullYear();
	let day = dateReceived.getDate();
	return monthField + " " + day + ", " + year;
}

let location = [];
function getLocationText(conf) {
	if (conf == 'national') {
		location = ['National'];
		return true;
	}
	let sectionWinner = Math.floor(Math.random() * sectionsJson.sections_with_districts.length);
	if (conf == 'all') {
		location = [sectionsJson.sections_with_districts[sectionWinner].name, sectionsJson.sections_with_districts[sectionWinner].districts[Math.floor(Math.random() * sectionsJson.sections_with_districts[sectionWinner].districts.length)].name];
		return true;
	}
	if (conf == 'section') {
		location = [sectionsJson.sections_no_districts[Math.floor(Math.random() * sectionsJson.sections_no_districts.length)].name];
		return true;
	}
	location = [];
	return false;
}

export const titleCore = () => {
	// Styles
	const displayTheme = select(displayThemeOptions.label, displayThemeOptions.values, displayThemeOptions.values.None, groupIdStyles);
	const textAligment = select(textAligmentOptions.label, textAligmentOptions.values, textAligmentOptions.values.None, groupIdStyles);
	const textColor = select(textColorOptions.label, textColorOptions.values, textColorOptions.values.None, groupIdStyles);
	// Structure	
	const locationInfo = select(locationOptions.label, locationOptions.values, locationOptions.values['Section and District'], groupIdStructure);
	const titleHeading = select(headingOptions.label, headingOptions.values, headingOptions.values.h1, groupIdStructure);
	const enableLink = boolean(anchorLinkOptions.label, false, groupIdStructure);
	const authorDate = select(authorDateOptions.label, authorDateOptions.values, authorDateOptions.values['Author and Date'], groupIdStructure);
	// Data
	const titleData = text(titleDataOptions.label, 'A Random Example Title', groupIdData);
	const authorData = text(authorDataOptions.label, 'An Author Name', groupIdData);
	const dateData = date(dateDataOptions.label, new Date('Mar 19 2020'), groupIdData);

	return `
	<div class="dsm-container">
		<div class="title${displayTheme ? ' ' + displayTheme : ''}${textAligment ? ' ' + textAligment : ''}${textColor ? ' ' + textColor : ''}">
			<div class="cmp-title">
			${locationInfo != 'disabled' ? `
				<div class="cmp-title__eyebrow">
					<div class="cmp-articlesection">
						<span class="cmp-articlesection__section--${locationInfo == 'all' ? 'general' : (locationInfo == 'national' ? 'national' : 'other')}">${getLocationText(locationInfo) ? location[0] : ''}</span>
						${locationInfo == 'all' ? `<span class="cmp-articlesection__greyline"> / </span>
						<span class="cmp-articlesection__district">${location[1]}</span>` : ``}
					</div>
				</div>`: ``}
				<${titleHeading} class="cmp-title__text">${enableLink ? `\n<a class="cmp-title__link" href="">` : ``}
						${titleData}${enableLink ? `\n</a>` : ``}					
				</${titleHeading}>
				${authorDate != 'disabled' ? `<div class="cmp-title__authorDate">
					${(authorDate == 'all' ? `${authorData} | ` : ``)}${formatDate(dateData)}
				</div>`: ``}
			</div>
		</div>
	</div>`;
};

titleCore.story = {
	name: 'Title',
	parameters: {
		'in-dsm': {
			docFilePath: '../components/title/title.docs.json',
			containerClass: 'dsm-container',
			version: '1.0.0'
		},
		docs: { page: titleDocs }
	},
};