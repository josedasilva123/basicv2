import Tabs from './modules/tabs.js';
import FixedOnScroll from './modules/fixedOnScroll.js';
import toggleButton from './modules/toggleButton.js';
import Modal from './modules/modal.js';

const tabs = new Tabs();
tabs.init();

const fixedScroll = new FixedOnScroll();
fixedScroll.init();

const toggle = new toggleButton();
toggle.init();

const modal = new Modal();
modal.init();