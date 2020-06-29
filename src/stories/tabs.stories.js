import { withKnobs, select, boolean, text, date } from '@storybook/addon-knobs';
import '../components/tabs/_tabs.scss';
import tabsDocs from '../components/tabs/tabs.mdx';

export default {
    title: 'Tabs',
    parameters: {
        decorators: [withKnobs],
        'in-dsm': { id: '5e86271b07d51d3307b0ccb5' }
    }
};

const groupIdData = "Data";

const itemsLabelOptions = {
    label1: 'Item 1 Label',
    label2: 'Item 2 Label',
    label3: 'Item 3 Label'
};

export const tabsCore = () => {
    
    const Item1 = text(itemsLabelOptions.label1, 'Personal', groupIdData);
    const Item2 = text(itemsLabelOptions.label2, 'Coach', groupIdData);
    const Item3 = text(itemsLabelOptions.label3, 'Organization', groupIdData);

    $(document).ready(() => {
        var redBorder = document.getElementById("borderCSS");
        var topOptions = document.getElementsByClassName("cmp-tabs__tablist")[0]
            .querySelectorAll("li.cmp-tabs__tab");
        var optionPanels = document.getElementsByClassName("cmp-tabs")[0]
            .querySelectorAll("div.cmp-tabs__tabpanel");
        var activeNode = -1;
        for (var x = 0; x < topOptions.length; x++) {
            if (topOptions[x].classList.length > 1 && topOptions[x].classList.contains("cmp-tabs__tab--active")) {
                activeNode = x;
            }
            topOptions[x].index = x;
            topOptions[x].addEventListener("click", function manageClicks() {
                if (activeNode != this.index) {
                    changeActive(this.index);
                } else {
                    //Clicked Node already active
                }
            });
        }
        function changeActive(index) {
            topOptions[activeNode].classList.remove("cmp-tabs__tab--active");
            optionPanels[activeNode].classList.remove("cmp-tabs__tabpanel--active");
            topOptions[index].classList.add("cmp-tabs__tab--active");
            optionPanels[index].classList.add("cmp-tabs__tabpanel--active");
            activeNode = index;
            adjustBorder(index);
        }
        function adjustBorder(index) {
            var accumulatedWidth = 0;
            for (var y = 0; y < index; y++) {
                accumulatedWidth = accumulatedWidth + topOptions[y].offsetWidth;
            }
            redBorder.innerText = ".core-tabs .cmp-tabs__border-wrapper .cmp-tabs__border{left:" + accumulatedWidth + "px; width:" + topOptions[y].offsetWidth + "px;}";
        }
        adjustBorder(activeNode);
      });

    return `
    <div class="dsm-container">
    <div class="core-tabs">
        <div class="cmp-tabs">
            <ol class="cmp-tabs__tablist">
                <li class="cmp-tabs__tab cmp-tabs__tab--active">${Item1}
                </li>
                <li class="cmp-tabs__tab">${Item2}
                </li>
                <li class="cmp-tabs__tab">${Item3}
                </li>
            </ol>
            <div class="cmp-tabs__border-wrapper">
                <div class="cmp-tabs__background-border"></div>
                <div class="cmp-tabs__border"></div>
            </div>
            <div class="cmp-tabs__tabpanel cmp-tabs__tabpanel--active">
            </div>
            <div class="cmp-tabs__tabpanel">
            </div>
            <div class="cmp-tabs__tabpanel">
            </div>
        </div>
    </div>
    </div>
    <style id="borderCSS">
    </style>
    `;
};

tabsCore.story = {
    name: 'Tabs',
    parameters: {
        'in-dsm': {
            docFilePath: '../components/tabs/tabs.docs.json',
            containerClass: 'dsm-container',
            version: '0.0.1'
        },
        docs: { page: tabsDocs }
    },
};