import { onRederLibrary } from './utilities/onRenderLibrary';
import { openModalWindow } from './modal-window';
import { libraryEventListeners } from './utilities/onRenderLibrary';
import './firebase';
import { loadUserData } from './utilities/loadUserData';
import { footerModalOpen } from './modal-window/footerModalOpen';
import './utilities/paginationLib';

const userID = JSON.parse(localStorage.getItem('user'))?.user_id;
onRederLibrary(`watched${userID}`, 1);
libraryEventListeners();
