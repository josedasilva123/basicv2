import Tabs from './modules/tabs.js';
import FixedOnScroll from './modules/fixedOnScroll.js';
import ToggleButton from './modules/toggleButton.js';
import Modal from './modules/modal.js';
import ScrollAnimation from './modules/scrollAnimation.js';
import ValidateForm from './modules/form.js';

const tabs = new Tabs();
tabs.init();

const fixedScroll = new FixedOnScroll();
fixedScroll.init();

const toggle = new ToggleButton();
toggle.init();

const modal = new Modal();
modal.init();

const scrollAnimation = new ScrollAnimation();
scrollAnimation.init();