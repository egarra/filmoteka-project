import Pagination from 'tui-pagination';
import { fetchData } from './fetchData';
import { onRenderGallery } from './onRenderGallery';
import { onRederLibrary } from './onRenderLibrary';

let pageNum;
let totalItemsNum;

export default function PaginationLib(page, pagesNum, storageEl) {
  pageNum = page;
  totalItemsNum = pagesNum;
  let pages = 5;
  if (window.screen.width >= 768) {
    pages = 9;
  }

  const container = document.getElementById('tui-pagination-lib-container');

  const options = {
    totalItems: totalItemsNum,
    itemsPerPage: 20,
    visiblePages: pages,
    page: pageNum,
    centerAlign: true,
    template: {
      page: '<a href="#" class="page-btn">{{page}}</a>',
      currentPage: '<a href="#" class="page-btn is-selected">{{page}}</a>',
      moveButton: '<a href="#" class="page-btn page-{{type}}"></a>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip visually-hidden" id="point-lib-{{type}}">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  };

  const pagination = new Pagination(container, options);
  pagination.on('afterMove', event => {
    const currentPage = event.page;
    onRederLibrary(storageEl, currentPage);
  });
}
