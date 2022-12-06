import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';

export const notiflixSettings = () => {
    Notify.init({
        width: '200px',
        fontFamily: 'Roboto',
        position: 'left-top',
        timeout: 2000,
        cssAnimationDuration: 250,
        success: {
          background: '#ff6b01',
          notiflixIconColor: 'white',
        }
      })
    Report.init({
        backOverlay: false,
        fontFamily: 'Roboto',
            failure: {
                svgColor: '#ff6b01',
                titleColor: '#ff6b01',
                buttonBackground: '#ff6b01'
            }
        }
    )
}

notiflixSettings();
